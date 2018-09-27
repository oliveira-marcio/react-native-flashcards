import React, { Component } from 'react'
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
  Dimensions
} from 'react-native'
import { NavigationEvents, NavigationActions } from 'react-navigation'
import { white, gray, purple } from '../utils/colors'
import { Card, Icon } from 'react-native-elements'
import { CARD } from '../utils/constants'
import { plural } from '../utils/helpers'
import { getDecks } from '../utils/api'

export default class DeckList extends Component {
  state = {
    ready: false,
    decks: {}
  }

  renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => this.props.navigation.navigate('Deck', {...item })} >
        <Card containerStyle={{margin: 0}} >
          <Text>{item.title}</Text>
          <Text>{plural(item.questions.length, CARD)}</Text>
        </Card>
      </TouchableOpacity>
    )
  }

// TODO: Melhorar estilo
  renderEmptyComponent = () => {
    return (
      <Card containerStyle={styles.empty}>
        <Text>Não há dados</Text>
      </Card>
    )
  }

// Não funciona direito. O parametro SAVED continua existindo
  clearParams = () => {
    this.props.navigation.dispatch(
        NavigationActions.init({
        params: {},
        key: 'DeckList',
      })
    )
    console.log(this.props.navigation.state)
  }

  handleAddedDeck = (params) => {
    if(params && params.hasOwnProperty('saved')){
      console.log(params)
      this.setState({ ready: false })
      getDecks().then(decks => this.setState({ decks, ready: true }))
    }
  }

  componentDidMount(){
    getDecks().then(decks => this.setState({ decks, ready: true }))
  }

  render() {
    const { ready, decks } = this.state
    if (!ready) {
      return <Icon containerStyle={styles.container} name='spinner' type='font-awesome' />
    }

    return (
      <View style={styles.container}>
        <NavigationEvents
          onWillFocus={payload => this.handleAddedDeck(payload.state.params)}
          onWillBlur={this.clearParams}
        />
        <FlatList
          data={ /* [] */ Object.values(decks) }
          renderItem={ this.renderItem }
          ListEmptyComponent={ this.renderEmptyComponent }
          keyExtractor={(item, index) => item.title}
        />
        <Icon
          containerStyle={styles.fab}
          raised
          name='file'
          type='font-awesome'
          underlayColor={purple}
          color={white}
          onPress={() => this.props.navigation.navigate('AddDeck')}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: gray,
  },
  empty: {
    margin: 0,
    height: Dimensions.get('window').height,
    alignItems: 'center',
    justifyContent: 'center'
  },
  fab: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: purple,
    position: 'absolute',
    bottom: 10,
    right: 10,
  }
})
