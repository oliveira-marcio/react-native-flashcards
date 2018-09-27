import React, { Component } from 'react'
import { StyleSheet, Text, View, StatusBar, Platform } from 'react-native'
import { createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation'
import { fromLeft, fromTop } from 'react-navigation-transitions'
import { Constants } from 'expo'
import { purple, white } from './utils/colors'
import { APP_NAME, TAB_DECKS, TAB_LOG, ADD_DECK_TITLE } from './utils/constants'
import DeckList from './components/DeckList'
import History from './components/History'
import Deck from './components/Deck'
import AddDeck from './components/AddDeck'

const AppStatusBar = ({backgroundColor, ...props}) => (
  <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
)

const Tabs = createMaterialTopTabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: TAB_DECKS,
    },
  },
  History: {
    screen: History,
    navigationOptions: {
      tabBarLabel: TAB_LOG,
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

const MainNavigator = createStackNavigator(
  {
    Tabs: {
      screen: Tabs,
      navigationOptions: {
        title: APP_NAME,
        headerTintColor: white,
        headerStyle: {
          backgroundColor: purple,
          elevation: 0
        },
        headerTitleStyle:{
          textAlign:'center', alignSelf:'center',flex:1
        }
      }
    },
    Deck: {
      screen: Deck,
      navigationOptions: {
        headerTintColor: white,
        headerStyle: {
          backgroundColor: purple,
        }
      }
    },
    AddDeck: {
      screen: AddDeck,
      navigationOptions: {
        title: ADD_DECK_TITLE,
        headerTintColor: white,
        headerStyle: {
          backgroundColor: purple,
        }
      }
    }
  },
  {
    initialRouteName: 'Tabs',
    transitionConfig: ({scene}) => (scene.index ? fromTop(500) : fromLeft(500)),
  }
)


export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <AppStatusBar backgroundColor={purple} barStyle="light-content" />
        <MainNavigator />
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
