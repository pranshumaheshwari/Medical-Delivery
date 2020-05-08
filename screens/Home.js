import React, { useState } from 'react';
import { useGlobal } from 'reactn';
import { StyleSheet, StatusBar, Image, Dimensions } from 'react-native';
import { Button, Block, Text, theme } from 'galio-framework';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome } from '@expo/vector-icons';
import firestore from '@react-native-firebase/firestore';
import { materialTheme, CLOUDINARY_API } from '../constants/'


const { width } = Dimensions.get("screen")
const ref = firestore().collection('orders')

async function uploadImage(URI, uid) {
	const data = new FormData()
	data.append('file', URI)
	data.append('upload_preset', CLOUDINARY_API.PRESET)

	let remoteURI = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_API.NAME}/upload`, {
		method: "post",
      	body: data
	}).then(res => res.json())
	  	.then(data => data.secure_url)
	  	.then(async remoteURI => {
			await ref.add({
				uid: "abc",
				remoteURI: "aa",
			})
			return remoteURI;
	  })
	  .catch(e => alert(e));
	return remoteURI;
}

export default function Home({navigation}) {

	const [user, _] = useGlobal('user');
	const [localURI, setLocalURI] = useState('')
	const [localURIBase64, setLocalURIBase64] = useState('')
	const [selected, setSelected] = useState(false)
	const [remoteURI, setRemoteURI] = useState('')

	if(!selected) {

		return (
		  <Block flex style={styles.container}>
			<StatusBar barStyle="light-content" />
			<Block center style={{marginTop: theme.SIZES.BASE * 4}}>
				<Text h5>Upload a prescription to order</Text>
				<Block row space="evenly" style={{width: width - theme.SIZES.BASE * 5, paddingTop: theme.SIZES.BASE}}>
					<FontAwesome.Button
					name="file-picture-o"
					size={24}
					color="white"
					backgroundColor={materialTheme.COLORS.BUTTON_COLOR}
					onPress={async () => {
						let resp = await ImagePicker.getCameraRollPermissionsAsync()
						if(!resp.granted) {
							await ImagePicker.requestCameraRollPermissionsAsync()
						}
						let result = await ImagePicker.launchImageLibraryAsync({
									allowsEditing: false,
									quality: 0,
									base64: true,
									});
						if (!result.cancelled) {
							setLocalURI(result.uri);
							setLocalURIBase64(`data:image/${result.uri.split(".")[result.uri.split(".").length - 1]};base64,${result.base64}`);
						}
					}}
					>Gallery</FontAwesome.Button>
					<FontAwesome.Button
					name="camera"
					color="white"
					backgroundColor={materialTheme.COLORS.BUTTON_COLOR}
					onPress={async () => {
						let resp = await ImagePicker.getCameraPermissionsAsync()
						if(!resp.granted) {
							await ImagePicker.requestCameraPermissionsAsync()
						}
						let result = await ImagePicker.launchCameraAsync({
									allowsEditing: false,
									quality: 0,
									base64: true,
									});
						if (!result.cancelled) {
							setLocalURI(result.uri);
							setLocalURIBase64(`data:image/${result.uri.split(".")[result.uri.split(".").length - 1]};base64,${result.base64}`);
						}
					}}
					>Camera</FontAwesome.Button>
				</Block>
			</Block>
				{localURI =='' ? (<></>) : (
					<>
						<Block center style={{paddingTop: theme.SIZES.BASE * 3}}>
							<Text>Selected Prescription</Text>
							<Image
							source={{uri: localURI}}
							style={{width: 250, height: 300, marginTop: theme.SIZES.BASE}}
							/> 
						</Block>
						<Button
						style={{position: 'absolute', bottom: theme.SIZES.BASE}}
						onPress={async () => {
							setSelected(true)
							setRemoteURI(await uploadImage(localURIBase64, user.uid))
						}}
						>Continue</Button>
					</>
				)}
		</Block>
		);
	} else {
		return (
			<Block flex style={styles.container}>
				<StatusBar barStyle="light-content" />
				<Block center style={{marginTop: theme.SIZES.BASE * 4}}>
					{remoteURI == '' || remoteURI == undefined ? (
						<Text h5>Uploading your prescription</Text>
					) : (
						<Text h5>Order placed, we will shortly contact you</Text>
					)}
				</Block>
			</Block>
		);
	}

}

const styles = StyleSheet.create({
  container: {
	backgroundColor: theme.COLORS.WHITE,
	flex: 1, 
    alignItems: 'center',
  },
});
