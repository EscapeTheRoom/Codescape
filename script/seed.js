'use strict'
const fs = require('fs')
const db = require('../server/db')
const {User, Problem} = require('../server/db/models')
const spec1File = fs.readFileSync(__dirname + '/specFiles/spec1.js')
const spec2File = fs.readFileSync(__dirname + '/specFiles/spec2.js')
const spec3File = fs.readFileSync(__dirname + '/specFiles/spec3.js')
const spec4File = fs.readFileSync(__dirname + '/specFiles/spec4.js')
const spec5File = fs.readFileSync(__dirname + '/specFiles/spec5.js')
const spec6File = fs.readFileSync(__dirname + '/specFiles/spec6.js')
const spec7File = fs.readFileSync(__dirname + '/specFiles/spec7.js')
const spec8File = fs.readFileSync(__dirname + '/specFiles/spec8.js')
const spec9File = fs.readFileSync(__dirname + '/specFiles/spec9.js')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])
  
  const problems = await Promise.all([
    Problem.create({
      title: 'Hello World',
      prompt:
        'Write a function that returns a greeting given a name as input: \n Example: Hello Anna! \n Example: Hello Jeewon!',
      functionSetup: 'function greet(name) {\n// YOUR CODE HERE\n}',
      spec: spec1File
    }),
    Problem.create({
      title: 'Reverse String',
      prompt:
        'Write a function that takes a string as input and returns the string reversed.',
      functionSetup: 'function reverseStr(str) {\n// YOUR CODE HERE\n}',
      spec: spec2File
    }),
    Problem.create({
      title: 'All Caps',
      prompt:
        'Write a function that takes a string as input and returns the string it in all caps.',
      functionSetup: 'function shout(string) {\n// YOUR CODE HERE\n}',
      spec: spec3File
    }),
    Problem.create({
      title: 'Even or Odd',
      prompt:
        'Create a function that takes an integer as an argument and returns “even” for even numbers or “odd” for odd numbers.',
      functionSetup: 'function evenOrOdd(integer) {\n// YOUR CODE HERE\n}',
      spec: spec4File
    }),
    Problem.create({
      title: 'Get Initials',
      prompt:
        'Write a function that takes a string and returns the initials in uppercase.',
      functionSetup: 'function getInitials(str) {\n// YOUR CODE HERE\n}',
      spec: spec5File
    }),
    Problem.create({
      title: 'Get Count',
      prompt:
        'Return the number (count) of vowels (a, e, i, o, u) in the given string. The input string will only consist of lowercase letters and spaces.',
      functionSetup: 'function getCount(string) {\n// YOUR CODE HERE\n}',
      spec: spec6File
    }),
    Problem.create({
      title: 'Biller Builder',
      prompt:
        'Write a function billerBuilder that takes the name of a state as a parameter. billerBuilder should return a new function that takes the price of an item and returns the correct final price of the item, given the following: if the state is NY, charge 3% for shipping and 4% for sales tax and if the state is NJ, charge 5% for shipping and 6.625% for sales tax',
      functionSetup: 'function billerBuilder(state) {\n// YOUR CODE HERE\n}',
      spec: spec7File
    }),
    Problem.create({
      title: 'Array Sum',
      prompt:
        'Write a function, arraySum, that accepts an array of numbers and returns the sum of all the numbers in the array (no matter how nested!).',
      functionSetup: 'function arraySum(arr) {\n// YOUR CODE HERE\n}',
      spec: spec8File
    }),
    Problem.create({
      title: 'Finder Function',
      prompt:
        'Define a function finderFunction that takes an array and a callback. Pass each element from the array into the callback. If the callback returns true, return the index of the current element. If the callback never returns true, return -1.',
      functionSetup: 'function finderFunction(arr, callback) {\n// YOUR CODE HERE\n}',
      spec: spec9File
    })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${problems.length} problems`)
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
