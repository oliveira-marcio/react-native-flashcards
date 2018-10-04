import React, { Component } from 'react'
import { connect } from 'react-redux'
import { white, purple, black  } from '../utils/colors'
import { Card, FormLabel, Icon } from 'react-native-elements'
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated
} from 'react-native'
import {
  QUIZ_NOT_ANSWERED,
  QUIZ_QUESTION_LABEL,
  QUIZ_ANSWER_LABEL
} from '../utils/constants'

class FlipCard extends Component {
  state = {
    currentCard: 0,
    answered: false,
    score: 0,
    flipValue: new Animated.Value(0),
    displayFront: true
  }

  handleNextButton = () => {
    const { currentCard, answered, displayFront } = this.state
    if(answered){
      // Caso esteja exibindo a frente da carta, faz uma dupla rotação antes de
      // avançar para a próxima carta. Caso contrário, apenas uma rotação
      if(displayFront){
        this.flipCard(() => {
          this.flipCard(null, 32, 40)
          this.setState({ currentCard: currentCard + 1, answered: false })
        }, 32, 40)
      } else {
        this.flipCard()
        this.setState({ currentCard: currentCard + 1, answered: false })
      }
    } else {
      alert(QUIZ_NOT_ANSWERED)
    }
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
    const { decks, selectedDeck } = this.props
    const { currentCard } = this.state
    const questions = decks[selectedDeck].questions
    console.log(currentCard)

    return (
      <View style={styles.container}>
        <FormLabel>
          {currentCard + 1}/{questions.length}
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
            <Card containerStyle={{flex: 1, margin: 0}}>
              <FormLabel>
                {QUIZ_ANSWER_LABEL}: {questions[currentCard].answer}
              </FormLabel>
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
          {currentCard < questions.length - 1 ? (
            <Icon
              raised
              containerStyle={{margin: 30, backgroundColor: purple}}
              name='step-forward'
              type='font-awesome'
              underlayColor={purple}
              color={white}
              onPress={this.handleNextButton}
            />
          ) : (
            <Icon
              raised
              containerStyle={{margin: 30, backgroundColor: purple}}
              name='check'
              type='font-awesome'
              underlayColor={purple}
              color={white}
              onPress={() => alert('Fim')}
            />
          )}
        </View>
      </View>
    )
  }
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
