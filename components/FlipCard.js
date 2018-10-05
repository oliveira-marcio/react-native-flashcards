import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { white, purple, black  } from '../utils/colors'
import { Card, FormLabel, Icon, Button } from 'react-native-elements'
import { formatPercent } from '../utils/helpers'
import PropTypes from 'prop-types'
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Alert
} from 'react-native'
import {
  QUIZ_QUESTION_LABEL,
  QUIZ_ANSWER_LABEL,
  QUIZ_FINISH_LABEL,
  QUIZ_FINISH_RESULT,
  DIALOG_NOT_ANSWERED_TITLE,
  DIALOG_NOT_ANSWERED_MESSAGE,
  DIALOG_RESTART_TITLE,
  DIALOG_RESTART_MESSAGE,
  DIALOG_RESTART_OK,
  DIALOG_RESTART_CANCEL,
  OF
} from '../utils/constants'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'

class FlipCard extends Component {
  state = {
    currentCard: 0,
    isAnswered: false,
    isCorrect: false,
    score: 0,
    flipValue: new Animated.Value(0),
    displayFront: true
  }

  handleNextButton = () => {
    const { currentCard, isAnswered, isCorrect, score, displayFront } = this.state
    const { decks, selectedDeck } = this.props

    if(isAnswered){
      // Caso esteja exibindo a frente da carta, faz uma dupla rotação antes de
      // avançar para a próxima carta. Caso contrário, apenas uma rotação
      const newScore = isCorrect ? score + 1 : score

      if(displayFront){
        this.flipCard(() => {
          this.flipCard(null, 32, 40)
          this.setState({ currentCard: currentCard + 1, isAnswered: false, score: newScore })
        }, 32, 40)
      } else {
        this.flipCard()
        this.setState({ currentCard: currentCard + 1, isAnswered: false, score: newScore })
      }
    } else {
      Alert.alert(DIALOG_NOT_ANSWERED_TITLE, DIALOG_NOT_ANSWERED_MESSAGE)
    }
  }

  handleAnswerClick = (isCorrect) => {
    const { isAnswered, } = this.state
    this.setState({
      isAnswered: true,
      isCorrect
    })
  }

  handleRestartClick = () => {
    Alert.alert(
      DIALOG_RESTART_TITLE,
      DIALOG_RESTART_MESSAGE,
      [
        {text: DIALOG_RESTART_CANCEL, style: 'cancel'},
        {text: DIALOG_RESTART_OK, onPress: () => {
          this.setState({
            currentCard: 0,
            isAnswered: false,
            isCorrect: false,
            score: 0,
            flipValue: new Animated.Value(0),
            displayFront: true
          })
        }},
      ],
    )
  }

  flipCard = (onComplete = null, friction = 8, tension = 10) => {
    const {displayFront, flipValue} = this.state
    Animated.spring(flipValue, {
      toValue: displayFront ? 180 : 0,
      friction,
      tension
    }).start(onComplete);
    this.setState({displayFront: !displayFront})
  }

  setAnimatedStyle = (isFront) => ({
    transform: [
      {
        rotateY: this.state.flipValue.interpolate({
          inputRange: [0, 180],
          outputRange: isFront ? ['0deg', '180deg'] : ['180deg', '360deg'],
        })
      }
    ],
    opacity: this.state.flipValue.interpolate({
      inputRange: [89, 90],
      outputRange: isFront ? [1, 0] : [0, 1]
    })
  })

  render() {
    const { decks, selectedDeck, navigation } = this.props
    const { currentCard, isAnswered, isCorrect, score } = this.state
    const questions = decks[selectedDeck].questions

    // Quiz finalizado
    if(currentCard >= questions.length){
      // TODO: Gravar LOG
      clearLocalNotification().then(setLocalNotification)

      return (
        <FinishCard
          score = {score}
          length = {questions.length}
          onRestart = {this.handleRestartClick}
          onFinish = {() => navigation.dispatch(NavigationActions.back())}
        />
      )
    }

    return (
      <View style={styles.container}>
        <FormLabel>
          {QUIZ_QUESTION_LABEL} {currentCard + 1} {OF} {questions.length}
        </FormLabel>
        <View>
          <Animated.View style={[styles.flipCard, this.setAnimatedStyle(true)]}>
            <Card containerStyle={{flex: 1, margin: 0}}>
              <FormLabel>
                {QUIZ_QUESTION_LABEL}: {questions[currentCard].question}
              </FormLabel>
            </Card>
          </Animated.View>
          <Animated.View style={[styles.flipCard, styles.flipCardBack, this.setAnimatedStyle(false)]}>
            <Card containerStyle={{margin: 0, alignItems: 'center'}}>
              <FormLabel containerStyle={{marginBottom: 50}}>
                {QUIZ_ANSWER_LABEL}: {questions[currentCard].answer}
              </FormLabel>
              <View style={styles.controls}>
                {isAnswered && isCorrect ? (
                  <Button
                    raised
                    icon={{name: 'check'}}
                    color={white}
                    backgroundColor={purple}
                    containerViewStyle={{margin: 10, width: 150}}
                    title={'Correto'}
                    onPress={ () => this.handleAnswerClick(true) }
                  />
                ) : (
                  <Button
                    raised
                    icon={{name: 'check', color: black}}
                    color={black}
                    backgroundColor={white}
                    containerViewStyle={{margin: 10, width: 150}}
                    title={'Correto'}
                    onPress={ () => this.handleAnswerClick(true) }
                  />
                )}
                {isAnswered && !isCorrect ? (
                  <Button
                    raised
                    icon={{name: 'close'}}
                    color={white}
                    backgroundColor={purple}
                    containerViewStyle={{margin: 10, width: 150}}
                    title={'Incorreto'}
                    onPress={ () => this.handleAnswerClick(false) }
                  />
                ) : (
                  <Button
                    raised
                    icon={{name: 'close', color: black}}
                    color={black}
                    backgroundColor={white}
                    containerViewStyle={{margin: 10, width: 150}}
                    title={'Incorreto'}
                    onPress={ () => this.handleAnswerClick(false) }
                  />
                )}
              </View>
            </Card>
          </Animated.View>
        </View>
        <View style={styles.controls}>
          <Icon
            raised
            containerStyle={{margin: 30, backgroundColor: purple}}
            name='exchange'
            type='font-awesome'
            underlayColor={purple}
            color={white}
            onPress={() => this.flipCard()}
          />
          <Icon
            raised
            containerStyle={{margin: 30, backgroundColor: purple}}
            name={currentCard < questions.length - 1 ? 'step-forward' : 'check'}
            type='font-awesome'
            underlayColor={purple}
            color={white}
            onPress={this.handleNextButton}
          />
        </View>
      </View>
    )
  }
}

const FinishCard = (props) => {
  const {score, length, onRestart, onFinish} = props
  const ratio = formatPercent(score / length)

  return (
    <View style={styles.container}>
      <Card containerStyle={{alignSelf: 'stretch', margin: 40, padding: 20}}>
        <FormLabel>
          {QUIZ_FINISH_LABEL}
        </FormLabel>
        <FormLabel>
          {QUIZ_FINISH_RESULT}: {ratio}
        </FormLabel>
      </Card>
      <View style={styles.controls}>
        <Icon
          raised
          containerStyle={{margin: 30, backgroundColor: purple}}
          name='repeat'
          type='font-awesome'
          underlayColor={purple}
          color={white}
          onPress={onRestart}
        />
        <Icon
          raised
          containerStyle={{margin: 30, backgroundColor: purple}}
          name='check'
          type='font-awesome'
          underlayColor={purple}
          color={white}
          onPress={onFinish}
        />
      </View>
    </View>
  )
}

FinishCard.propTypes = {
  score: PropTypes.number.isRequired,
  length: PropTypes.number.isRequired,
  onRestart: PropTypes.func.isRequired,
  onFinish: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  controls:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-around",
  },
  flipCard: {
    width: Dimensions.get('window').width,
    height: 300,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'center',
    backfaceVisibility: 'hidden',
  },
  flipCardBack: {
    position: "absolute",
    top: 0,
  },
  flipText: {
    width: 90,
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  }
})

const mapStateToProps = ({decks, selectedDeck}) => ({decks, selectedDeck})

export default connect(mapStateToProps)(FlipCard)
