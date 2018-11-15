import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_PROBLEM = 'GET_PROBLEM'

/**
 * INITIAL STATE
 */
const defaultProblem= {}

/**
 * ACTION CREATORS
 */
const getProblem = (problem) => ({type: GET_PROBLEM, problem})


/**
 * THUNK CREATORS
 */

export const fetchProblem = () => async dispatch => {
    const { data } = await axios.get('/api/problem');
    dispatch(getProblem(data));
}


const problem = (state = defaultProblem, action) => {
    switch (action.type) {
        case GET_PROBLEM:
            return action.problem;
        default:
            return state;
    }
};

export default problem