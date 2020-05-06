import React, { useEffect, useState } from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { Button, Block, Text, theme } from 'galio-framework';
import * as ImagePicker from 'expo-image-picker';

import {materialTheme} from '../constants/'

export default function Home({navigation}) {

    useEffect(() => {
		async function temp() {
			let resp = await ImagePicker.getCameraPermissionsAsync()
			if(!resp.granted) {
			await ImagePicker.requestCameraPermissionsAsync()
			}
			resp = await ImagePicker.getCameraRollPermissionsAsync()
			if(!resp.granted) {
			await ImagePicker.requestCameraRollPermissionsAsync()
			}
		}
		temp()
	}, [])
	
	const [image, setImage] = useState('')

    return (
      <Block flex style={styles.container}>
      	<StatusBar barStyle="light-content" />
        <Block center>
			<Text>Upload a prescription to order</Text>
			<Button
			round
			color={materialTheme.COLORS.BUTTON_COLOR}
			onPress={async () => {
				let result = await ImagePicker.launchImageLibraryAsync({
							allowsEditing: false,
							quality: 0,
							});
				if (!result.cancelled) {
					setImage(result.uri);
				}
			}}
			>Choose from gallery</Button>
			<Button
			round
			color={materialTheme.COLORS.BUTTON_COLOR}
			onPress={async () => {
				let result = await ImagePicker.launchCameraAsync({
							allowsEditing: false,
							quality: 0,
							});
				if (!result.cancelled) {
					setImage(result.uri);
				}
			}}
			>Open Camera</Button>
        </Block>
    </Block>
    );
}

const styles = StyleSheet.create({
  container: {
	backgroundColor: theme.COLORS.WHITE,
	flex: 1, 
    alignItems: 'center',
    justifyContent: 'center', 
  },
});
