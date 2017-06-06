import {expect} from 'chai';
import {createFileName} from './../../../src/lib/new/new-helpers'

describe('new-helpers tests', function() {
    let sandbox;

    it('createFileName test 1', function() {
        // Arrange

        // Act
        const result = createFileName('someName');

        // Assert
        expect(result).to.equal('some-name');
    });

    it('createFileName test 2', function() {
        // Arrange

        // Act
        const result = createFileName('SomeName');

        // Assert
        expect(result).to.equal('some-name');
    });

    it('createFileName test 3', function() {
        // Arrange

        // Act
        const result = createFileName('some-name');

        // Assert
        expect(result).to.equal('some-name');
    });
});