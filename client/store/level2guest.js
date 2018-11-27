import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */

const GAME_WON2 = 'GAME_WON2'
const SOLVED2 = 'SOLVED2'
const GET_ITEM2 = 'GET_ITEM2'
const RESET2 = 'RESET2'

/**
 * INITIAL STATE
 */
const defaultGuest2 = {
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

const gameIsWonGuest2 = () => ({type: GAME_WON2})
const problemSolvedGuest2 = problemId => ({type: SOLVED2, problemId})
const getItemTruthy2 = problemId => ({type: GET_ITEM2, problemId})
const resetGame2 = () => ({type: RESET2})

/**
 * THUNK CREATORS
 */

export const guestGameWon2 = () => dispatch => {
  dispatch(gameIsWonGuest2())
}
export const guestIsSolved2 = problemId => dispatch => {
  dispatch(problemSolvedGuest2(problemId))
}

export const getItemSolved2 = problemId => dispatch => {
  dispatch(getItemTruthy2(problemId))
}
export const resetState2 = () => dispatch => {
  dispatch(resetGame2())
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
export default function(state = defaultGuest2, action) {
  switch (action.type) {
    case GAME_WON2:
      for (let key in state.isSolved2) {
        if (state.isSolved2[key] === 'false') {
          return {...state}
        }
        return {...state, isWon2: true}
      }
    case SOLVED2:
      let newState2 = {...state}
      const newIsSolved2 = {...newState2.isSolved2}
      newIsSolved2[action.problemId] = 'true'
      const newItemIsUnlocked2 = {...newState2.items2}
      if (+action.problemId < 7) {
        newItemIsUnlocked2[+action.problemId + 1] = 'true'
        return {...newState2, isSolved2: newIsSolved2, items2: newItemIsUnlocked2}
      } else {
        return {...newState2, isSolved2: newIsSolved2}
      }
    case GET_ITEM2:
      let newerState2 = {...state}
      const newItemIsSolved2 = {...newerState2.items2}
      newItemIsSolved2[action.problemId] = 'true'
      return {...newerState2, items2: newItemIsSolved2}
    case RESET2:
      return defaultGuest2
    default:
      return state
  }
}
