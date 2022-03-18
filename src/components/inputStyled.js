import { View } from 'react-native'
import React from 'react'
import styled from 'styled-components'

export default function InputStyled() {
  return (
    <ContainsInput>
      <InputStld placeholder='useless placeholder' />
    </ContainsInput>
  )
}

const InputStld = styled.TextInput`
  height: 50px;
  width: 80%;
  border: 1px solid black;
  border-radius: 10px;
`

const ContainsInput = styled.View`
  padding: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`
