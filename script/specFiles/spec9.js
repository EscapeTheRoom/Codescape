'use strict'

const chai = require('chai');
const expect = chai.expect;
const chaiThings = require('chai-things');

describe('finderFunction', () => {

  it('is a function', () => {
    expect(typeof finderFunction).to.equal('function');
  });

  it('returns a number', () => {
    const returnedValue = finderFunction([1, 2, 3], function(){return true;});
    expect(typeof returnedValue).to.equal('number');
  });

  it('returns the index of the first element that causes the callback to return true', () => {
    function isApple(string) {
      return string === 'apple';
    }
    const fruits = ['not an apple', 'not an apple', 'apple', 'not an apple'];
    const returnedValue = finderFunction(fruits, isApple);
    expect(returnedValue).to.equal(2);
  });

  it('returns -1 if the callback never returns true', () => {
    function isGreaterThanZero(number) {
      return number > 0;
    }
    const negativeNums = [-10, -20, -30];

    const returnedValue = finderFunction(negativeNums, isGreaterThanZero);
    expect(returnedValue).to.equal(-1);
  });

});

/*

function finderFunction(array, callback) {
  for (let i = 0; i < array.length; i++) {
    let element = array[i];
    let foundIt = callback(element);

    if (foundIt) {
      return i;
    }
  }
  return -1;
}

*/