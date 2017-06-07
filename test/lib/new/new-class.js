import {expect, assert} from 'chai';
import * as sinon from 'sinon';
import {createNewClass} from './../../../src/lib/new/new-class';
import {prompt} from './../../mockups/prompt-mockup';

global.pbucPath = process.cwd();

describe('new-class tests', function() {
    let sandbox;

    beforeEach(function() {
        sandbox = sinon.sandbox.create();
    });

    afterEach(function() {
        sandbox.restore()
    });

    it('createNewClass test', function() {
        // Arrange
        const saveStub = sandbox.stub();
        const promptGetSpy = sandbox.spy(prompt, "get");

        // Act
        createNewClass(prompt, saveStub);

        // Assert
        assert(saveStub.calledTwice, 'save should have been called twice');
        assert(promptGetSpy.calledOnce, 'get on prompt should have been called once');
    });
});