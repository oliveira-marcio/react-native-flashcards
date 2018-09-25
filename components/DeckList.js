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
import { gray } from '../utils/colors'
import { Card } from 'react-native-elements'
import { decks } from '../utils/mockData'

export default class DeckList extends Component {
  renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => alert(`${item.title}\nCartas: ${item.questions.length}`)} >
        <Card containerStyle={{margin: 0}} >
          <Text>{item.title}</Text>
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
  }
})
