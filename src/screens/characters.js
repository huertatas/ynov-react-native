import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { FlatList } from 'react-native'
import Avatar from '../components/avatar'

const Characters = ({ navigation }) => {
  const [characters, setCharacters] = useState([])
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    axios({
      method: 'GET',
      url: 'https://gateway.marvel.com/v1/public/characters',
      params: {
        limit: 20,
        offset,
        ts: 1,
        apikey: '51f5653d973d80fcbea3d50882ddaa93',
        hash: '711890d64d763846dd2c44750a224905'
      }
    })
      .then(response => {
        setCharacters([...characters, ...response.data.data.results])
      })
      .catch(error => {
        console.log(error)
      })
  }, [offset])

  return (
    <>
      <TextStyled>Characters</TextStyled>
      <Button
        onPress={() => navigation.navigate('HomeStack', { screen: 'settings' })}
      >
        <TextStyled>To Home</TextStyled>
      </Button>
      <FlatList
        data={characters}
        keyExtractor={item => item.id}
        onEndReached={() => setOffset(offset + 20)}
        renderItem={({ item }) => (
          <Button
            onPress={() => navigation.navigate('Details', { id: item.id })}
          >
            <Avatar
              urlImage={`https:${item.thumbnail.path.split(':')[1]}.${
                item.thumbnail.extension
              }`}
            />
            <TextStyled>{item.name}</TextStyled>
          </Button>
        )}
      />
    </>
  )
}

const Button = styled.TouchableOpacity``
const TextStyled = styled.Text``

Characters.propTypes = {}

export default Characters
