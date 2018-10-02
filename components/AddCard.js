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
import {
  ADD_CARD_QUESTION,
  ADD_CARD_QUESTION_ERROR,
  ADD_CARD_ANSWER,
  ADD_CARD_ANSWER_ERROR,
  ADD_CARD_BUTTON
} from '../utils/constants'
import { addCard } from '../actions'

class AddCard extends Component {
  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params
    return { title }
  }

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
    const { navigation, addCard } = this.props
    const { title } = navigation.state.params

    if(question.length && answer.length){
      addCard(title, {question, answer})
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
        <FormLabel>{ADD_CARD_QUESTION}</FormLabel>
        <FormInput onChangeText={this.setQuestion}/>
        {isQuestionInvalid && (
          <FormValidationMessage>{ADD_CARD_QUESTION_ERROR}</FormValidationMessage>
        )}
        <FormLabel>{ADD_CARD_ANSWER}</FormLabel>
        <FormInput onChangeText={this.setAnswer}/>
        {isAnswerInvalid && (
          <FormValidationMessage>{ADD_CARD_ANSWER_ERROR}</FormValidationMessage>
        )}
        <Button
          raised
          icon={{name: 'check'}}
          backgroundColor={purple}
          containerViewStyle={{marginTop: 50, width: 200, alignSelf: 'center'}}
          title={ADD_CARD_BUTTON}
          onPress={ this.handleButtonClick }
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    backgroundColor: white,
  }
})

const mapDispatchToProps = dispatch => (
  { addCard: (key, question) => dispatch(addCard(key, question)) }
)

export default connect(decks => decks, mapDispatchToProps)(AddCard)
