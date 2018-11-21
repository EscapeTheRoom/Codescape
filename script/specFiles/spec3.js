'use strict';

const chai = require('chai');
const expect = chai.expect;
const chaiThings = require('chai-things');

describe('shout(string)', function() {
    it('receives one argument and returns it in all caps', function() {
        
      expect(shout('hello')).equal('HELLO')
    })
})

/* 
function shout(string) {
    return string.toUpperCase()
}
*/