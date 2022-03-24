import { View, Text } from 'react-native'
import React, { useEffect, useContext, useState } from 'react'
import styled from 'styled-components'
import CategoryMovieSlide from '../components/categoryMovieSlide'
import GlobalContext from '../context/globalContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'

export default function Movie({ navigation }) {
  const globalCtx = useContext(GlobalContext)

  globalCtx.navMovieDetails = navigation

  const [favoriteMovie, setFavoriteMovie] = useState([])
  const [watchlistMovie, setWatchlistMovie] = useState([])

  const handleFetchMovies = async () => {
    try {
      let favorite = await AsyncStorage.getItem('favorite')
      let watchlist = await AsyncStorage.getItem('watchlist')

      if (favorite !== null) {
        setFavoriteMovie(JSON.parse(favorite))
      }

      if (watchlist !== null) {
        setWatchlistMovie(JSON.parse(watchlist))
      }
    } catch (e) {
      console.log(e)
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      handleFetchMovies()
    }, [globalCtx])
  )
  return (
    <BackgroundMovieScreen>
      <LogoLetterBox
        source={{
          uri: 'https://a.ltrbxd.com/logos/letterboxd-mac-icon.png'
        }}
      />
      <CategoryMovieSlide
        titleCtg='FILM FAVORIS'
        dataMovies={favoriteMovie}
        deletePossible={true}
      />
      <CategoryMovieSlide
        titleCtg='WATCHLIST'
        dataMovies={watchlistMovie}
        deletePossible={true}
      />
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
