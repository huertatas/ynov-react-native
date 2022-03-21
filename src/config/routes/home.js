import React from 'react'
import { Image } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MovieStack from './movieStack'
import ProfilStack from './profilStack'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const Bottom = createBottomTabNavigator()

const Home = () => {
  return (
    <Bottom.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'orange',
        tabBarInctiveTintColor: '#9ab',
        tabBarInactiveBackgroundColor: 'black',
        tabBarActiveBackgroundColor: 'black'
      }}
    >
      <Bottom.Screen
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: () => (
            <Image source={{
              uri: `data:image/png;base64,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`
            }} style={{width: 20, height: 20}} />
          )
        }}
        name='MovieStack'
        component={MovieStack}
      />
      <Bottom.Screen  options={{
          tabBarLabel: 'Profil',
          tabBarIcon: () => (
            <Image source={{
              uri: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnRFE3qvVvOoMsoGpAHPPr8bZVCOBIsrKDqNjsM8wo8DSwGCRSxzbQQmVVnPpiqZcxQ08&usqp=CAU`
            }} style={{width: 20, height: 20}} />
          )
        }} name='ProfilStack' component={ProfilStack} />
    </Bottom.Navigator>
  )
}

export default Home
