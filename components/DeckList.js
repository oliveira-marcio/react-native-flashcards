import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image
} from 'react-native'
import {
  white,
  primaryText,
  primaryColor,
  lightPrimaryColor,
  accentColor
} from '../utils/colors'
import { Card, Icon, Text } from 'react-native-elements'
import { CARD, DECK_EMPTY } from '../utils/constants'
import { plural } from '../utils/helpers'
import { fetchDecks, selectDeck } from '../actions'
import EmptyCard from './EmptyCard'



class DeckList extends Component {
  handleItemClick = (key) => {
    const { navigation, selectDeck } = this.props
    selectDeck(key)
    navigation.navigate('Deck', {title: key})
  }

  renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => this.handleItemClick(item.title)} >
        <Card containerStyle={styles.card} flexDirection='row'>
          <Image
            resizeMode='stretch'
            style={styles.image}
            source={require('../assets/cards.png')}
          />
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <Text h4>{item.title}</Text>
            <Text style={{fontSize: 16, color: primaryText}}>
              {plural(item.questions.length, CARD)}
            </Text>
          </View>
        </Card>
      </TouchableOpacity>
    )
  }

  renderEmptyComponent = () => {
    return (
      <EmptyCard text={DECK_EMPTY} />
    )
  }

  componentDidMount(){
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
          contentContainerStyle={[{ flexGrow: 1 },
            Object.values(decks).length ? null : { justifyContent: 'center'} ]}
          renderItem={ this.renderItem }
          ListEmptyComponent={ this.renderEmptyComponent }
          keyExtractor={(item, index) => item.title}
        />
        <Icon
          containerStyle={styles.fab}
          raised
          name='file'
          type='font-awesome'
          underlayColor={primaryColor}
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
    backgroundColor: lightPrimaryColor,
  },
  fab: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: accentColor,
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  card: {
    margin: 8,
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: 75,
    height: 68,
    marginRight: 20
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
