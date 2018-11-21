import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const GAME_WON = "GAME_WON"
const SOLVED = "SOLVED"
/**
 * INITIAL STATE
 */
const defaultUser = {
  user: {},
  isWon: false, 
  isSolved:{
    1: "false",
    2: "false",
    3: "false"
    //add keys if there were more problems
    //keys correspond to problem ID
  }
}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const gameIsWon = () => ({type: GAME_WON})
const problemSolved = problemId => ({ type: SOLVED, problemId})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}
export const gameWon = () => dispatch => {
  dispatch(gameIsWon())
}
export const isSolved = problemId => dispatch => {

  dispatch(problemSolved(problemId))
}
export const updateIsSolved = isSolvedObj => async dispatch => {
  try{
    const { data }= await axios.get('/auth/me')
    const updatedUser = await axios.put('/auth/update', {id: data.id, isSolved: isSolvedObj})
    console.log("updatedUser!!!",updatedUser)
    // console.log("USER DATA", data, "user id", data.id)
    // console.log("isSolvedObj", isSolvedObj)
    // console.log("isSolved Json stringify", JSON.stringify(isSolvedObj))

  }
  catch (err) {
    console.error(err)
  }
}
/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return {...state, user: action.user}
    case REMOVE_USER:
      return defaultUser
    case GAME_WON: 
      for(let key in state.isSolved ){
        if(state.isSolved[key] === "false"){
          return {...state}
        }
        return {...state, isWon: true}
      }
    case SOLVED:
      let newState = {...state}
      let newIsSolved = {...newState.isSolved}
      newIsSolved[action.problemId] = "true"
      return {...newState, isSolved:newIsSolved}
    default:
      return state
  }
}
