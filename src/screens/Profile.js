import React, { useState } from 'react'
import { StyleSheet, StatusBar } from 'react-native'
import { Button, Block, theme, Text } from 'galio-framework'
import auth from '@react-native-firebase/auth'
import { setToken } from '../helper';


export default function ProfileScreen({navigation, route}) {

    const [pressed, setPressed] = useState(false)

    if(pressed) {
        return (
            <Block style={styles.container}>
				<Block center flex space="between" style={styles.padded}>
					<Text style={{paddingTop: theme.SIZES.BASE * 6}}>Logging you out...</Text>
				</Block>
			</Block>
        )
    }

    return (
        <Block flex style={styles.container}>
            <StatusBar barStyle="light-content" />
            <Block flex space="between" style={styles.padded}>
                <Block center style={{position: 'absolute', bottom: 20}}>
                    <Button
                    onPress={() => {
                        setPressed(true)
                        auth().signOut().then(_ => {
                            setToken(null)
                            const { onLogout } = route.params
                            onLogout() 
                        })
                    }}
                    >Logout</Button>
                </Block>
            </Block>
        </Block>
    );
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.COLORS.WHITE,
      paddingHorizontal: theme.SIZES.BASE * 2,
    },
    padded: {
        position: 'relative',
        bottom: theme.SIZES.BASE,
    },
  });
  