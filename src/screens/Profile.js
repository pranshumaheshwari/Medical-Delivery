import React, { useState } from 'react'
import { StyleSheet, StatusBar, ActivityIndicator } from 'react-native'
import { Button, Block, theme, Text, Card } from 'galio-framework'
import auth from '@react-native-firebase/auth'
import { setToken } from '../helper';
import { materialTheme } from '../constants'

export default function ProfileScreen({navigation, route}) {

    const [pressed, setPressed] = useState(false)

    if(pressed) {
        return (
            <Block style={styles.container}>
				<Block center flex space="between" style={styles.padded}>
    				<ActivityIndicator style={{paddingTop: theme.SIZES.BASE * 6}} size="large" color={materialTheme.COLORS.ACTIVE} />
					<Text style={{paddingTop: theme.SIZES.BASE * 6}}>Logging you out...</Text>
				</Block>
			</Block>
        )
    }

    return (
        <Block flex style={styles.container}>
            <StatusBar barStyle="light-content" />
            <Block flex space="between" style={styles.padded}>
                <Block flex style={{justifyContent: 'center'}}>
                    <Text center style={{marginTop: theme.SIZES.BASE * -10}} h4 color={materialTheme.COLORS.PRIMARY}>
                        Reach out to us at
                    </Text>
                    <Block center style={{marginTop: theme.SIZES.BASE * 2}}>
                        <Text h5> Rudra Medical </Text>
                        <Text h5> Opposite Ghati Hospital </Text>
                        <Text h5> Panchaki Road </Text>
                        <Text h5> Aurangabad (MH), 431001 </Text>
                        <Text h5> (0240) 2326681 </Text>
                    </Block>
                </Block>
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
  