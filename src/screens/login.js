import React, { useContext, useEffect, useState } from 'react'
import Input from '../components/inputStyled'
import Button from '../components/buttonStyled'
import GlobalContext from '../context/globalContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useIsFocused } from '@react-navigation/native'

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
    <>
      <Input placeholder='username' onChangeText={text => setUsername(text)} />
      <Input placeholder='password' onChangeText={text => setMail(text)} />
      <Button funcButton={handleLogin} />
    </>
  )
}

export default Login
