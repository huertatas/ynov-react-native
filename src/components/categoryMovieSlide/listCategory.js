import styled from 'styled-components'
import { TouchableHighlight } from 'react-native'
import React, { useContext } from 'react'
import GlobalProvider from '../../context/globalContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { showMessage } from 'react-native-flash-message'

export default function ListCategory({ arrFilm, deletePossible, titleCtg }) {
  const globalCtx = useContext(GlobalProvider)

  const handleNavigateToMovieDetails = idMovie => {
    globalCtx.idMovie = idMovie
    globalCtx.navMovieDetails.navigate('MovieDetails')
  }

  const handleDeleteMovieFromProfil = async (id, category) => {
    let asyncKey = ''
    if (category === 'FILM FAVORIS') {
      asyncKey = 'favorite'
    } else {
      asyncKey = 'watchlist'
    }

    try {
      let movieList = await AsyncStorage.getItem(asyncKey)

      if (movieList === null) {
        showMessage({
          message: 'Une erreur est survenue, veuillez réessayer',
          type: 'info'
        })
        return
      }

      movieList = JSON.parse(movieList)

      let result = movieList.filter(movieItem => movieItem.id !== id)

      result = JSON.stringify(result)

      showMessage({
        message: 'Élément supprimé de votre liste',
        type: 'info'
      })
      await AsyncStorage.setItem(asyncKey, result)
      globalCtx.handleReloadProfilPage(Math.random())
    } catch (e) {
      showMessage({
        message: 'Une erreur est survenue, veuillez réessayer',
        type: 'info'
      })
    }
  }

  return (
    <FlatCtg
      horizontal
      data={arrFilm}
      renderItem={({ item }) => (
        <>
          <TouchableHighlight
            onPress={() => {
              handleNavigateToMovieDetails(item.id)
            }}
          >
            <FilmItem
              source={{
                uri: `https://image.tmdb.org/t/p/original/${item.poster_path}`
              }}
            />
          </TouchableHighlight>
          {deletePossible && (
            <DeleteButton
              onPress={() => handleDeleteMovieFromProfil(item.id, titleCtg)}
              title='delete'
            />
          )}
        </>
      )}
      showsHorizontalScrollIndicator={false}
    />
  )
}

const FlatCtg = styled.FlatList`
  margin: 10px;
`

const FilmItem = styled.Image`
  height: 150px;
  width: 95px;
  border: 1px solid grey;
  margin: 5px;
`

const DeleteButton = styled.Button`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  background-color: red;
  margin-right: 50px;
`
