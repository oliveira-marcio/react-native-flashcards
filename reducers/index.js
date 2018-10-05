import { combineReducers } from 'redux'
import {
  RECEIVE_DECKS_ENTRIES,
  RECEIVE_LOGS_ENTRIES,
  SELECT_DECK_ENTRY,
  ADD_DECK_ENTRY,
  ADD_CARD_ENTRY,
  ADD_LOG_ENTRY,
  REMOVE_DECK_ENTRY,
  REMOVE_LOG_ENTRY,
  DECKS_ARE_LOADING,
  LOGS_ARE_LOADING
} from '../actions'

function decks (state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS_ENTRIES :
      return {
        ...state,
        ...action.entries,
      }

    case ADD_DECK_ENTRY :
      return {
        ...state,
        ...action.entry
      }

    case REMOVE_DECK_ENTRY :
      const updatedState = {...state}
      updatedState[action.key] = undefined
      delete updatedState[action.key]
      return updatedState

    case ADD_CARD_ENTRY :
      return {
        ...state,
        [action.key]: {
          ...state[action.key],
          questions: [...state[action.key].questions, action.question]
        }
      }

    default :
      return state
  }
}

function selectedDeck (state = '', action) {
  switch (action.type) {
    case SELECT_DECK_ENTRY :
      return action.key
    default :
      return state
  }
}

function decksAreLoading (state = false, action) {
  switch (action.type) {
    case DECKS_ARE_LOADING :
      return action.isLoading
    default :
      return state
  }
}

function logs (state = {}, action) {
  switch (action.type) {
    case RECEIVE_LOGS_ENTRIES :
      return {
        ...state,
        ...action.entries,
      }
    case ADD_LOG_ENTRY :
      return {
        ...state,
        ...action.entry
      }
    default :
      return state
  }
}

function logsAreLoading (state = false, action) {
  switch (action.type) {
    case LOGS_ARE_LOADING :
      return action.isLoading
    default :
      return state
  }
}

export default combineReducers({
  decks,
  logs,
  selectedDeck,
  decksAreLoading,
  logsAreLoading
})
