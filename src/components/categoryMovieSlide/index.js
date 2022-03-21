import { View, Text } from 'react-native'
import styled from 'styled-components'
import React from 'react'
import ListCategory from './listCategory'

export default function CategoryMovieSlide({ titleCtg, dataMovies }) {
  return (
    <View>
      <TitleCategory>{titleCtg}</TitleCategory>
      <ListCategory arrFilm={dataMovies} />
    </View>
  )
}

const TitleCategory = styled.Text`
  margin: 15px;
  color: white;
`
