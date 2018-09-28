import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
  Dimensions
} from 'react-native'
import { NavigationActions } from 'react-navigation'
import { white, gray, purple } from '../utils/colors'
import { Card, Icon } from 'react-native-elements'
import { CARD } from '../utils/constants'
import { plural } from '../utils/helpers'
import { getDecks } from '../utils/api'

class DeckList extends Component {
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

  componentDidMount(){
    // TODO; Chamar action/middleware para popular Store
//    getDecks().then(decks => this.setState({ decks, ready: true }))
  }

  render() {
    const { decks } = this.props
    console.log()

    if (!(decks && Object.keys(decks).length)) {
      return <Icon containerStyle={styles.container} name='spinner' type='font-awesome' />
    }

    return (
      <View style={styles.container}>
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
  empty: { // TODO: Verificar porque está com scroll
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

const mapStateToProps = decks => decks
export default connect(mapStateToProps)(DeckList)
