import React, { Component } from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { white } from '../utils/colors'
import { fetchLogs } from '../actions'
import { Card } from 'react-native-elements'


class History extends Component {
  renderItem = ({ item }) => {
    return (
      <Card containerStyle={{margin: 0}} >
        <Text>{item.date}</Text>
        <Text>{item.deck}</Text>
        <Text>{item.rate}</Text>
      </Card>
    )
  }

// TODO: Melhorar estilo
  renderEmptyComponent = () => {
    return (
      <Card containerStyle={styles.empty}>
        <Text>Não há dados</Text>
      </Card>
    )
  }

  componentDidMount(){
    // Comente abaixo para simular lista vazia
    this.props.fetchLogs()
  }

  render() {
    const { logs, logsAreLoading } = this.props

    if (logsAreLoading) {
      return <Icon containerStyle={styles.container} name='spinner' type='font-awesome' />
    }

    return (
      <View style={styles.container}>
        <FlatList
          data={ Object.values(logs) }
          contentContainerStyle={[{ flexGrow: 1 } , Object.values(logs).length ? null : { justifyContent: 'center'} ]}
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
