import { AsyncStorage } from 'react-native'
import { STORAGE_DECKS_KEY, STORAGE_LOG_KEY } from './constants'


export function getDecks() {
  return AsyncStorage.getItem(STORAGE_DECKS_KEY)
    .then(data => JSON.parse(data))
}

export function saveDeckTitle(key, entry) {
  return AsyncStorage.mergeItem(STORAGE_DECKS_KEY, JSON.stringify({
    [key]: entry
  }))
}

export function removeDeckTitle (key) {
  return AsyncStorage.getItem(STORAGE_DECKS_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      data[key] = undefined
      delete data[key]
      AsyncStorage.setItem(STORAGE_DECKS_KEY, JSON.stringify(data))
    })
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

*/
