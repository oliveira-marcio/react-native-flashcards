import React, { Component } from 'react'
import { StyleSheet, View, FlatList, Image } from 'react-native'
import { connect } from 'react-redux'
import sortBy from 'sort-by'
import {
  white,
  primaryColor,
  lightPrimaryColor,
  primaryText
} from '../utils/colors'
import { fetchLogs } from '../actions'
import { Card, ButtonGroup, Icon, Text } from 'react-native-elements'
import { formatDate, formatPercent } from '../utils/helpers'
import {
  LOG_EMPTY,
  LOG_ORDER_BY_LABEL,
  LOG_ORDER_BY_DATE,
  LOG_ORDER_BY_DECK
} from '../utils/constants'
import EmptyCard from './EmptyCard'


class History extends Component {
  state= { sortOrder: 0 }

  renderItem = ({ item }) => {
    return (
      <Card containerStyle={styles.card} flexDirection='row'>
        <Image
          resizeMode='stretch'
          style={styles.image}
          source={require('../assets/calendario.png')}
        />
        <View style={styles.dataContainer}>
          <Text style={styles.deck}>
            {item.deck}
          </Text>
          <Text style={styles.date}>
            {formatDate(item.date)}
          </Text>
        </View>
        <Text style={styles.rate}>
          {formatPercent(item.rate)}
        </Text>
      </Card>
    )
  }

  renderEmptyComponent = () => {
    return (
      <EmptyCard text={LOG_EMPTY} />
    )
  }

  componentDidMount(){
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

    return (
      <View style={styles.container}>
        <View style={{flexDirection: 'row', alignItems: 'center', padding: 20}}>
          <Text style={{fontWeight: 'bold', fontSize: 18}}>
            {LOG_ORDER_BY_LABEL}:
          </Text>
          <ButtonGroup
            onPress={ sortOrder => this.setState({sortOrder})}
            selectedIndex={sortOrder}
            buttons={[LOG_ORDER_BY_DATE, LOG_ORDER_BY_DECK]}
            selectedButtonStyle={{backgroundColor: primaryColor}}
            selectedTextStyle={{color: white}}
            containerStyle={{flex: 1, height: 40}}
          />
        </View>
        <FlatList
          data={sortLogs}
          contentContainerStyle={[{ flexGrow: 1 },
            sortLogs.length ? null : { justifyContent: 'center'} ]}
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
    backgroundColor: lightPrimaryColor
  },
  card: {
    margin: 8,
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 20
  },
  dataContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  },
  deck: {
    fontSize: 20,
    color: primaryText,
    fontWeight: 'bold'
  },
  date: {
    fontSize: 14,
    color: primaryText
  },
  rate: {
    fontSize: 32,
    fontWeight: 'bold',
     marginLeft: 20
   }
})

const mapStateToProps = ({ logs, logsAreLoading }) => ({ logs, logsAreLoading })
const mapDispatchToProps = dispatch => (
  {
    fetchLogs: () => dispatch(fetchLogs())
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(History)
