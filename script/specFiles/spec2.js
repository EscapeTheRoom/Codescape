'use strict';

const chai = require('chai');
const expect = chai.expect;
const chaiThings = require('chai-things');

describe('reverseStr', function() {
    it('takes a string and reverses it', function() {
      expect('hello').to.equal('olleh');
    });

    it('takes a string and reverses it', function() {
      expect('codescape').to.equal('epacsedoc')
    });
})