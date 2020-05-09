import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { TabNavigator, OnBoardingStackScreen } from './src/navigation/Navigator'
import { getToken, setToken } from './src/helper';
import Constants from 'expo-constants';

export default function App() {

	const [loading, setLoading] = useState(true)
	const [user, setUser] = useState({})

	useEffect(async () => {
		getToken().then(user => {
			setUser(user)
			setLoading(false)
		})
	}, [])

	async function onLogin() {
		await getToken().then(user => {
			setUser(user)
		})
	}

	if(!loading) {
		if(user) {
			return (
				<NavigationContainer>
					<TabNavigator onLogout={onLogin} />
				</NavigationContainer>
			);
		} else {
			return (
				<NavigationContainer>
					<OnBoardingStackScreen onLogin={onLogin} />
				</NavigationContainer>
			)
		}
	} else {
		return null;
	}
}
