import React, { Component } from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
  Button,
  Card
} from 'react-native-elements'
import { primaryColor, lightPrimaryColor } from '../utils/colors'
import {
  ADD_DECK_LABEL,
  ADD_DECK_ERROR,
  ADD_DECK_BUTTON
} from '../utils/constants'
import { addDeck } from '../actions'

class AddDeck extends Component {
  state={
    isInvalid: false,
    deckName: ''
  }

  setDeckName = (deckName) => this.setState({ deckName, isInvalid: false })
  handleButtonClick = () => {
    const { isInvalid, deckName } = this.state
    const { navigation, addDeck } = this.props

    if(deckName.length){
      addDeck(deckName)
      navigation.dispatch(NavigationActions.back())
    } else {
      this.setState({ isInvalid: true })
    }
  }

  render() {
    const { isInvalid } = this.state
    return (
      <View style={styles.container}>
        <Card containerStyle={styles.card}>
          <FormLabel>{ADD_DECK_LABEL}</FormLabel>
          <FormInput
            maxLength={20}
            containerStyle={{width: (Dimensions.get('window').width - 80)}}
            onChangeText={this.setDeckName}
          />
          <FormValidationMessage>
            {isInvalid ? ADD_DECK_ERROR : ' '}
          </FormValidationMessage>
          <Button
            raised
            icon={{name: 'check'}}
            backgroundColor={primaryColor}
            containerViewStyle={styles.button}
            title={ADD_DECK_BUTTON}
            onPress={ this.handleButtonClick }
          />
        </Card>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: lightPrimaryColor,
  },
  card: {
    margin: 20,
    paddingStart: 20,
    paddingEnd: 20,
    paddingTop: 40,
    paddingBottom: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    alignSelf: 'flex-end',
    marginTop: 50,
    width: 120
  }
})

const mapDispatchToProps = dispatch => (
  { addDeck: (data) => dispatch(addDeck(data)) }
)

export default connect(null, mapDispatchToProps)(AddDeck)
