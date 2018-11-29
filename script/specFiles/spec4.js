'use strict'

const chai = require('chai')
const expect = chai.expect
const chaiThings = require('chai-things')

describe('evenOrOdd', function() {
  it('receives one integer and returns the string "even" or "odd"', function() {
    expect(evenOrOdd(1)).equal('odd')
    expect(evenOrOdd(6)).equal('even')
  })
})
