import React, { useContext, useEffect, useState } from 'react'
import Input from '../components/inputStyled'
import Button from '../components/buttonStyled'
import GlobalContext from '../context/globalContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useIsFocused } from '@react-navigation/native'
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
      navigation.navigate('Home')
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (globalCtx.apiKey) {
      // check si connecté ou non en fonction de si oui ou non il possède l'apiKey
      console.log('go to home ya la key')
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
      <Button funcButton={handleLogin} />
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

export default Login
