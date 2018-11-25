import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */

const GAME_WON = 'GAME_WON'
const SOLVED = 'SOLVED'
const GET_ITEM = 'GET_ITEM'

/**
 * INITIAL STATE
 */
const defaultGuest = {
  isWon: false,
  isSolved: {
    1: 'false',
    2: 'false',
    3: 'false'
    //add keys if there were more problems
    //keys correspond to problem ID
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
        newItemIsUnlocked[+action.problemId+1] = 'true'
        return {...newState, isSolved: newIsSolved, items: newItemIsUnlocked}
      } else {
        return {...newState, isSolved: newIsSolved}
      }
    case GET_ITEM:
      let newerState = {...state}
      const newItemIsSolved = {...newerState.items}
      newItemIsSolved[action.problemId] = 'true'
      return {...newerState, items: newItemIsSolved}
    default:
      return state
  }
}
