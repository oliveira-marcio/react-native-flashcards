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
import { white, gray, purple } from '../utils/colors'
import { Card, Icon } from 'react-native-elements'
import { CARD } from '../utils/constants'
import { plural } from '../utils/helpers'
import { fetchDecks, selectDeck } from '../actions'


class DeckList extends Component {
  handleItemClick = (key) => {
    const { navigation, selectDeck } = this.props
    selectDeck(key)
    navigation.navigate('Deck', {title: key})
  }

  renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => this.handleItemClick(item.title)} >
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
    // Comente abaixo para simular lista vazia
    this.props.fetchDecks()
  }

  render() {
    const { decks, decksAreLoading } = this.props

    if (decksAreLoading) {
      return <Icon containerStyle={styles.container} name='spinner' type='font-awesome' />
    }

    return (
      <View style={styles.container}>
        <FlatList
          data={ Object.values(decks) }
          contentContainerStyle={[{ flexGrow: 1 } , Object.values(decks).length ? null : { justifyContent: 'center'} ]}
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
  empty: { // TODO: Melhorar layout
    margin: 0,
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

const mapStateToProps = ({decks, decksAreLoading}) => ({decks, decksAreLoading})
const mapDispatchToProps = dispatch => (
  {
    fetchDecks: () => dispatch(fetchDecks()),
    selectDeck: (data) => dispatch(selectDeck(data))
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(DeckList)
