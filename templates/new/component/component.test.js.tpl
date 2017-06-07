import {expect, assert} from 'chai';
import 'aurelia-polyfills';
import {ElementMockup} from './../../mockups/element-mockup';
import {__classname__} from './../../../src/components/__control-tag__/__control-tag__';

describe('__classname__ Tests', function() {
    let instance;
    let element;

    beforeEach(function() {
        element = new ElementMockup();
        instance = new __classname__(element);
    });

    it('constructor', function() {
        expect(instance).to.not.be.null;
    });

    it('not constructor', function() {
        expect(() => __classname__()).to.throw("Cannot call a class as a function");
    });
});