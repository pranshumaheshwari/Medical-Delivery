import React from 'react'
import { StatusBar } from 'react-native';
import { Block, Button, Text, theme, Input } from 'galio-framework';

import styles from './style'

export default function Name({setName, setIsNameSet, name}) {
    return (
        <Block flex style={styles.container}>
            <StatusBar barStyle="light-content" />
            <Block flex space="between" style={styles.padded}>
                <Block flex column>
                    <Block center>
                        <Text size={20} style={{paddingTop: theme.SIZES.BASE * 3}}>It seems you are new here</Text>
                        <Text
                        size={19}
                        numberOfLines={1}
                        >We will need a few details to get started</Text>
                    </Block>
                    <Block center style={{paddingTop: theme.SIZES.BASE * 3}}>
                        <Input
                        placeholder="First Name"
                        onChange={event => {setName({...name, first: event.nativeEvent.text})}}
                        />
                        <Input
                        placeholder="Last Name"
                        onChange={event => {setName({...name, last: event.nativeEvent.text})}}
                        />
                    </Block>
                    <Block center style={{position: 'absolute', bottom: 20}}>
                        <Button
                        round
                        onPress={() => {setIsNameSet(true)}}
                        >Next</Button>
                    </Block>
                </Block>
            </Block>
        </Block>
    )
}