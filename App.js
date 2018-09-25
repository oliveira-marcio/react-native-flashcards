import React, { Component } from 'react'
import { StyleSheet, Text, View, StatusBar } from 'react-native'
import DeckList from './components/DeckList'
import { Constants } from 'expo'


export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={{ height: Constants.statusBarHeight }}>
          <StatusBar translucent barStyle="light-content" />
        </View>
        <DeckList />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
})
