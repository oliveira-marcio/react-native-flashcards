import { AsyncStorage } from 'react-native'
import { STORAGE_DECKS_KEY, STORAGE_LOG_KEY } from './constants'


export function getDecks() {
  return AsyncStorage.getItem(STORAGE_DECKS_KEY)
    .then(data => JSON.parse(data))
}

export function saveDeckTitle({ entry, key }) {
  return AsyncStorage.mergeItem(STORAGE_DECKS_KEY, JSON.stringify({
    [key]: entry
  }))
}

/*
export function fetchCalendarResults () {
  return AsyncStorage.getItem(CALENDAR_STORAGE_KEY)
    .then(formatCalendarResults)
}

export function submitEntry ({ entry, key }) {
  return AsyncStorage.mergeItem(CALENDAR_STORAGE_KEY, JSON.stringify({
    [key]: entry
  }))
}

export function removeEntry (key) {
  return AsyncStorage.getItem(CALENDAR_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      data[key] = undefined
      delete data[key]
      AsyncStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(data))
    })
}
*/
