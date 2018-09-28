export const RECEIVE_ENTRIES = 'RECEIVE_ENTRIES'
export const ADD_DECK_ENTRY = 'ADD_DECK_ENTRY'

export function receiveEntries (entries) {
  return {
    type: RECEIVE_ENTRIES,
    entries,
  }
}

export function addDeckEntry (entry) {
  return {
    type: ADD_DECK_ENTRY,
    entry,
  }
}
