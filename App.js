import React, { Component } from 'react'
import { View, StatusBar, Platform } from 'react-native'
import { createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation'
import { fromLeft, fromTop } from 'react-navigation-transitions'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import reducer from './reducers'
import { Provider } from 'react-redux'
import { Constants } from 'expo'
import { primaryColor, white } from './utils/colors'
import {
  APP_NAME,
  TAB_DECKS,
  TAB_LOG,
  ADD_DECK_TITLE,
  ADD_CARD_TITLE,
  QUIZ_TITLE
} from './utils/constants'
import { setLocalNotification } from './utils/helpers'

import DeckList from './components/DeckList'
import History from './components/History'
import Deck from './components/Deck'
import AddDeck from './components/AddDeck'
import AddCard from './components/AddCard'
import FlipCard from './components/FlipCard'

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
    activeTintColor: Platform.OS === 'ios' ? primaryColor : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : primaryColor,
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
          backgroundColor: primaryColor,
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
          backgroundColor: primaryColor,
        }
      }
    },
    AddDeck: {
      screen: AddDeck,
      navigationOptions: {
        title: ADD_DECK_TITLE,
        headerTintColor: white,
        headerStyle: {
          backgroundColor: primaryColor,
        }
      }
    },
    AddCard: {
      screen: AddCard,
      navigationOptions: {
        title: ADD_CARD_TITLE,
        headerTintColor: white,
        headerStyle: {
          backgroundColor: primaryColor,
        }
      }
    },
    FlipCard: {
      screen: FlipCard,
      navigationOptions: {
        title: QUIZ_TITLE,
        headerTintColor: white,
        headerStyle: {
          backgroundColor: primaryColor,
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
  componentDidMount = () => setLocalNotification()
  render() {
    return (
      <Provider store={createStore(reducer, applyMiddleware(thunk))}>
        <View style={{flex: 1}}>
          <AppStatusBar backgroundColor={primaryColor} barStyle="light-content" />
          <MainNavigator />
        </View>
      </Provider>
    )
  }
}
