import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import HomeStack from './homeStack'
import CharactersStack from './charactersStack'

const BottomTab = createBottomTabNavigator()

const Routes = () => {
  return (
    <NavigationContainer>
      <BottomTab.Navigator>
        <BottomTab.Screen name='HomeStack' component={HomeStack} />
        <BottomTab.Screen name='CharactersStack' component={CharactersStack} />
      </BottomTab.Navigator>
    </NavigationContainer>
  )
}

export default Routes
