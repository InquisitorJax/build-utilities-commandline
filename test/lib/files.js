import {expect, assert} from 'chai';
import * as sinon from 'sinon';
import {getFiles, saveFile  } from './../../src/lib/files';

const fs = require('fs');
const proxyquire =  require('proxyquire');

describe('get-files tests', function() {
    let sandbox;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
    });

    afterEach(function () {
        sandbox.restore()
    });

    it('getFiles', function() {
        // Arrange
        const globMock = sinon.stub().yields();
        proxyquire('./../../src/lib/files', {
            'glob': globMock
        });

        // Act
        getFiles("/test/**/*.js").then(files => {
            // Assert
            expect(files).to.not.be.null;
        });
    });

    it('save tests', function() {
        // Arrange
        const mkdirpStub = sinon.stub().yields();
        const fsStub = sinon.stub().yields();

        proxyquire('./../../src/lib/files', {
            'mkdirp': mkdirpStub,
            'fs': fsStub
        });

        // Act
        saveFile("file1", "hello world");
        const fileSaved = fs.existsSync('file1');
        expect(fileSaved).to.be.true;
        fs.unlinkSync('file1');
    })
});