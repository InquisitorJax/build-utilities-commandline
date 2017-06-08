import {ElementMockup} from './element-mockup';

class DocumentMockup extends ElementMockup {
    createElement(type) {
        const element = new ElementMockup();
        element.nodeType = type;
        this.body = new ElementMockup();
        return element;
    }

    createDocumentFragment() {
        return new ElementMockup();
    }
}

global.document = new DocumentMockup();