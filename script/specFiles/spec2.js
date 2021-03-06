'use strict'

const chai = require('chai')
const expect = chai.expect
const chaiThings = require('chai-things')

describe('reverseStr', function() {
  it('is a function', () => {
    expect(typeof reverseStr).to.equal('function');
  })

  it('takes a string and reverses it', function() {
    const reverse = reverseStr('hello')
    expect(reverse).to.equal('olleh');
  });

  it('takes a string and reverses it', function() {
    const reverse = reverseStr('codescape')
    expect(reverse).to.equal('epacsedoc')
  });
})

/*
function reverseStr(str) {
	return str.split("").reverse().join("");
}
*/
