import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import Profil from '../../screens/profil'

const Stack = createNativeStackNavigator()

export default function MovieStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Movie' component={Profil} />
    </Stack.Navigator>
  )
}
