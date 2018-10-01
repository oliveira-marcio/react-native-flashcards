import React, { Component } from 'react'
import { StyleSheet, View, Alert } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { white, purple, black  } from '../utils/colors'
import { CARD } from '../utils/constants'
import { plural } from '../utils/helpers'
import { Icon, Button, FormLabel } from 'react-native-elements'
import { removeDeck } from '../actions'
import {
  DECK_ADD_CARD_BUTTON,
  DECK_QUIZ_BUTTON,
  DIALOG_DELETE_CARD_TITLE,
  DIALOG_DELETE_CARD_MESSAGE1,
  DIALOG_DELETE_CARD_MESSAGE2,
  DIALOG_DELETE_CARD_OK,
  DIALOG_DELETE_CARD_CANCEL
} from '../utils/constants'

class Deck extends Component {
  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params
    return { title }
  }

  handleAddButtonClick = () => {
    const { navigation } = this.props
    const { title } = navigation.state.params
    navigation.navigate('AddCard', { title })
  }

  handleDeleteButtonClick = () => {
    const { navigation, removeDeck } = this.props
    const { title } = navigation.state.params
    Alert.alert(
      DIALOG_DELETE_CARD_TITLE,
      DIALOG_DELETE_CARD_MESSAGE1 + title + DIALOG_DELETE_CARD_MESSAGE2,
      [
        {text: DIALOG_DELETE_CARD_CANCEL, style: 'cancel'},
        {text: DIALOG_DELETE_CARD_OK, onPress: () => {
          removeDeck(title)
          navigation.dispatch(NavigationActions.back())
        }},
      ],
    )
  }

  render() {
    const { decks, navigation } = this.props
    const { title } = navigation.state.params
    const { questions } = decks[title]

    return (
      <View style={styles.container}>
        <Icon
          raised
          containerStyle={{backgroundColor: purple, alignSelf: 'flex-end'}}
          name='trash'
          type='font-awesome'
          underlayColor={purple}
          color={white}
          onPress={this.handleDeleteButtonClick}
        />
        <FormLabel containerStyle={{alignSelf: 'center'}}>{title}</FormLabel>
        <FormLabel containerStyle={{alignSelf: 'center'}}>{plural(questions.length, CARD)}</FormLabel>
        <Button
          raised
          icon={{name: 'file', type: 'font-awesome', color: black}}
          color={black}
          backgroundColor={white}
          containerViewStyle={{marginTop: 50, width: 200, alignSelf: 'center'}}
          title={DECK_ADD_CARD_BUTTON}
          onPress={this.handleAddButtonClick}
        />
        <Button
          raised
          icon={{name: 'play', type: 'font-awesome'}}
          backgroundColor={purple}
          containerViewStyle={{marginTop: 20, width: 200, alignSelf: 'center'}}
          title={DECK_QUIZ_BUTTON}
          onPress={ () => alert('Quiz não implementado... :-(') }
        />
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

const mapStateToProps = decks => decks

const mapDispatchToProps = dispatch => (
  { removeDeck: (data) => dispatch(removeDeck(data)) }
)

export default connect(mapStateToProps, mapDispatchToProps)(Deck)
