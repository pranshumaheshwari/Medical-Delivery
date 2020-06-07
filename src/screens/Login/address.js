import React from 'react'
import { StatusBar } from 'react-native';
import { Block, Button, Text, theme, Input } from 'galio-framework';

import styles from './style'

export default function Address({ setAddress, submitAddress, setPressed, address }) {
    return (
        <Block flex style={styles.container}>
            <StatusBar barStyle="light-content" />
            <Block flex space="between" style={styles.padded}>
                <Block flex column>
                    <Block center style={{paddingTop: theme.SIZES.BASE * 3}}>
                        <Input
                        placeholder="Address 1"
                        onChange={e => {setAddress({...address, address1: e.nativeEvent.text})}}
                        />
                        <Input
                        placeholder="Address 2"
                        onChange={e => {setAddress({...address, address2: e.nativeEvent.text})}}
                        />
                        <Input
                        placeholder="Landmark"
                        onChange={e => {setAddress({...address, landmark: e.nativeEvent.text})}}
                        />
                    </Block>
                    <Block center style={{position: 'absolute', bottom: 20}}>
                        <Button
                        round
                        onPress={async () => {
                            setPressed(true)
                            await submitAddress()
                        }}
                        >Submit</Button>
                    </Block>
                </Block>
            </Block>
        </Block>
    )
}