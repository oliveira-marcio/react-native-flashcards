import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { white } from '../utils/colors'

export default class History extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Log de estudos</Text>
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
