import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { setGlobal } from 'reactn'
import Navigator from './navigation/Navigator'

setGlobal({
  user: null
})

export default function App() {
  return (
    <NavigationContainer>
      <Navigator />
    </NavigationContainer>
  );
}