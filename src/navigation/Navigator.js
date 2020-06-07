import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { materialTheme } from '../constants'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import OnBoardingScreen from '../screens/OnBoarding'
import LoginScreen from '../screens/Login'
import HomeScreen from '../screens/Home'
import ProfileScreen from '../screens/Profile';
import OTCScreen from '../screens/OTC'

const OnBoardingStack = createStackNavigator()

function OnBoardingStackScreen(props) {
    return (
        <OnBoardingStack.Navigator
        mode="card"
        headerMode="screen"
        >
            <OnBoardingStack.Screen
            name="OnBoarding"
            component={OnBoardingScreen}
            options={{headerShown: false}}
            />
            <OnBoardingStack.Screen
            name="Login"
            component={LoginScreen}
            options={{headerTitle: ""}}
            initialParams={{
                onLogin: props.onLogin
            }}/>   
        </OnBoardingStack.Navigator>
    );
}

const HomeStack = createStackNavigator()

function HomeStackScreen() {
    return (
        <HomeStack.Navigator
        mode="card"
        headerMode="screen"
        >
            <HomeStack.Screen
            name="Home"
            component={HomeScreen}
            options={{headerShown: false}}
            />
            <HomeStack.Screen
            name="OTC"
            component={OTCScreen}
            options={{headerTitle: ""}}
            />
        </HomeStack.Navigator>
    );
}

const Tab = createBottomTabNavigator();

function TabNavigator(props) {
    return (
        <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                if (route.name === 'New Orders') {
                    if(focused) {
                        return <MaterialCommunityIcons name="cart" size={size} color={color} />
                    } else {
                        return <MaterialCommunityIcons name="cart-outline" size={size} color={color} />
                    }
                } else if (route.name === 'Settings') {
                    if(focused) {
                        return <FontAwesome name="gear" size={size} color={color} />
                    } else {
                        return <EvilIcons name="gear" size={size} color={color} />
                    }
                }},
          })}
          tabBarOptions={{
            activeTintColor: materialTheme.COLORS.ACTIVE,
            inactiveTintColor: 'gray',
          }}
        >
            <Tab.Screen
            name="New Orders"
            component={HomeStackScreen}
            />
            <Tab.Screen
            name="Settings"
            component={ProfileScreen}
            initialParams={{
                onLogout: props.onLogout
            }}
            />
        </Tab.Navigator>
    )
}

const Stack = createStackNavigator()

export {
    TabNavigator,
    OnBoardingStackScreen,
}