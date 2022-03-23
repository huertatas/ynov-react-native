import { View, Text } from 'react-native'
import styled from 'styled-components'
import React from 'react'
import ListCategory from './listCategory'

export default function CategoryMovieSlide({ titleCtg, dataMovies, deletePossible }) {

  return (
    <View>
      <TitleCategory>{titleCtg}</TitleCategory>
      <ListCategory arrFilm={dataMovies} deletePossible={deletePossible} titleCtg={titleCtg} />
    </View>
  )
}

const TitleCategory = styled.Text`
  margin: 15px;
  color: white;
`
