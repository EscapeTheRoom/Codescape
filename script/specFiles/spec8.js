'use strict'

const chai = require('chai');
const expect = chai.expect;
const chaiThings = require('chai-things');

describe('arraySum', function (){
    it('is a function', function() {
      expect(typeof arraySum).to.equal('function');
    });
    it('returns a number', () => {
      const returnedValue = arraySum([1, 2, 3]);
      expect(typeof returnedValue).to.equal('number');
    });
    it('returns the sum of all the numbers in a flat array', () => {
      const returnedValue = arraySum([1, 2, 3]);
      expect(returnedValue).to.equal(6);
    });
    it('returns the sum of all the numbers in a two-dimensional array', () => {
      const returnedValue = arraySum([[10], [10], [10]]);
      expect(returnedValue).to.equal(30);
    });
    it('returns the sum of all the numbers in a multi-dimensional array', () => {
      const returnedValue = arraySum([8, [6, [7, 5, 3], [0, 9]]]);
      expect(returnedValue).to.equal(38);
    });
  });
  

/*

function arraySum(arr) {
  let sum = 0;
  for(let i = 0; i < arr.length; i++) {
    let element = arr[i];
    if(Array.isArray(element)) {

      sum += arraySum(element);
    }
    else {
      sum += element;
    }
  }
  return sum;
}

  */