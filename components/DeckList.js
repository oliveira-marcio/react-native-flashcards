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
import { white, gray, purple } from '../utils/colors'
import { Card, Icon } from 'react-native-elements'
import { decks } from '../utils/mockData'
import { CARD } from '../utils/constants'
import { plural } from '../utils/helpers'

export default class DeckList extends Component {
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

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={ /*[] */ Object.values(decks) }
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
