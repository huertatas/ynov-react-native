import styled from 'styled-components'
import { TouchableHighlight } from 'react-native'
import React, { useContext } from 'react'
import GlobalProvider from '../../context/globalContext'

export default function ListCategory({ arrFilm }) {
  const globalCtx = useContext(GlobalProvider)

  const handleNavigateToMovieDetails = idMovie => {
    globalCtx.idMovie = idMovie
    globalCtx.navMovieDetails.navigate('MovieDetails')
  }

  return (
    <FlatCtg
      horizontal
      data={arrFilm}
      renderItem={({ item }) => (
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
