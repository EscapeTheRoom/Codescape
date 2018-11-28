
import {expect} from 'chai'
import {guestGameWon, guestIsSolved, getItemSolved, resetState} from './guest'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creator', () => {
    let store
    let mockAxios

    const initialState = {
            isWon: false,
            isSolved: {
              1: 'false',
              2: 'false',
              3: 'false'
            },
            items: {
              1: 'true',
              2: 'false',
              3: 'false',
              4: 'false'
            }
    }

    beforeEach(() => {
        mockAxios = new MockAdapter(axios)
        store = mockStore(initialState)
    })

    afterEach(() => {
        mockAxios.restore()
        store.clearActions()
      })
    
    describe('guestGameWon', () => {
    it('eventually dispatches the GAME_WON action', async () => {
        await store.dispatch(guestGameWon())
        const actions = store.getActions()
        expect(actions[0].type).to.be.equal('GAME_WON')
    })
    })

    describe('guestIsSolved', () => {
        it('eventually dispatches the SOVLED action', async () => {
            const problemId = 1
            await store.dispatch(guestIsSolved(problemId))
            const actions = store.getActions()
            expect(actions[0].type).to.be.equal('SOLVED')
        })
    })

    describe('getItemSolved', () => {
        it('eventually dispatches the GET_ITEM action', async () => {
            const problemId = 1
            await store.dispatch(getItemSolved(problemId))
            const actions = store.getActions()
            expect(actions[0].type).to.be.equal('GET_ITEM')
            expect(actions[0].problemId).to.be.equal(problemId)
        })
    })

    describe('resetState', () => {
        it('eventually dispatches the RESET action', async () => {
            await store.dispatch(resetState())
            const actions = store.getActions()
            expect(actions[0].type).to.be.equal('RESET')
        })
    })
})