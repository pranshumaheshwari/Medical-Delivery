import { AsyncStorage } from 'react-native'
import firestore from '@react-native-firebase/firestore'

async function getToken() {
    return await AsyncStorage.getItem('user')
    .then(token => JSON.parse(token))
    .catch(e => console.log(e))
}

async function setToken(user) {
    return await AsyncStorage.setItem('user', JSON.stringify(user))
    .catch(e => console.log(e))
}

async function getOrderNumber() {
    return await firestore()
        .collection('Orders')
        .get()
        .then(querySnapshot => querySnapshot.size)
}

export {
    getToken,
    setToken,
    getOrderNumber,
}