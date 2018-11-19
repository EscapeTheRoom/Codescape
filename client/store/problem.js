import axios from 'axios'
import { bindActionCreators } from 'redux';

/**
 * ACTION TYPES
 */
const GET_PROBLEM = 'GET_PROBLEM'
const RECEIVE_INPUT = 'RECEIVE_INPUT'
const GAME_WON = "GAME_WON"
/**
 * INITIAL STATE
 */
const defaultProblem = {
  isWon: false,
  problem: {},
  spec: '',
  isSolved: [false]
}

/**
 * ACTION CREATORS
 */
const getProblem = problem => ({
  type: GET_PROBLEM,
  problem
})

const receiveInput = spec => ({
  type: RECEIVE_INPUT,
  spec
})

const gameIsWon = () => ({
  type: GAME_WON
})
/**
 * THUNK CREATORS
 */

export const fetchAProblem = problemId => async dispatch => {
  const {data} = await axios.get(`/api/problems/${problemId}`)
  dispatch(getProblem(data))
}

export const sendInput = input => async dispatch => {
  try {
    const {data} = await axios.post(`/api/docker`, input) //this will be our test result
    console.log('dataThunk', data)
    dispatch(receiveInput(data))
    dispatch(gameIsWon())
  } catch (err) {
    console.error(err)
  }
}
export const gameWon = () => dispatch => {
  dispatch(gameIsWon())
}

const problemsReducer = (state = defaultProblem, action) => {
  switch (action.type) {
    case GET_PROBLEM:
      return {...state, problem: action.problem}
    case RECEIVE_INPUT:
      let copyState = {...state}
      if(!action.spec.includes('failing')){
        copyState.isSolved[state.problem.id-1] = true
      }
      return {...copyState, spec: action.spec }
    case GAME_WON: 
      for(let i = 0; i< state.isSolved.length; i++ ){
        if(state.isSolved[i] === false){
          return {...state}
        }
        return {...state, isWon: !state.isWon}
      }
    default:
      return state
  }
}

export default problemsReducer
