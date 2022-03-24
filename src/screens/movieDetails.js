import React, { useContext, useEffect, useState } from 'react'
import GlobalProvider from '../context/globalContext'
import axios from 'axios'
import styled from 'styled-components'
import CtaMovieDetails from '../components/ctaMovieDetails'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function MovieDetails() {
  const globalCtx = useContext(GlobalProvider)
  const [movieDetailObj, setMovieDetailObj] = useState({ vide: true })
  const [movieReviewsArr, setMovieReviewsArr] = useState([])
  const [commentaryUser, setCommentaryUser] = useState('')

  const handleFetchMovieById = async () => {
    try {
      const movieDetail = await axios.get(
        `https://api.themoviedb.org/3/movie/${globalCtx.idMovie}?api_key=${globalCtx.apiKey}`
      )

      const movieReviews = await axios.get(
        `https://api.themoviedb.org/3/movie/${globalCtx.idMovie}/reviews?api_key=${globalCtx.apiKey}`
      )

      setMovieDetailObj(movieDetail.data)

      setMovieReviewsArr(movieReviews.data.results)
    } catch (e) {
      console.log(e.message)
    }
  }

  const handleAddToStorage = async key => {
    // stringify l'array avant de le mettre dans storage
    try {
      let actualArr = await AsyncStorage.getItem(key)
      if (actualArr === null) {
        actualArr = []
      } else {
        actualArr = JSON.parse(actualArr)
      }

      const findIfAlreadyExist = actualArr.find(
        itemMovie => itemMovie.id === movieDetailObj.id
      )

      if (findIfAlreadyExist !== undefined) {
        console.log('already selectioned')
        return
      }

      actualArr.push(movieDetailObj)
      actualArr = JSON.stringify(actualArr)
      console.log(actualArr)
      await AsyncStorage.setItem(key, actualArr)
    } catch (error) {
      console.log(error)
    }
  }

  const handleAddCom = () => {
    if (commentaryUser.length > 0) {
      setMovieReviewsArr([
        { author: globalCtx.nameUser, content: commentaryUser },
        ...movieReviewsArr
      ])
    }
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
        <CtaMovieDetails
          colorsCta='green'
          ctaText='add to watchlist'
          uriIcon='https://www.pngrepo.com/png/2179/180/eye.png'
          funcToHandle={handleAddToStorage.bind(null, 'watchlist')}
        />
        <CtaMovieDetails
          colorsCta='#9ab'
          ctaText='add to favorite'
          uriIcon='https://www.pngrepo.com/png/53737/180/favorite.png'
          funcToHandle={handleAddToStorage.bind(null, 'favorite')}
        />
      </ContainsCta>

      <AddCommentary
        placeholder='add a commentary'
        onChangeText={text => setCommentaryUser(text)}
      />
      <ButtonAddCommentary onPress={() => handleAddCom()} title='add'>
        add
      </ButtonAddCommentary>

      {movieReviewsArr.map(review => {
        return (
          <CommentarySection key={review?.author}>
            <CommentaryName>{review?.author}</CommentaryName>
            <CommentaryText>{review?.content}</CommentaryText>
          </CommentarySection>
        )
      })}
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

const FlatListReviews = styled.FlatList``

const CommentarySection = styled.View`
  padding: 15px;
  border: solid 0.5px grey;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const CommentaryName = styled.Text`
  color: cyan;
`

const CommentaryText = styled.Text`
  color: white;
`

const AddCommentary = styled.TextInput`
  background: whitesmoke;
  border-radius: 10px;
  height: 50px;
  margin: 10px;
`

const ButtonAddCommentary = styled.Button`
  margin: 10px;
  background-color: cyan;
  height: 40px;
`
