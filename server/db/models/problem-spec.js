/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Problem = db.model('problem')

describe('Problem model', () => {
  describe('Validations', () => {
    let newProblem
    beforeEach(() => {
      newProblem = Problem.build()
    })

    it('should require title', async () => {
      try {
        await newProblem.validate()
        throw new Error(
          'validation was successful but should have failed without `title`'
        )
      } catch (error) {
        expect(error.message).to.contain('title cannot be null')
      }
    })

    it('can handle a long `prompt`', () => {
      let problemPrompt =
        'According to the song, Katy Perry "maxed our credit cards". Write a function that takes an array of transactions like the one below, and return the total amount of what she spent last Friday night.'

      newProblem.title = 'Friday Night'
      newProblem.prompt = problemPrompt

      expect(newProblem).to.be.an('object')
      expect(newProblem.title).to.equal('Friday Night')
      expect(newProblem.prompt).to.equal(problemPrompt)
    })

    it('can handle a long `functionSetup`', () => {
      let problemFunctionSetup =
        '"Leet" or 1337 is a popular alternative alphabet used by internet "hackers".\nCreate a translator function that takes a string and outputs that string translated to leet.\nThe leet codex is below, along with an array of english letters and an array of the corresponding leet characters. Use the two arrays to create a leetCodex object to use in making the translations.'

      newProblem.title = 'Leet Translator'
      newProblem.functionSetup = problemFunctionSetup

      expect(newProblem).to.be.an('object')
      expect(newProblem.title).to.equal('Leet Translator')
      expect(newProblem.functionSetup).to.equal(problemFunctionSetup)
    })

    it('should require prompt', async () => {
      try {
        await newProblem.validate()
        throw new Error(
          'validation was successful but should have failed without `prompt`'
        )
      } catch (error) {
        expect(error.message).to.contain('prompt cannot be null')
      }
    })
  })
})
