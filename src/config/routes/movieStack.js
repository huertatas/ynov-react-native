import { View, Text } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import Movie from '../../screens/movie'
import MovieDetails from '../../screens/movieDetails'

const Stack = createNativeStackNavigator()

export default function MovieStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Movie' component={Movie} />
      <Stack.Screen name='MovieDetails' component={MovieDetails} />
    </Stack.Navigator>
  )
}
