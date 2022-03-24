import React, { useEffect, useState } from 'react'
import { AsyncStorage } from 'react-native'

const GlobalContext = React.createContext()

const GlobalProvider = ({ children }) => {
  const [apiKey, setApiKey] = useState('')
  const [reloadProfilPage, setReloadProfilPage] = useState('')

  const handleCheckAsyncStorage = async () => {
    try {
      const valueApiKey = await AsyncStorage.getItem('apiKey')
      if (valueApiKey !== null) {
        setApiKey(valueApiKey)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleReloadProfilPage = id => {
    setReloadProfilPage(id)
  }

  useEffect(() => {
    handleCheckAsyncStorage()
  }, [])

  return (
    <GlobalContext.Provider
      value={{
        apiKey: apiKey,
        navMovieDetails: '',
        idMovie: '',
        nameUser: '',
        handleReloadProfilPage
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalContext
export { GlobalProvider }
