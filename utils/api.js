import { AsyncStorage } from 'react-native'

const STORAGE_DECKS_KEY = 'flashcads:decks'
const STORAGE_LOGS_KEY = 'flashcads:logs'

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

export function addCardToDeck(key, entry){
  return AsyncStorage.getItem(STORAGE_DECKS_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      data[key].questions.push(entry)
      AsyncStorage.setItem(STORAGE_DECKS_KEY, JSON.stringify(data))
    })
}

export function getLogs() {
  return AsyncStorage.getItem(STORAGE_LOGS_KEY)
    .then(data => JSON.parse(data))
}

export function saveLog(key, entry) {
  return AsyncStorage.mergeItem(STORAGE_LOGS_KEY, JSON.stringify({
    [key]: entry
  }))
}
