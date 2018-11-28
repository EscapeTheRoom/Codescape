const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Problem = db.model('problem')
const User = db.model('user')

describe('Problem Route:', () => {
  before(() => {
    return db.sync({force: true})
  })
  afterEach(() => {
    return Promise.all([
      Problem.truncate({cascade: true}),
      User.truncate({cascade: true})
    ])
  })

  describe('GET /problems', () => {
    const hello = 'hello world'
    beforeEach(() => {
      return Problem.create({
        title: hello,
        prompt:
          'Write a function that returns a greeting given a name as input: Hello Friday!',
        functionSetup: 'function greeting(name) {\n// YOUR CODE HERE\n}',
        spec: 'yes'
      })
    })
    it('GET /api/problems', async () => {
      const res = await request(app)
        .get('/api/problems')
        .expect('Content-Type', /json/)
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].title).to.be.equal(hello)
    })
    it('returns a problem if there is one in the database', async () => {
      await Problem.create({
        title: 'Friday Night',
        prompt:
          'Write a function that returns a greeting given a name as input: Hello Friday!',
        functionSetup: 'function greeting(name) {\n// YOUR CODE HERE\n}',
        spec: 'yes'
      })
      const res = await request(app)
        .get('/api/problems')
        .expect(200)

      expect(res.body).to.be.an.instanceOf(Array)
      expect(res.body[1].title).to.equal('Friday Night')
      expect(res.body[1].prompt).to.equal(
        'Write a function that returns a greeting given a name as input: Hello Friday!'
      )
      expect(res.body[1].functionSetup).to.equal(
        'function greeting(name) {\n// YOUR CODE HERE\n}'
      )
    })
    describe('GET /api/products/:id', () => {
      let newProblem

      beforeEach(async () => {
        const moreProblems = [
          {
            title: 'Friday Night',
            prompt:
              'Write a function that returns a greeting given a name as input: Hello Friday!',
            functionSetup: 'function greeting(name) {\n// YOUR CODE HERE\n}',
            spec: 'yes'
          },
          {
            title: 'Reversing String',
            prompt:
              'Write a function that takes a string as input and returns the string reversed.',
            functionSetup:
              'function reverseString(string){\n// YOUR CODE HERE\n}',
            spec: 'yesyes'
          }
        ].map(data => Problem.create(data))

        const problemCreated = await Promise.all(moreProblems)
        newProblem = problemCreated[0]
      })
      it('returns the JSON of the problem based on the id', async () => {
        const res = await request(app)
          .get('/api/problems/' + newProblem.id)
          .expect(200)

        if (typeof res.body === 'string') {
          res.body = JSON.parse(res.body)
        }
        expect(res.body.title).to.equal('Friday Night')
      })
      it('returns a 404 error if the ID does not exist', () => {
        return request(app)
          .get('/api/problems/324')
          .expect(404)
      })
    })
  })
})
