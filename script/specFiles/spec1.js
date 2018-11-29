'use strict'

const chai = require('chai')
const expect = chai.expect
const chaiThings = require('chai-things')

describe('greet', () => {
  it('takes a string and returns a string', () => {
    const greeting = greet('Corey')
    expect(greeting).to.be.a('string')
  })

  it('returns the name with Hello beforehand', () => {
    const stacyGreet = greet('Stacy')
    expect(stacyGreet).to.equal('Hello Stacy!')
    const stanGreet = greet('Stan')
    expect(stanGreet).to.equal('Hello Stan!')
  })
})
