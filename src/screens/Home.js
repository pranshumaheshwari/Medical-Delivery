import React, { useState, useEffect } from 'react';
import { StyleSheet, StatusBar, Image, Dimensions } from 'react-native';
import { Button, Block, Text, theme, Input } from 'galio-framework';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome } from '@expo/vector-icons';
import firestore from '@react-native-firebase/firestore';
import { materialTheme, CLOUDINARY_API } from '../constants/'
import { getToken } from '../helper'
import { Tile } from 'react-native-elements'
import Carousel from 'react-native-snap-carousel'

const { width, height } = Dimensions.get("screen")

async function uploadImage(URI, user) {
	const data = new FormData()
	data.append('file', URI)
	data.append('upload_preset', CLOUDINARY_API.PRESET)

	let remoteURI = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_API.NAME}/upload`, {
		method: "post",
      	body: data
	}).then(res => res.json())
	  	.then(data => data.secure_url)
	  	.then(async remoteURI => {

			let address = await firestore()
				.collection('Users')
				.where('uid', '==', user.uid)
				.get()
				.then(querySnapshot => {
					let address
					querySnapshot.forEach(documentSnapshot => {
						address = documentSnapshot.data().address
					})
					return address
				})

			await firestore().collection('Orders').add({
				uid: user.uid,
				remoteURI,
				contact: user.phoneNumber,
				address,
				orderDate: firestore.FieldValue.serverTimestamp(),
				type: 'prescription'
			})
			return remoteURI;
	  })
	  .catch(e => alert(e));
	return remoteURI;
}

export default function Home({navigation}) {

	const [user, setUser] = useState();
	const [localURI, setLocalURI] = useState('')
	const [localURIBase64, setLocalURIBase64] = useState('')
	const [selected, setSelected] = useState(false)
	const [remoteURI, setRemoteURI] = useState('')
	const [carouselItems, _] = useState([
		{
			title: "Free Sanitizer bottle",
			caption:"on orders above ₹500",
		},
		{
			title: "All corona related pharmaceutical products available",
			caption:"",
		},
		{
			img: require("../assets/1.png"),
		},
		{
			img: require("../assets/2.png"),
		},
		{
			img: require("../assets/3.png"),
		},
	])

	useEffect(() => {
		getToken().then(user => {
			setUser(user);
		})
	}, [])

	function _renderItem({ item }) {
		if(item.img) {
			return (
				<Tile
					featured
					imageSrc={item.img}
					imageContainerStyle={styles.imgTile}
					imageProps={{
						resizeMode: "contain"
					}}
					height={height / 4}
				/>
			);
		} else {
			return (
				<Tile
					featured
					title={item.title}
					caption={item.caption}
					imageContainerStyle={styles.tile}
					height={height / 4}
				/>
			)
		}
	}

	if(!selected) {
		return (
		  <Block flex style={styles.container}>
			<StatusBar barStyle="light-content" />
			<Block style={{height: height / 2.5, paddingTop: theme.SIZES.BASE * 2}}>
				<Carousel
					layout={"default"}
					data={carouselItems}
					sliderWidth={width}
					itemWidth={width - theme.SIZES.BASE}
					renderItem={_renderItem}
					loop={true}
					autoplay={true}
					lockScrollWhileSnapping={true}
				/>
			</Block>
			<Block center>
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
				{localURI =='' ? (
				<>
					<Text h5 style={{paddingTop: theme.SIZES.BASE * 3}}>OR</Text>
					<Block
					style={{paddingTop: theme.SIZES.BASE * 3}}
					>
						<Button
						onPress={() => {navigation.navigate('OTC')}}
						>Order OTC products</Button>
					</Block>
				</>) : (
					<>
						<Block center style={{paddingTop: theme.SIZES.BASE}}>
							<Text>Selected Prescription</Text>
							<Image
							source={{uri: localURI}}
							style={{width: width / 2, height: height / 4, marginTop: theme.SIZES.BASE}}
							/> 
						</Block>
						<Button
						style={{position: 'absolute', bottom: theme.SIZES.BASE}}
						onPress={async () => {
							setSelected(true)
							setRemoteURI(await uploadImage(localURIBase64, user))
						}}
						>Continue</Button>
					</>
				)}
		</Block>
		);
	} else {
		return (
			<Block style={styles.container}>
				<StatusBar barStyle="light-content" />
				<Block flex column center style={{marginTop: theme.SIZES.BASE * 3}}>
					{remoteURI == '' || remoteURI == undefined ? (
						<>
							<Text h5>Uploading your prescription</Text>
							<Text h5>and placing your order.</Text>
						</>
					) : (
						<>
							<Text h5>Order placed succesfully</Text>
							<Text h6 style={{marginTop: theme.SIZES.BASE * 4}}>Your order id is: ${remoteURI.split('/')[remoteURI.split('/').length - 1].slice(0, -4)}</Text>
						</>
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
  imgTile: {

  },
  tile: {
	  backgroundColor: theme.COLORS.BLACK,
  }
});
