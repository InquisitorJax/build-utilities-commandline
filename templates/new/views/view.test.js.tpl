import {expect, assert} from 'chai';
import * as sinon from 'sinon';
import 'aurelia-polyfills';
import {__classname__} from './../../../../app/src/views/__view-tag__/__view-tag__';

describe('__classname__ Tests', function() {
    let instance;
    let eventAggregator;

    beforeEach(function() {
        eventAggregator = new EventAggregatorMock();
        instance = new __classname__(eventAggregator);
    });

    it('constructor', function() {
        expect(instance).to.not.be.null;
    });

    it('not constructor', function() {
        expect(() => __classname__()).to.throw("Cannot call a class as a function");
    });

    it.skip('attached', function() {
    });

    it.skip('detached', function() {
    });
});