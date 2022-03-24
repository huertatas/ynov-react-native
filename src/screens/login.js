import React, { useContext, useEffect, useState } from 'react'
import GlobalContext from '../context/globalContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useIsFocused } from '@react-navigation/native'
import { showMessage } from 'react-native-flash-message'
import styled from 'styled-components'

const Login = ({ navigation }) => {
  const globalCtx = useContext(GlobalContext)

  const [username, setUsername] = useState('')
  const [mail, setMail] = useState('')

  const isFocused = useIsFocused()

  const handleLogin = async () => {
    // mettre l'api key tmdb dans l'async storage puis naviguer vers home

    if (!mail && !username) {
      return
    }

    try {
      await AsyncStorage.setItem('apiKey', '641582111391a97ed15cb4bf2c13ae08')
      globalCtx.apiKey = '641582111391a97ed15cb4bf2c13ae08'
      globalCtx.nameUser = username
      showMessage({
        message: 'Connecté',
        type: 'success'
      })
      navigation.navigate('Home')
    } catch (error) {
      showMessage({
        message: 'Une erreur est survenue, veuillez réessayer',
        type: 'info'
      })
    }
  }

  useEffect(() => {
    if (globalCtx.apiKey) {
      // check si connecté ou non en fonction de si oui ou non il possède l'apiKey
      showMessage({
        message: 'Vous êtes déjà connecté',
        type: 'info'
      })
      navigation.navigate('Home')
    }
  }, [isFocused, globalCtx.apiKey])

  return (
    <BackgroundMovieScreen>
      <LogoLetterBox
        source={{
          uri: 'https://a.ltrbxd.com/logos/letterboxd-mac-icon.png'
        }}
      />
      <InputLog
        placeholder='username'
        onChangeText={text => setUsername(text)}
      />
      <InputLog placeholder='password' onChangeText={text => setMail(text)} />
      <ButtonLog title='login' onPress={handleLogin} />
    </BackgroundMovieScreen>
  )
}

const BackgroundMovieScreen = styled.ScrollView`
  background: #14181c;
`

const LogoLetterBox = styled.Image`
  margin: auto;
  margin-top: 10px;
  margin-bottom: 15px;
  width: 50px;
  height: 50px;
`

const InputLog = styled.TextInput`
  background: white;
  margin: 15px;
  border-radius: 10px;
  border: solid grey 1px;
`

const ButtonLog = styled.Button``

export default Login
