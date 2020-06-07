import React from 'react'
import { StatusBar } from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';
import { Kaede } from 'react-native-textinput-effects'

import styles from './style'
import materialTheme from '../../constants/Theme'

export default function OTP({confirmCode, setCode, code}) {
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
                        <Kaede
                            label={'OTP'}
                            inputPadding={16}
                            borderColor={materialTheme.COLORS.BUTTON_COLOR}
                            labelStyle={{
                                backgroundColor: materialTheme.COLORS.BUTTON_COLOR,
                                color: 'white'
                            }}
                            onChange={event => {setCode(event.nativeEvent.text)}}
                            keyboardType="number-pad"
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
    )
}