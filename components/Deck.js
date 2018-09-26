import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { white } from '../utils/colors'
import { CARD } from '../utils/constants'
import { plural } from '../utils/helpers'


export default class Deck extends Component {
  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params
    return { title }
  }

  render() {
    const { title, questions } = this.props.navigation.state.params
    return (
      <View style={styles.container}>
        <Text>{title}</Text>
        <Text>{plural(questions.length, CARD)}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
  }
})
