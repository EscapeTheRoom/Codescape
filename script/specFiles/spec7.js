'use strict';

const chai = require('chai');
const expect = chai.expect;
const chaiThings = require('chai-things');

describe('billerBuilder', () => {

    it('is a function', () => {
      expect(typeof billerBuilder).to.equal('function');
    });
  
    it('returns a function', () => {
      let returnedValue = billerBuilder('NY');
      expect(typeof returnedValue).to.equal('function');
    });
  
    it('returns a function that correctly calculates the final price in NY', () => {
      let returnedValue = billerBuilder('NY');
      let nyPrice = returnedValue(250);
  
      expect(nyPrice).to.equal(267.8);
    });
  
    it('returns a function that correctly calculates the final price in NJ', () => {
      let returnedValue = billerBuilder('NJ');
      let njPrice = returnedValue(250);
  
      expect(njPrice).to.equal(279.890625);
    });
  
});

/*

function billerBuilder2(state) {
  if (state === 'NY') {
    return function(price) {
      return price * 1.03 * 1.04;
    }
  }

  return function (price) {
    return price * 1.05 * 1.06625;
  }
}

*/