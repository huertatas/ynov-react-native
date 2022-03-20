import { Button } from 'react-native'
import React from 'react'

export default function ButtonStyled({ funcButton }) {
  return <Button title='press me' onPress={() => funcButton()} />
}
