import React, { Component } from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import { connect } from 'react-redux'
import sortBy from 'sort-by'
import { white, gray, purple } from '../utils/colors'
import { fetchLogs } from '../actions'
import { Card, ButtonGroup } from 'react-native-elements'
import { formatPercent } from '../utils/helpers'
import {
  LOG_EMPTY,
  LOG_ORDER_BY_LABEL,
  LOG_ORDER_BY_DATE,
  LOG_ORDER_BY_DECK
} from '../utils/constants'


class History extends Component {
  state= { sortOrder: 0 }

  renderItem = ({ item }) => {
    return (
      <Card containerStyle={{margin: 0}} >
        <Text>{item.date}</Text>
        <Text>{item.deck}</Text>
        <Text>{formatPercent(item.rate)}</Text>
      </Card>
    )
  }

// TODO: Melhorar estilo
  renderEmptyComponent = () => {
    return (
      <Card containerStyle={styles.empty}>
        <Text>{LOG_EMPTY}</Text>
      </Card>
    )
  }

  componentDidMount(){
    // Comente abaixo para simular lista vazia
    this.props.fetchLogs()
  }

  render() {
    const { logs, logsAreLoading } = this.props
    const { sortOrder } = this.state

    if (logsAreLoading) {
      return <Icon containerStyle={styles.container} name='spinner' type='font-awesome' />
    }

    const sortLogs = Object.values(logs)
    .sort(sortOrder ?  sortBy('deck', '-date') : sortBy('-date', 'deck'))
//    const sortLogs = []

    return (
      <View style={styles.container}>
        <View style={{flexDirection: 'row', alignItems: 'center', padding: 20}}>
          <Text>{LOG_ORDER_BY_LABEL}: </Text>
          <ButtonGroup
            onPress={ sortOrder => this.setState({sortOrder})}
            selectedIndex={sortOrder}
            buttons={[LOG_ORDER_BY_DATE, LOG_ORDER_BY_DECK]}
            selectedButtonStyle={{backgroundColor: purple}}
            selectedTextStyle={{color: white}}
            containerStyle={{flex: 1, height: 40}}
          />
        </View>
        <FlatList
          data={sortLogs}
          contentContainerStyle={[{ flexGrow: 1 } , sortLogs.length ? null : { justifyContent: 'center'} ]}
          renderItem={ this.renderItem }
          ListEmptyComponent={ this.renderEmptyComponent }
          keyExtractor={(item, index) => item.date}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    alignItems: 'stretch',
    justifyContent: 'flex-start'
  },
  empty: { // TODO: Melhorar layout
    margin: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

const mapStateToProps = ({ logs, logsAreLoading }) => ({ logs, logsAreLoading })
const mapDispatchToProps = dispatch => (
  {
    fetchLogs: () => dispatch(fetchLogs())
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(History)
