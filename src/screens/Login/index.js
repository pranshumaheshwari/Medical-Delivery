import React, { useState, useEffect } from 'react';
import { StatusBar, ActivityIndicator } from 'react-native';
import { Block, Button, Text, theme, Input } from 'galio-framework';
import { Hoshi } from 'react-native-textinput-effects';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


import materialTheme from '../../constants/Theme';
import { setToken } from '../../helper';

import OTP from './otp'
import styles from './style'
import Address from './address';
import Name from './name';
import Number from './number'

export default function Login({ route }) {

	const [pressed, setPressed] = useState(false)
	const [pressed1, setPressed1] = useState(false)
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

	if(pressed1) {
		<Block style={styles.container}>
			<Block center flex space="between" style={styles.padded}>
				<ActivityIndicator style={{paddingTop: theme.SIZES.BASE * 6}} size="large" color={materialTheme.COLORS.ACTIVE} />
				<Text style={{paddingTop: theme.SIZES.BASE * 6}}>Saving your info for future use, hang on...</Text>
			</Block>
		</Block>
	}

	if(isNameSet) {
		return <Address setAddress={setAddress} setPressed={setPressed1} submitAddress={submitAddress} address={address} />
	}

	if(!userData) {
		return <Name setIsNameSet={setIsNameSet} setName={setName} name={name} />
	}

	if(pressed) {
		return (
			<Block style={styles.container}>
				<Block center flex space="between" style={styles.padded}>
					<ActivityIndicator style={{paddingTop: theme.SIZES.BASE * 6}} size="large" color={materialTheme.COLORS.ACTIVE} />
					<Text style={{paddingTop: theme.SIZES.BASE * 6}}>Logging you in...</Text>
				</Block>
			</Block>
		)
	}

	if(!confirm) {
        return (
            <Number signInWithPhoneNumber={signInWithPhoneNumber} phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} />
        )
	} else {
		return <OTP confirmCode={confirmCode} setCode={setCode} code={code} />
	}
}

