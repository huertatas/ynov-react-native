import { View, Text } from 'react-native'
import React from 'react'
import styled from 'styled-components'

export default function CtaMovieDetails({ colorsCta }) {
  const TopBackground = styled.View`
    height: 100px;
    width: 100px;
    border-radius: 15px;
    background: ${colorsCta};
  `

  return <TopBackground></TopBackground>
}
