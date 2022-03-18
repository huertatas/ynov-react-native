import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MovieStack from './movieStack'
import ProfilStack from './profilStack'

const Bottom = createBottomTabNavigator()

const Home = () => {
  return (
    <Bottom.Navigator>
      <Bottom.Screen name='MovieStack' component={MovieStack} />
      <Bottom.Screen name='ProfilStack' component={ProfilStack} />
    </Bottom.Navigator>
  )
}

export default Home
