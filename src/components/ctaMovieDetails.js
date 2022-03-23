import { View, Text } from 'react-native'
import React from 'react'
import styled from 'styled-components'
import { TouchableHighlight } from 'react-native'

export default function CtaMovieDetails({
  colorsCta,
  uriIcon,
  ctaText,
  funcToHandle
}) {
  const TopBackground = styled.View`
    height: 120px;
    width: 120px;
    border-radius: 15px;
    background: ${colorsCta};
    padding: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  `

  const IconCta = styled.Image`
    width: 35px;
    height: 35px;
  `

  const TextCta = styled.Text`
    color: white;
    text-align: center;
  `

  return (
    <TouchableHighlight
      onPress={() => {
        funcToHandle()
      }}
    >
      <TopBackground>
        <IconCta
          source={{
            uri: `${uriIcon}`
          }}
        />
        <TextCta>{ctaText}</TextCta>
      </TopBackground>
    </TouchableHighlight>
  )
}
