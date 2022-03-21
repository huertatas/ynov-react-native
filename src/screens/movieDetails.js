import React, { useContext, useEffect, useState } from 'react'
import GlobalProvider from '../context/globalContext'
import axios from 'axios'
import styled from 'styled-components'
import CtaMovieDetails from '../components/ctaMovieDetails'

export default function MovieDetails() {
  const globalCtx = useContext(GlobalProvider)
  const [movieDetailObj, setMovieDetailObj] = useState({ vide: true })

  const handleFetchMovieById = async () => {
    const movieDetail = await axios.get(
      `https://api.themoviedb.org/3/movie/${globalCtx.idMovie}?api_key=${globalCtx.apiKey}`
    )

    setMovieDetailObj(movieDetail.data)
  }

  useEffect(() => {
    // fetch movie details
    handleFetchMovieById()
  }, [])
  return (
    <ViewContainer>
      <TopBackground
        source={{
          uri: `https://image.tmdb.org/t/p/original/${movieDetailObj?.backdrop_path}`
        }}
      ></TopBackground>
      <ContainsInfoDetailTop>
        <InfoDetailLeft>
          <TitleMovie>{movieDetailObj?.original_title}</TitleMovie>
          <NormalText>Note : {movieDetailObj?.vote_average}</NormalText>
        </InfoDetailLeft>
        <InfoDetailRight>
          <FilmPoster
            source={{
              uri: `https://image.tmdb.org/t/p/original/${movieDetailObj.poster_path}`
            }}
          />
        </InfoDetailRight>
      </ContainsInfoDetailTop>
      <Synopsis>{movieDetailObj?.overview}</Synopsis>
      <ContainsCta>
        <CtaMovieDetails colorsCta='green' />
        <CtaMovieDetails colorsCta='grey' />
      </ContainsCta>
    </ViewContainer>
  )
}

const TopBackground = styled.Image`
  height: 200px;
`

const ViewContainer = styled.ScrollView`
  background: #14181c;
`

const ContainsInfoDetailTop = styled.View`
  display: flex;
  flex-direction: row
  align-items: center;
  padding: 15px;  
`

const InfoDetailLeft = styled.View`
  width: 60%;
  height: 100%;
`

const InfoDetailRight = styled.View`
  width: 40%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const FilmPoster = styled.Image`
  height: 150px;
  width: 95px;
  border: 1px solid grey;
  margin: 5px;
`

const TitleMovie = styled.Text`
  font-size: 30px;
  color: white;
`

const NormalText = styled.Text`
  font-size: 15px;
  color: red;
  margin-top: 15px;
  margin-bottom: 15px;
`

const Synopsis = styled.Text`
  font-size: 17px;
  color: #9ab;
  padding: 15px;
`

const ContainsCta = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 15px;
`
