import React, { Component } from 'react'
import { StyleSheet, View, Alert, Image } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { white, primaryColor, primaryText } from '../utils/colors'
import { CARD } from '../utils/constants'
import { plural } from '../utils/helpers'
import { Icon, Button, FormLabel, Text } from 'react-native-elements'
import { removeDeck } from '../actions'
import {
  DECK_ADD_CARD_BUTTON,
  DECK_QUIZ_BUTTON,
  DIALOG_DELETE_CARD_TITLE,
  DIALOG_DELETE_CARD_MESSAGE1,
  DIALOG_DELETE_CARD_MESSAGE2,
  DIALOG_DELETE_CARD_OK,
  DIALOG_DELETE_CARD_CANCEL,
  DIALOG_DECK_EMPTY_TITLE,
  DIALOG_DECK_EMPTY_MESSAGE,
} from '../utils/constants'

class Deck extends Component {
  static navigationOptions({ navigation }) {
    return {
      title: navigation.state.params.title,
      headerRight:
      <Icon
        name='trash'
        type='font-awesome'
        color={white}
        containerStyle={{margin: 20}}
        onPress={navigation.getParam('handleDeleteButtonClick')}
      />
    }
  }

  handleAddButtonClick = () => {
    const { navigation } = this.props
    navigation.navigate('AddCard')
  }

  handleDeleteButtonClick = () => {
    const { navigation, removeDeck, selectedDeck } = this.props
    Alert.alert(
      DIALOG_DELETE_CARD_TITLE,
      DIALOG_DELETE_CARD_MESSAGE1 + selectedDeck + DIALOG_DELETE_CARD_MESSAGE2,
      [
        {text: DIALOG_DELETE_CARD_CANCEL, style: 'cancel'},
        {text: DIALOG_DELETE_CARD_OK, onPress: () => {
          removeDeck(selectedDeck)
          navigation.dispatch(NavigationActions.back())
        }},
      ],
    )
  }

  handleQuizButton = () => {
    const { decks, selectedDeck, navigation } = this.props
    if(decks[selectedDeck].questions.length){
      navigation.navigate('FlipCard')
    } else {
      Alert.alert(DIALOG_DECK_EMPTY_TITLE, DIALOG_DECK_EMPTY_MESSAGE)
    }
  }
  componentDidMount() {
    this.props.navigation.setParams({
      handleDeleteButtonClick: this.handleDeleteButtonClick
    })
  }

  /**
   * Para evitar crash na renderização quando o baralho é deletado e o props
   * selectDeck fica vazio por conta do action removeItem()
   */
  shouldComponentUpdate = (nextProps, nextState) => this.props.selectedDeck &&
    nextProps.selectedDeck === this.props.selectedDeck

  render() {
    const { decks, selectedDeck, navigation } = this.props
    const { questions } = decks[selectedDeck]

    return (
      <View style={styles.container}>
        <View style={{alignItems: 'center'}}>
          <Text h2>{selectedDeck}</Text>
          <FormLabel labelStyle={{fontSize: 18}}>
            {plural(questions.length, CARD)}
          </FormLabel>
        </View>
        <Image
          resizeMode='stretch'
          style={styles.image}
          source={require('../assets/cards.png')}
        />
        <View>
          <Button
            raised
            icon={{name: 'file', type: 'font-awesome', color: primaryText}}
            color={primaryText}
            backgroundColor={white}
            containerViewStyle={{width: 200}}
            title={DECK_ADD_CARD_BUTTON}
            onPress={this.handleAddButtonClick}
          />
          <Button
            raised
            icon={{name: 'play', type: 'font-awesome'}}
            backgroundColor={primaryColor}
            containerViewStyle={{marginTop: 20, width: 200}}
            title={DECK_QUIZ_BUTTON}
            onPress={this.handleQuizButton}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 60
  },
  image: {
    alignSelf: 'center',
    width: 150,
    height: 136
  }
})

const mapStateToProps = ({decks, selectedDeck}) => ({decks, selectedDeck})
const mapDispatchToProps = dispatch => (
  { removeDeck: (data) => dispatch(removeDeck(data)) }
)

export default connect(mapStateToProps, mapDispatchToProps)(Deck)
