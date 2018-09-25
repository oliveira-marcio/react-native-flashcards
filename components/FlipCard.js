import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated
} from 'react-native'

export default class flipCard extends Component {
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
        <View>
          <Animated.View style={[styles.flipCard, this.setAnimatedStyle(true)]}>
            <Text style={styles.flipText}>
              This text is flipping on the front.
            </Text>
          </Animated.View>
          <Animated.View style={[styles.flipCard, styles.flipCardBack, this.setAnimatedStyle(false)]}>
            <Text style={styles.flipText}>
              This text is flipping on the back.
            </Text>
          </Animated.View>
        </View>
        <TouchableOpacity onPress={() => this.flipCard()}>
          <Text>Flip!</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  flipCard: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
    backfaceVisibility: 'hidden',
  },
  flipCardBack: {
    backgroundColor: "red",
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
