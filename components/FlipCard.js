import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { white, primaryColor, primaryText } from '../utils/colors'
import { Card, FormLabel, Icon, Button, Text } from 'react-native-elements'
import { formatPercent, timeToString } from '../utils/helpers'
import PropTypes from 'prop-types'
import {
  Dimensions,
  StyleSheet,
  View,
  TouchableOpacity,
  Animated,
  Image,
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
import { addLog } from '../actions'


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
    const { decks, selectedDeck, addLog } = this.props
    const { questions } = decks[selectedDeck]

    if(isAnswered){
      // Caso esteja exibindo a frente da carta, faz uma dupla rotação antes de
      // avançar para a próxima carta. Caso contrário, apenas uma rotação
      const newScore = isCorrect ? score + 1 : score

      if(currentCard >= questions.length - 1){
        const rate = newScore / questions.length
        addLog(timeToString(), selectedDeck, rate)
        clearLocalNotification().then(setLocalNotification)
      }

      if(displayFront){
        this.flipCard(() => {
          this.flipCard(null, 32, 40)
          this.setState({
            currentCard: currentCard + 1,
            isAnswered: false,
            score: newScore
          })
        }, 32, 40)
      } else {
        this.flipCard()
        this.setState({
          currentCard: currentCard + 1,
          isAnswered: false,
          score: newScore
        })
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
    const { questions } = decks[selectedDeck]

    // Quiz finalizado
    if(currentCard >= questions.length){
      const rate = score / questions.length
      return (
        <FinishCard
          rate = {rate}
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
        <View style={{flex: 1}}>
          <Animated.View style={[styles.flipCard, this.setAnimatedStyle(true)]}>
            <Card containerStyle={styles.card} wrapperStyle={styles.cardInsideFront}>
              <FormLabel containerStyle={{marginBottom: 20}}>
                {QUIZ_QUESTION_LABEL}:
              </FormLabel>
              <Text h4>{questions[currentCard].question}</Text>
            </Card>
          </Animated.View>
          <Animated.View style={[styles.flipCard, styles.flipCardBack, this.setAnimatedStyle(false)]}>
            <Card containerStyle={styles.card} wrapperStyle={styles.cardInsideBack}>
              <View style={{alignItems: 'center'}}>
                <FormLabel containerStyle={{marginBottom: 20}}>
                  {QUIZ_ANSWER_LABEL}:
                </FormLabel>
                <Text h4>{questions[currentCard].answer}</Text>
              </View>
              <View style={styles.controls}>
                {isAnswered && isCorrect ? (
                  <Button
                    raised
                    icon={{name: 'check'}}
                    color={white}
                    backgroundColor={primaryColor}
                    containerViewStyle={{margin: 10, width: 150}}
                    title={'Correto'}
                    onPress={ () => this.handleAnswerClick(true) }
                  />
                ) : (
                  <Button
                    raised
                    icon={{name: 'check', color: primaryText}}
                    color={primaryText}
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
                    backgroundColor={primaryColor}
                    containerViewStyle={{margin: 10, width: 150}}
                    title={'Incorreto'}
                    onPress={ () => this.handleAnswerClick(false) }
                  />
                ) : (
                  <Button
                    raised
                    icon={{name: 'close', color: primaryText}}
                    color={primaryText}
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
            containerStyle={{margin: 30, backgroundColor: primaryColor}}
            name='exchange'
            type='font-awesome'
            underlayColor={primaryColor}
            color={white}
            onPress={() => this.flipCard()}
          />
          <Icon
            raised
            containerStyle={{margin: 30, backgroundColor: primaryColor}}
            name={currentCard < questions.length - 1 ? 'step-forward' : 'check'}
            type='font-awesome'
            underlayColor={primaryColor}
            color={white}
            onPress={this.handleNextButton}
          />
        </View>
      </View>
    )
  }
}

const FinishCard = (props) => {
  const {rate, onRestart, onFinish} = props
  return (
    <View style={styles.container}>
      <Card
        containerStyle={styles.finishCard}
        wrapperStyle={{flex: 1, alignItems: 'center'}}
      >
        <Text h4>
          {QUIZ_FINISH_LABEL}
        </Text>
        <FormLabel containerStyle={{padding: 20}}>
          {QUIZ_FINISH_RESULT}:
        </FormLabel>
        <Text h1 style={{flex: 1, fontSize: 80, color: primaryColor}}>
          {formatPercent(rate)}
        </Text>
        <Image
          resizeMode='stretch'
          style={styles.image}
          source={require('../assets/results.png')}
        />
      </Card>
      <View style={styles.controls}>
        <Icon
          raised
          containerStyle={{margin: 30, backgroundColor: primaryColor}}
          name='repeat'
          type='font-awesome'
          underlayColor={primaryColor}
          color={white}
          onPress={onRestart}
        />
        <Icon
          raised
          containerStyle={{margin: 30, backgroundColor: primaryColor}}
          name='check'
          type='font-awesome'
          underlayColor={primaryColor}
          color={white}
          onPress={onFinish}
        />
      </View>
    </View>
  )
}

FinishCard.propTypes = {
  rate: PropTypes.number.isRequired,
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
    height: Dimensions.get('window').height - 240,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'stretch',
    backfaceVisibility: 'hidden',
  },
  flipCardBack: {
    position: "absolute",
    top: 0,
  },
  card: {
    flex: 1,
    margin: 0,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  finishCard: {
    flex: 1,
    margin: 40,
    padding: 20,
    borderRadius: 10,
    alignSelf: 'stretch'
  },
  cardInsideFront: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  cardInsideBack: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  image: {
    width: 120,
    height: 150
  }
})

const mapStateToProps = ({decks, selectedDeck}) => ({decks, selectedDeck})
const mapDispatchToProps = dispatch => (
  {
    addLog: (date, deck, rate) => dispatch(addLog(date, deck, rate))
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(FlipCard)
