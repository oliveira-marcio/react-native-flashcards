import * as API from '../utils/api'

export const RECEIVE_DECKS_ENTRIES = 'RECEIVE_DECKS_ENTRIES'
export const RECEIVE_LOGS_ENTRIES = 'RECEIVE_LOGS_ENTRIES'
export const ADD_DECK_ENTRY = 'ADD_DECK_ENTRY'
export const ADD_LOG_ENTRY = 'ADD_DECK_ENTRY'
export const REMOVE_DECK_ENTRY = 'REMOVE_DECK_ENTRY'
export const REMOVE_LOG_ENTRY = 'REMOVE_LOG_ENTRY'
export const DECKS_ARE_LOADING = 'DECKS_ARE_LOADING'
export const LOGS_ARE_LOADING = 'LOGS_ARE_LOADING'


export function fetchDecks() {
  return (dispatch, getState) => {
    if(getState().decksAreLoading) return
    dispatch(decksAreLoading(true))

    return API.getDecks()
    .then(decks => {
      dispatch(receiveDecksEntries(decks))
      dispatch(decksAreLoading(false))
    })
    .catch(error => console.log(`Error fetching storage: ${error}.`))
  }
}

export function addDeck(key) {
  return (dispatch) => {
    const entry = { title: key, questions: [] }
    dispatch(addDeckEntry({ [key]: entry }))
    return API.saveDeckTitle(key, entry)
  }
}

export function decksAreLoading (isLoading) {
  return {
    type: DECKS_ARE_LOADING,
    isLoading
  }
}

export function logsAreLoading (isLoading) {
  return {
    type: LOGS_ARE_LOADING,
    isLoading
  }
}

export function receiveDecksEntries (entries) {
  return {
    type: RECEIVE_DECKS_ENTRIES,
    entries,
  }
}

export function receiveLogsEntries (entries) {
  return {
    type: RECEIVE_LOGS_ENTRIES,
    entries,
  }
}

export function addDeckEntry (entry) {
  return {
    type: ADD_DECK_ENTRY,
    entry,
  }
}

export function addLogEntry (entry) {
  return {
    type: ADD_LOG_ENTRY,
    entry,
  }
}

export function removeDeckEntry (key) {
  return {
    type: REMOVE_DECK_ENTRY,
    key,
  }
}

export function removeLogEntry (key) {
  return {
    type: REMOVE_LOG_ENTRY,
    key,
  }
}
