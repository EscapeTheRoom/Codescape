import axios from 'axios'
import {bindActionCreators} from 'redux'

/**
 * ACTION TYPES
 */
const GET_PROBLEM = 'GET_PROBLEM'
const RECEIVE_INPUT = 'RECEIVE_INPUT'
const CLEAR_SPEC = 'CLEAR_SPEC'

/**
 * INITIAL STATE
 */
const defaultProblem = {
  problem: {},
  spec: ''
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

const clearSpecs = spec => ({
  type: CLEAR_SPEC,
  spec: spec
})

/**
 * THUNK CREATORS
 */

export const fetchAProblem = problemId => async dispatch => {
  const {data} = await axios.get(`/api/problems/${problemId}`)
  console.log('ProblemData', data)
  dispatch(getProblem(data))
}

export const sendInput = input => async dispatch => {
  try {
    console.log('INPUT', input)
    const {data} = await axios.post(`/api/docker`, input) //this will be our test result
    console.log('dataThunk', data)
    dispatch(receiveInput(data))
  } catch (err) {
    console.error(err)
  }
}

export const clearSpec = () => dispatch => {
  try {
    dispatch(clearSpecs(''))
  } catch (err) {
    console.error(err)
  }
}

const problemsReducer = (state = defaultProblem, action) => {
  switch (action.type) {
    case GET_PROBLEM:
      return {...state, problem: action.problem}
    case RECEIVE_INPUT:
      return {...state, spec: action.spec}
    case CLEAR_SPEC:
      return {...state, spec: action.spec}
    default:
      return state
  }
}

export default problemsReducer
