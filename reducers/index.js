import { combineReducers } from 'redux'
import { RECEIVE_ENTRIES, ADD_DECK_ENTRY } from '../actions'
import { mockDecks, mockHistory } from '../utils/mockData'

function decks (state = mockDecks, action) {
  switch (action.type) {
    case RECEIVE_ENTRIES :
      return {
        ...state,
        ...action.entries,
      }
    case ADD_DECK_ENTRY :
      return {
        ...state,
        ...action.entry
      }
    default :
      return state
  }
}

function history (state = mockHistory, action) {
  switch (action.type) {
    case RECEIVE_ENTRIES :
      return {
        ...state,
        ...action.entries,
      }
    case ADD_DECK_ENTRY :
      return {
        ...state,
        ...action.entry
      }
    default :
      return state
  }
}

export default combineReducers({ decks, history })
