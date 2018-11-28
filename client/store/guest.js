import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */

const GAME_WON = 'GAME_WON'
const SOLVED = 'SOLVED'
const GET_ITEM = 'GET_ITEM'
const RESET = 'RESET'

/**
 * INITIAL STATE
 */
const defaultGuest = {
  isWon: false,
  isSolved: {
    1: 'false',
    2: 'false',
    3: 'false'
  },
  items: {
    1: 'true',
    2: 'false',
    3: 'false',
    4: 'false'
  }
}

/**
 * ACTION CREATORS
 */

const gameIsWonGuest = () => ({type: GAME_WON})
const problemSolvedGuest = problemId => ({type: SOLVED, problemId})
const getItemTruthy = problemId => ({type: GET_ITEM, problemId})
const resetGame = () => ({type: RESET})

/**
 * THUNK CREATORS
 */

export const guestGameWon = () => dispatch => {
  dispatch(gameIsWonGuest())
}
export const guestIsSolved = problemId => dispatch => {
  dispatch(problemSolvedGuest(problemId))
}

export const getItemSolved = problemId => dispatch => {
  dispatch(getItemTruthy(problemId))
}
export const resetState = () => dispatch => {
  dispatch(resetGame())
}

/**
 * REDUCER
 */
export default function(state = defaultGuest, action) {
  switch (action.type) {
    case GAME_WON:
      for (let key in state.isSolved) {
        if (state.isSolved[key] === 'false') {
          return {...state}
        }
        return {...state, isWon: true}
      }
    case SOLVED:
      let newState = {...state}
      const newIsSolved = {...newState.isSolved}
      newIsSolved[action.problemId] = 'true'
      const newItemIsUnlocked = {...newState.items}
      if (+action.problemId < 4) {
        newItemIsUnlocked[+action.problemId + 1] = 'true'
        return {...newState, isSolved: newIsSolved, items: newItemIsUnlocked}
      } else {
        return {...newState, isSolved: newIsSolved}
      }
    case GET_ITEM:
      let newerState = {...state}
      const newItemIsSolved = {...newerState.items}
      newItemIsSolved[action.problemId] = 'true'
      return {...newerState, items: newItemIsSolved}
    case RESET:
      return defaultGuest
    default:
      return state
  }
}
