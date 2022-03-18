import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import Details from '../../screens/details'

const Stack = createNativeStackNavigator()

const LoginStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Details' component={Details} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default LoginStack
