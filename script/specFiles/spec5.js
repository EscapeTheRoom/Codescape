'use strict';

const chai = require('chai');
const expect = chai.expect;
const chaiThings = require('chai-things');

describe('capitalsFirst', function() {
    it('receives a string and returns the string', function() {
      expect(capitalsFirst('hello World')).to.be.a('string');
    })
    it('places all capital letters in the front of the string ', function() {
        expect(capitalsFirst('hey World')).to.equal('World hey');
        expect(capitalsFirst('I love Cats')).to.equal('I Cats love');
      }) 
})

/*
function capitalsFirst(str){
    var a = [], b = [], 
        words = str.split(' ');
    
    words.map(function(w) {
        if(w.match(/^[A-Z]/)) {
            a.push(w);
        } else if (w.match(/^[a-z]/)) {
            b.push(w);
        }
    });
    
    return a.concat(b).join(' ');
}
*/