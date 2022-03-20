import React from 'react'
import Routes from './src/config/routes'
import { View } from 'react-native'
import styled from 'styled-components'
import { GlobalProvider } from './src/context/globalContext'

const App = () => {
  return (
    <GlobalProvider>
      <Routes />
    </GlobalProvider>
  )
}

export default App
