import React from 'react'
import Routes from './src/config/routes'
import { View } from 'react-native'
import styled from 'styled-components'
import { GlobalProvider } from './src/context/globalContext'
import FlashMessage from 'react-native-flash-message'

const App = () => {
  return (
    <GlobalProvider>
      <Routes />
      <FlashMessage position='top' />
    </GlobalProvider>
  )
}

export default App
