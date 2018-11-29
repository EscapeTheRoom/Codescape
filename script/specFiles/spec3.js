'use strict';

const chai = require('chai');
const expect = chai.expect;
const chaiThings = require('chai-things');

describe('shout', function() {
    it('is a function', () => {
        expect(typeof shout).to.equal('function');
      })

    it('receives one argument and returns in all caps', function() {
      expect(shout('hello')).to.equal('HELLO')
    })
})

/* 
function shout(string) {
    return string.toUpperCase()
}
*/