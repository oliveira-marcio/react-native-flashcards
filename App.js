import React, { Component } from 'react'
import { StyleSheet, Text, View, StatusBar, Platform } from 'react-native'
import { createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation'
import { Constants } from 'expo'
import { purple, white } from './utils/colors'
import DeckList from './components/DeckList'
import History from './components/History'

const AppStatusBar = ({backgroundColor, ...props}) => (
  <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
)

const Tabs = createMaterialTopTabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Baralhos',
    },
  },
  History: {
    screen: History,
    navigationOptions: {
      tabBarLabel: 'Log',
    },
  }
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? purple : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : purple,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <AppStatusBar backgroundColor={purple} barStyle="light-content" />
        <Tabs />
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
