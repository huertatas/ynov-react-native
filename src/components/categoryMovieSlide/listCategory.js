import styled from 'styled-components'
import { TouchableHighlight } from 'react-native'
import React, { useContext } from 'react'
import GlobalProvider from '../../context/globalContext'
import AsyncStorage from '@react-native-async-storage/async-storage'

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
      let favorite = await AsyncStorage.getItem(asyncKey)

      if (favorite === null) {
        return
      }

      favorite = JSON.parse(favorite)

      let result = favorite.filter(favoriteItem => favoriteItem.id !== id)

      result = JSON.stringify(result)

      globalCtx.handleReloadProfilPage(Date.now())

      await AsyncStorage.setItem(asyncKey, result)
    } catch (e) {
      console.log(e.message)
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
              onPress={() =>
                handleDeleteMovieFromProfil.bind(null, item.id, titleCtg)()
              }
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
