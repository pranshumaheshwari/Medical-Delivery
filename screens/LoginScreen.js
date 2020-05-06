import React, { useState, useEffect } from 'react';
import { StyleSheet, StatusBar, Dimensions } from 'react-native';
import { useGlobal } from 'reactn';
import { Block, Button, Text, theme, Input } from 'galio-framework';
import auth from '@react-native-firebase/auth';

const { height, width } = Dimensions.get('screen');

import materialTheme from '../constants/Theme';

export default function Login({navigation}) {

    const [phoneNumber, setPhoneNumber] = useState("")
    const [initializing, setInitializing] = useState(true);
    const [confirm, setConfirm] = useState(null);
    const [code, setCode] = useState('');
	const [user, setUser] = useGlobal('user');

	// Handle the button press
	async function signInWithPhoneNumber() {
		const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
		setConfirm(confirmation);
	}
	async function confirmCode() {
		try {
			await confirm.confirm(code);
		} catch (error) {
			console.log('Invalid code.');
		}
	}

    function onAuthStateChanged(user) {
      setUser(user);
      if (initializing) setInitializing(false);
    }

    useEffect(() => {
      const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
      return subscriber; // unsubscribe on unmount
    }, []);
  
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
							// onChange = {event => {setPhoneNumber('+91' + event.nativeEvent.text)}}
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
