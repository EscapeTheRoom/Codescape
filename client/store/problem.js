import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_PROBLEM = 'GET_PROBLEM'
const SEND_INPUT = 'SEND_INPUT'

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

const sendToDocker = (input) =>({
    type: SEND_INPUT,
    input
})


/**
 * THUNK CREATORS
 */

export const fetchAProblem = (problemId) => async dispatch => {
    const { data } = await axios.get(`/api/problems/${problemId}`);
    dispatch(getProblem(data));
}

export const sendInput = (input) => async dispatch => {
    try{
    const { data } =await axios.post(`/api/docker`, input) //this will be our test result
} catch(err){
        console.error(err)
    }
}

const problemsReducer = (state = defaultProblem, action) => {
    switch (action.type) {
        case GET_PROBLEM:
            return action.problem
        case SEND_INPUT:
            return action.input
        default:
            return state;
    }
};

export default problemsReducer;