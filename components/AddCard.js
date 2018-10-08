import React, { Component } from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import {
  Card,
  FormLabel,
  FormInput,
  FormValidationMessage,
  Button
} from 'react-native-elements'
import { primaryColor, lightPrimaryColor } from '../utils/colors'
import {
  ADD_CARD_QUESTION,
  ADD_CARD_QUESTION_ERROR,
  ADD_CARD_ANSWER,
  ADD_CARD_ANSWER_ERROR,
  ADD_CARD_BUTTON
} from '../utils/constants'
import { addCard } from '../actions'

class AddCard extends Component {
  state={
    isQuestionInvalid: false,
    isAnswerInvalid: false,
    question: '',
    answer: ''
  }

  setQuestion = (question) => this.setState({ question, isQuestionInvalid: false })
  setAnswer = (answer) => this.setState({ answer, isAnswerInvalid: false })

  handleButtonClick = () => {
    const { isQuestionInvalid, isAnswerInvalid, question, answer } = this.state
    const { navigation, addCard, selectedDeck } = this.props

    if(question.length && answer.length){
      addCard(selectedDeck, {question, answer})
      navigation.dispatch(NavigationActions.back())
    } else {
      this.setState({
        isQuestionInvalid: !Boolean(question.length),
        isAnswerInvalid: !Boolean(answer.length)
      })
    }
  }

  render() {
    const { isQuestionInvalid, isAnswerInvalid } = this.state
    return (
      <View style={styles.container}>
        <Card containerStyle={styles.card}>
          <FormLabel>{ADD_CARD_QUESTION}</FormLabel>
          <FormInput
            maxLength={120}
            containerStyle={{width: Dimensions.get('window').width - 80}}
            onChangeText={this.setQuestion}
          />
          <FormValidationMessage>
            {isQuestionInvalid ? ADD_CARD_QUESTION_ERROR : ' '}
          </FormValidationMessage>
          <FormLabel>{ADD_CARD_ANSWER}</FormLabel>
          <FormInput
            maxLength={120}
            containerStyle={{width: Dimensions.get('window').width - 80}}
            onChangeText={this.setAnswer}
          />
          <FormValidationMessage>
            {isAnswerInvalid ? ADD_CARD_ANSWER_ERROR : ' '}
          </FormValidationMessage>
          <Button
            raised
            icon={{name: 'check'}}
            backgroundColor={primaryColor}
            containerViewStyle={styles.button}
            title={ADD_CARD_BUTTON}
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

const mapStateToProps = selectedDeck => selectedDeck
const mapDispatchToProps = dispatch => (
  { addCard: (key, question) => dispatch(addCard(key, question)) }
)

export default connect(mapStateToProps, mapDispatchToProps)(AddCard)
