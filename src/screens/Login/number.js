import React from 'react'
import { StatusBar } from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';
import { Hoshi } from 'react-native-textinput-effects'

import styles from './style'
import materialTheme from '../../constants/Theme'

export default function Number({signInWithPhoneNumber, phoneNumber, setPhoneNumber}) {
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
                        <Hoshi
                            label={'Mobile Number (+91)'}
                            borderColor={materialTheme.COLORS.BUTTON_COLOR}
                            borderHeight={2}
                            inputPadding={16}
                            keyboardType="number-pad"
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
    )
}