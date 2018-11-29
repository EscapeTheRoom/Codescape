'use strict';

const chai = require('chai');
const expect = chai.expect;
const chaiThings = require('chai-things');

describe('getCount', function() {
  it('is a function', () => {
    expect(typeof getCount).to.equal('function');
  })

  it('receives a string and returns an integer', function() {
    expect(getCount('hello')).to.be.a('number');
  })

  it('returns correct number of vowels in a string ', function() {
      expect(getCount('hey world')).to.equal(2);
      expect(getCount('i love cats')).to.equal(4);
    }) 
})

/*

function getCount(str) {
  var vowelsCount = 0;
  var vowels = ["a","e","i","o","u"];
  for (var i = 0;i < str.length;i++) {
    for (var j=0; j<vowels.length; j++) {
      if(string[i] === vowels[j]) {
        vowelsCount++;
      }
    }
  }
  
  return vowelsCount;
}

*/
