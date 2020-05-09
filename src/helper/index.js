import { AsyncStorage } from 'react-native'

async function getToken() {
    return await AsyncStorage.getItem('user')
    .then(token => JSON.parse(token))
    .catch(e => console.log(e))
}

async function setToken(user) {
    return await AsyncStorage.setItem('user', JSON.stringify(user))
    .catch(e => console.log(e))
}

export {
    getToken,
    setToken,
}