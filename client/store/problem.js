import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_PROBLEM = 'GET_PROBLEM'

/**
 * INITIAL STATE
 */
const defaultProblem = {}

/**
 * ACTION CREATORS
 */
const getProblem = (problem) => ({
    type: GET_PROBLEM,
    problem
})


/**
 * THUNK CREATORS
 */

export const fetchAProblem = (problemId) => async dispatch => {
    const { data } = await axios.get(`/api/problems/${problemId}`);
    dispatch(getProblem(data));
}

export const sendInput = (input, problemId) => async dispatch => {
    await axios.post('/api/docker', input, problemId)
}

const problemsReducer = (state = defaultProblem, action) => {
    switch (action.type) {
        case GET_PROBLEM:
            return action.problem
        default:
            return state;
    }
};

export default problemsReducer;