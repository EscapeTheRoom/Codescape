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
  isWon2: false,
  isSolved2: {
    4: 'false',
    5: 'false',
    6: 'false'
    //add keys if there were more problems
    //keys correspond to problem ID
  },
  items2: {
    4: 'true',
    5: 'false',
    6: 'false',
    7: 'false'
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

export const guestGameWon2 = () => dispatch => {
  dispatch(gameIsWonGuest())
}
export const guestIsSolved2 = problemId => dispatch => {
  dispatch(problemSolvedGuest(problemId))
}

export const getItemSolved2 = problemId => dispatch => {
  dispatch(getItemTruthy(problemId))
}
export const resetState2 = () => dispatch => {
  dispatch(resetGame())
}
// export const guestUpdateIsSolved = isSolvedObj => async dispatch => {
//   try {
//     // const updatedUser = await axios.put('/auth/update', {id: data.id, isSolved: isSolvedObj})
//     // console.log("USER DATA", data, "user id", data.id)
//     // console.log("isSolvedObj", isSolvedObj)
//     // console.log("isSolved Json stringify", JSON.stringify(isSolvedObj))
//   } catch (err) {
//     console.error(err)
//   }
// }
/**
 * REDUCER
 */
export default function(state = defaultGuest, action) {
  switch (action.type) {
    case GAME_WON:
      for (let key in state.isSolved2) {
        if (state.isSolved2[key] === 'false') {
          return {...state}
        }
        return {...state, isWon2: true}
      }
    case SOLVED:
      let newState = {...state}
      const newIsSolved = {...newState.isSolved2}
      newIsSolved[action.problemId] = 'true'
      const newItemIsUnlocked = {...newState.items2}
      if (+action.problemId < 7) {
        newItemIsUnlocked[+action.problemId + 1] = 'true'
        return {...newState, isSolved2: newIsSolved, items2: newItemIsUnlocked}
      } else {
        return {...newState, isSolved2: newIsSolved}
      }
    case GET_ITEM:
      let newerState = {...state}
      const newItemIsSolved = {...newerState.items2}
      newItemIsSolved[action.problemId] = 'true'
      return {...newerState, items2: newItemIsSolved}
    case RESET:
      return defaultGuest
    default:
      return state
  }
}
