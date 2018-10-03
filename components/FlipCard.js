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

class FlipCard extends Component {
  state = {
    flipValue: new Animated.Value(0),
    displayFront: true
  }

  flipCard = () => {
    const {displayFront, flipValue} = this.state
    Animated.spring(flipValue, {
      toValue: displayFront ? 180 : 0,
      friction: 8,
      tension: 10
    }).start();
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
    return (
      <View style={styles.container}>
        <FormLabel>
          1/9
        </FormLabel>
        <View>
          <Animated.View style={[styles.flipCard, this.setAnimatedStyle(true)]}>
            <Card containerStyle={{flex: 1, margin: 0}}>
              <FormLabel>
                This text is flipping on the front.
              </FormLabel>
            </Card>
          </Animated.View>
          <Animated.View style={[styles.flipCard, styles.flipCardBack, this.setAnimatedStyle(false)]}>
            <Card containerStyle={{flex: 1, margin: 0}}>
              <FormLabel>
                This text is flipping on the back.
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
          <Icon
            raised
            containerStyle={{margin: 30, backgroundColor: purple}}
            name='step-forward'
            type='font-awesome'
            underlayColor={purple}
            color={white}
            onPress={() => alert('próximo')}
          />
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
