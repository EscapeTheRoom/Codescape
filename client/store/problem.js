import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_PROBLEM = 'GET_PROBLEM'
const RECEIVE_INPUT = 'RECEIVE_INPUT'
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
    default:
      return state
  }
}

export default problemsReducer
