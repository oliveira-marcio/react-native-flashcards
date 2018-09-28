import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
  Button
} from 'react-native-elements'
import { white, purple } from '../utils/colors'
import { ADD_DECK_LABEL, ADD_DECK_ERROR, ADD_DECK_BUTTON } from '../utils/constants'
import { saveDeckTitle } from '../utils/api'
import { addDeckEntry } from '../actions'

class AddDeck extends Component {
  state={
    isInvalid: false,
    deckName: ''
  }

  setDeckName = (deckName) => this.setState({ deckName, isInvalid: false })
  handleButtonClick = () => {
    const { isInvalid, deckName } = this.state
    if(deckName.length){
      const key = deckName
      const entry = { title: deckName, questions: [] }
      this.addDeckEntry(key, entry)
//      saveDeckTitle({ key, entry })
      this.props.navigation.dispatch(NavigationActions.back())
    } else {
      this.setState({ isInvalid: true })
    }
  }

  addDeckEntry = (key, entry) => this.props.addDeckEntry({
      [key]: entry
    })

  render() {
    const { isInvalid, deckName } = this.state
    return (
      <View style={styles.container}>
        <FormLabel>{ADD_DECK_LABEL}</FormLabel>
        <FormInput onChangeText={this.setDeckName}/>
        {isInvalid && (
          <FormValidationMessage>{ADD_DECK_ERROR}</FormValidationMessage>
        )}
        <Button
          raised
          icon={{name: 'check'}}
          backgroundColor={purple}
          containerViewStyle={{marginTop: 50, width: 120}}
          title={ADD_DECK_BUTTON}
          onPress={ this.handleButtonClick }
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: white,
  }
})

const mapDispatchToProps = dispatch => (
  { addDeckEntry: (entry) => dispatch(addDeckEntry(entry)) }
)

export default connect(null, mapDispatchToProps)(AddDeck)
