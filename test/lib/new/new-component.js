import {expect, assert} from 'chai';
import * as sinon from 'sinon';
import {getComponentTemplate, getComponentHTMLTemplate, getComponentTestTemplate, createNewComponent} from './../../../src/lib/new/new-component';
import {prompt} from './../../mockups/prompt-mockup';

describe('new-class tests', function() {
    let sandbox;

    beforeEach(function() {
        sandbox = sinon.sandbox.create();
    });

    afterEach(function() {
        sandbox.restore()
    });

    it('createNewComponent test', function() {
        // Arrange
        const saveStub = sandbox.stub();
        const promptGetSpy = sandbox.spy(prompt, "get");

        // Act
        createNewComponent(prompt, saveStub);

        // Assert
        assert(saveStub.callCount == 3, 'save should have been called twice');
        assert(promptGetSpy.calledOnce, 'get on prompt should have been called once');
    });
});