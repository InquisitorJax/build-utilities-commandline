import {expect, assert} from 'chai';
import {__classname__} from './../../../app/src/__classpath__/__classfilename__';

describe('__classname__ Tests', function() {
    let instance;

    beforeEach(function() {
        instance = new __classname__();
    });

    it('constructor', function() {
        // Assert
        expect(instance).to.not.be.null;
    });

    it('not constructor', function() {
        // Assert
        expect(() => __classname__()).to.throw("Cannot call a class as a function");
    });

    it('dispose', function() {
        // Act
        instance.dispose();

        // Assert
        // .. put your code here
    });
});