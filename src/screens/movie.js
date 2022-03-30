import { View, Text } from 'react-native'
import React, { useEffect, useContext, useState } from 'react'
import styled from 'styled-components'
import CategoryMovieSlide from '../components/categoryMovieSlide'
import GlobalContext from '../context/globalContext'
import axios from 'axios'
import { showMessage } from 'react-native-flash-message'
import colors from '../helpers/colors'

export default function Movie({ navigation }) {
  const globalCtx = useContext(GlobalContext)

  globalCtx.navMovieDetails = navigation

  const [popularMovieArr, setPopularMovieArr] = useState([])
  const [topMovieArr, setTopMovieArr] = useState([])
  const [upcomingMovieArr, setUpcomingMovieArr] = useState([])
  const [nowMovieArr, setNowMovieArr] = useState([])

  const handleFetchMovies = async () => {
    try {
      const popularMovies = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${globalCtx.apiKey}`
      )

      const topRatedMovies = await axios.get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${globalCtx.apiKey}`
      )

      const upcomingRatedMovies = await axios.get(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${globalCtx.apiKey}`
      )

      const nowMovies = await axios.get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${globalCtx.apiKey}`
      )

      setPopularMovieArr(popularMovies.data.results)
      setTopMovieArr(topRatedMovies.data.results)
      setUpcomingMovieArr(upcomingRatedMovies.data.results)
      setNowMovieArr(nowMovies.data.results)
    } catch (e) {
      showMessage({
        message: 'Echec lors de la connexion au réseau',
        type: 'info'
      })
    }
  }

  useEffect(() => {
    handleFetchMovies()
  }, [])
  return (
    <BackgroundMovieScreen>
      <LogoLetterBox
        source={{
          uri: 'https://a.ltrbxd.com/logos/letterboxd-mac-icon.png'
        }}
      />
      <CategoryMovieSlide
        titleCtg='FILMS POPULAIRE CETTE SEMAINE'
        dataMovies={popularMovieArr}
      />
      <CategoryMovieSlide
        titleCtg='FILMS AVEC LES MEILLEURS NOTES'
        dataMovies={topMovieArr}
      />
      <CategoryMovieSlide
        titleCtg='FILMS PROCHAINEMENT EN SALLE'
        dataMovies={upcomingMovieArr}
      />
      <CategoryMovieSlide titleCtg='FILMS EN SALLE' dataMovies={nowMovieArr} />
    </BackgroundMovieScreen>
  )
}

const BackgroundMovieScreen = styled.ScrollView`
  background: ${colors.mainColor};
`

const LogoLetterBox = styled.Image`
  margin: auto;
  margin-top: 10px;
  margin-bottom: 15px;
  width: 50px;
  height: 50px;
`
