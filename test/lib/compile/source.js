import {expect, assert} from 'chai';
import * as sinon from 'sinon';
import {compileSource, compileDist} from './../../../src/lib/compile/source';

const proxyquire =  require('proxyquire');

describe('get-files tests', function() {
    let sandbox;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
    });

    afterEach(function () {
        sandbox.restore()
    });

    it('compileSource tests', function() {
        // Arrange
        const bableStub = sandbox.stub().yields();
        const files = sandbox.stub().yields();

        proxyquire('./../../../src/lib/compile/source', {
            'bable': bableStub,
            "files": files
        });

        // Act
        compileSource();
    });

    it('compileDist tests', function() {
        // Arrange
        const bableStub = sandbox.stub().yields();
        const files = sandbox.stub().yields();

        proxyquire('./../../../src/lib/compile/source', {
            'bable': bableStub,
            "files": files
        });

        // Act
        compileDist();
    })
});