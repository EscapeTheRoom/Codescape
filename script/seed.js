'use strict'
const fs = require('fs')
const db = require('../server/db')
const {User, Problem} = require('../server/db/models')
const spec1File = fs.readFileSync(__dirname + '/specFiles/spec1.js')
const spec2File = fs.readFileSync(__dirname + '/specFiles/spec2.js')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])
  const problems = await Promise.all([
    Problem.create({
      title: 'Get Initials',
      prompt:
        'Write a function that takes a string and returns the initials in uppercase.',
      functionSetup:
        'const utils = {} \nfunction utils.getInitials() {\n// YOUR CODE HERE\n}',
      spec: spec1File
    }),
    Problem.create({
      title: 'Reverse String',
      prompt:
        'Write a function that takes a string as input and returns the string reversed.',
      functionSetup: 
        'function reverseStr(str) { \n // YOUR CODE HERE \n}',
      spec: spec2File
    })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
