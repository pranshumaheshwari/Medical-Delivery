import React, { useState, useEffect } from 'react'
import { StatusBar, StyleSheet, TextInput, Dimensions } from 'react-native'
import { Block, Text, theme, Button } from 'galio-framework';
import { getToken } from '../helper'
import firestore from '@react-native-firebase/firestore';

const { width } = Dimensions.get("screen")

async function order(user, data) {

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

    return await firestore().collection('Orders')
    .add({
        uid: user.uid,
        data,
        contact: user.phoneNumber,
        address,
        orderDate: firestore.FieldValue.serverTimestamp(),
    })
    .then(documentSnapshot => documentSnapshot.id)

}

export default function OTCScreen({navigation}) {

	const [user, setUser] = useState();
    const [data, setData] = useState('')
    const [selected, setSelected] = useState(false)
    const [id, setId] = useState('')

    useEffect(() => {
		getToken().then(user => {
			setUser(user);
		})
	}, [])

    if(!selected) {
        return (
            <>
                <Block flex style={styles.container}>
                    <StatusBar barStyle="light-content" />
                    <Block center style={{marginTop: theme.SIZES.BASE * 4}}>
                        <Text>List all your OTC product requirements</Text>
                        <TextInput
                        multiline
                        numberOfLines={5}
                        editable
                        scrollEnabled
                        style={styles.textbox}
                        onChangeText={text => {
                            setData(text)
                        }}
                        />
                    </Block>
                    <Block
                    style={{position: 'absolute', bottom: theme.SIZES.BASE}}
                    >
                        <Button
                        onPress={async () => {
                            setSelected(true)
                            setId(await order(user, data))
                        }}
                        >Continue</Button>
                    </Block>
                </Block>
            </>
        )
    } else {
        return (
            <Block style={styles.container}>
                <StatusBar barStyle="light-content" />
                <Block flex column center style={{marginTop: theme.SIZES.BASE * 3}}>
                    {id == '' || id == undefined ? (
                        <Text h5>Uploading your prescription and placing your order.</Text>
                    ) : (
                        <>
                            <Text h5>Order placed succesfully</Text>
                            <Text h6 style={{marginTop: theme.SIZES.BASE * 4}}>Your order id is: ${id}</Text>
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
    textbox: {
        // height: theme.SIZES.BASE * 7,
        width: width - theme.SIZES.BASE * 2, 
        borderColor: 'gray', 
        borderWidth: 1,
    }
});