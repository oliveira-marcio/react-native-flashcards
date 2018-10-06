import React from 'react'
import { StyleSheet, Image } from 'react-native'
import { Card, FormLabel } from 'react-native-elements'
import PropTypes from 'prop-types'

const EmptyCard = (props) => {
  return (
    <Card containerStyle={styles.container}>
      <Image
        style={styles.image}
        source={require('../assets/cards.png')}
      />
      <FormLabel labelStyle={{fontSize: 18}}>{props.text}</FormLabel>
    </Card>
  )
}

EmptyCard.propTypes = {
  text: PropTypes.string.isRequired,
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    paddingStart: 20,
    paddingEnd: 20,
    paddingTop: 40,
    paddingBottom: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    alignSelf: 'center',
    width: 150,
    height: 136,
    marginBottom: 40
  }
})

export default EmptyCard
