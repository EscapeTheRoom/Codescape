import axios from 'axios'
import {bindActionCreators} from 'redux'

/**
 * ACTION TYPES
 */
const GET_PROBLEM = 'GET_PROBLEM'
const RECEIVE_INPUT = 'RECEIVE_INPUT'
const CLEAR_SPEC = 'CLEAR_SPEC'
const CODE_INPUT = 'CODE_INPUT'
const CLEAR_CODE = 'CLEAR_CODE'

/**
 * INITIAL STATE
 */
const defaultProblem = {
  problem: {},
  spec: '',
  code: ''
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

const clearCode = code => ({
  type: CLEAR_CODE,
  code
})

const setInput = code => ({
  type: CODE_INPUT,
  code
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

export const clearInput = () => dispatch => {
  try {
    dispatch(clearCode(''))
  } catch (err) {
    console.error(err)
  }
}

export const setCode = code => dispatch => {
  try {
    dispatch(setInput(code))
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
    case CLEAR_CODE:
      return {...state, code: action.code}
    case CODE_INPUT:
      return {...state, code: action.code}
    default:
      return state
  }
}

export default problemsReducer
