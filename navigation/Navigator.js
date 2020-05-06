import React from 'react'
import { useGlobal } from 'reactn'
import { createStackNavigator } from '@react-navigation/stack'
import {Button} from 'galio-framework'

import OnBoardingScreen from '../screens/OnBoarding'
import LoginScreen from '../screens/LoginScreen'
import HomeScreen from '../screens/Home'
import Drawer from './Drawer'

const Stack = createStackNavigator()

function Navigator(props) {

    const [user, _] = useGlobal('user')

    return (
        <Stack.Navigator
        mode="card"
        headerMode="screen"
        >
            {!user ? (
                <>
                    <Stack.Screen
                    name="OnBoarding"
                    component={OnBoardingScreen}
                    options={{headerShown: false}}
                    />
                    <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{headerTitle: ""}}
                    />
                </>
            ) : (
                <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    headerTitle: "",
                    headerLeft: () => <Button
                                        icon="menu"
                                        iconFamily="MaterialIcons"
                                        iconSize={25}
                                        onlyIcon
                                        color="transparent"
                                        onPress={() => {}} />
                }}
                />
            )}
        </Stack.Navigator>
    );
}

export default Navigator;