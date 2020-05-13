import React, { useState, useEffect } from 'react';
import { StyleSheet, StatusBar, Dimensions, AsyncStorage } from 'react-native';
import { Block, Button, Text, theme, Input } from 'galio-framework';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const { width } = Dimensions.get('screen');

import materialTheme from '../constants/Theme';
import { setToken } from '../helper';

export default function Login({navigation, route}) {

	const [pressed, setPressed] = useState(false)
    const [phoneNumber, setPhoneNumber] = useState("")
    const [confirm, setConfirm] = useState(null);
    const [code, setCode] = useState('');
	const [user, setUser] = useState();
	const [userData, setUserData] = useState(true)
	const [name, setName] = useState({})
	const [address, setAddress] = useState({})
	const [isNameSet, setIsNameSet] = useState(false)


	async function signInWithPhoneNumber() {
		setConfirm("Pressed")
		const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
		setConfirm(confirmation);
	}
	async function confirmCode() {
		setPressed(true)
		try {
			await confirm.confirm(code);
		} catch (error) {
			setPressed(false)
			alert('Invalid code.');
		}
	}

    async function onAuthStateChanged(user) {
		await setToken(user);
		setUser(user);
		await firestore()
			.collection('Users')
			.where('phoneNumber', '==', user.phoneNumber)
			.get()
			.then(querySnapshot => {
				if(querySnapshot.size) { 
					const { onLogin } = route.params
					onLogin();
				} else {
					setUserData(false)
				}
			})
	}
	
	async function submitAddress() {
		await firestore()
			.collection('Users')
			.add({
				phoneNumber: user.phoneNumber,
				address,
				name,
				uid: user.uid,
			})
			.then(() => {
				const { onLogin } = route.params
				onLogin();
			})
	}

    useEffect(() => {
      	const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
      	return subscriber; // unsubscribe on unmount
	}, []);

	if(isNameSet) {
		return (
			<Block flex style={styles.container}>
				<StatusBar barStyle="light-content" />
				<Block flex space="between" style={styles.padded}>
					<Block flex column>
						<Block center style={{paddingTop: theme.SIZES.BASE * 3}}>
							<Input
							placeholder="Address 1"
							onChange={e => {setAddress({...address, address1: e.nativeEvent.text})}}
							/>
							<Input
							placeholder="Address 2"
							onChange={e => {setAddress({...address, address2: e.nativeEvent.text})}}
							/>
							<Input
							placeholder="Landmark"
							onChange={e => {setAddress({...address, landmark: e.nativeEvent.text})}}
							/>
						</Block>
						<Block center style={{position: 'absolute', bottom: 20}}>
							<Button
							round
							onPress={async () => {
								await submitAddress()
							}}
							>Submit</Button>
						</Block>
					</Block>
				</Block>
			</Block>
		)
	}

	if(!userData) {
		return (
			<Block flex style={styles.container}>
				<StatusBar barStyle="light-content" />
				<Block flex space="between" style={styles.padded}>
					<Block flex column>
						<Block center>
							<Text size={20} style={{paddingTop: theme.SIZES.BASE * 3}}>It seems you are new here</Text>
							<Text
							size={19}
							numberOfLines={1}
							>We will need a few details to get started</Text>
						</Block>
						<Block center style={{paddingTop: theme.SIZES.BASE * 3}}>
							<Input
							placeholder="First Name"
							onChange={event => {setName({...name, first: event.nativeEvent.text})}}
							/>
							<Input
							placeholder="Last Name"
							onChange={event => {setName({...name, last: event.nativeEvent.text})}}
							/>
						</Block>
						<Block center style={{position: 'absolute', bottom: 20}}>
							<Button
							round
							onPress={() => {setIsNameSet(true)}}
							>Next</Button>
						</Block>
					</Block>
				</Block>
			</Block>
		)
	}

	if(pressed) {
		return (
			<Block style={styles.container}>
				<Block center flex space="between" style={styles.padded}>
					<Text style={{paddingTop: theme.SIZES.BASE * 6}}>Logging you in...</Text>
				</Block>
			</Block>
		)
	}

  
	if(!confirm) {
		return (
			<Block flex style={styles.container}>
				<StatusBar barStyle="light-content" />
				<Block flex space="between" style={styles.padded}>
					<Block flex column>
						<Block>
							<Text size={40} style={{paddingTop: theme.SIZES.BASE * 3}}>Login</Text>
							<Text muted>Get access to your order history and place new orders</Text>
						</Block>
						<Block style={{paddingTop: theme.SIZES.BASE * 3}}>
							<Text size={14}>Mobile Number</Text>
							<Input
							placeholder="(+91)"
							type="phone-pad"
							onChange={event => {if(event.nativeEvent.text.length == 10) {setPhoneNumber("+91" + event.nativeEvent.text)} else {setPhoneNumber("")}}}
							/>
						</Block>
						<Block center style={{position: 'absolute', bottom: 20}}>
							<Button
							round
							color={!phoneNumber.length ? materialTheme.COLORS.PLACEHOLDER : materialTheme.COLORS.BUTTON_COLOR}
							disabled={!phoneNumber.length}
							onPress={signInWithPhoneNumber}
							>Send OTP</Button>
						</Block>
					</Block>
				</Block>
			</Block>
		);
	} else {
		return (
			<Block flex style={styles.container}>
				<StatusBar barStyle="light-content" />
				<Block flex space="between" style={styles.padded}>
					<Block flex column>
						<Block>
							<Text size={40} style={{paddingTop: theme.SIZES.BASE * 3}}>Login</Text>
							<Text muted>Get access to your order history and place new orders</Text>
						</Block>
						<Block style={{paddingTop: theme.SIZES.BASE * 3}}>
							<Text size={14}>OTP</Text>
							<Input
							placeholder="6 digit OTP"
							type="phone-pad"
							onChange={event => {setCode(event.nativeEvent.text)}}
							/>
						</Block>
						<Block center style={{position: 'absolute', bottom: 20}}>
							<Button
							round
							color={!(code.length == 6) ? materialTheme.COLORS.PLACEHOLDER : materialTheme.COLORS.BUTTON_COLOR}
							disabled={!(code.length == 6)}
							onPress={confirmCode}
							>Submit</Button>
						</Block>
					</Block>
				</Block>
			</Block>
		);
	}
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.WHITE,
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    position: 'relative',
    bottom: theme.SIZES.BASE,
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
  },
});
