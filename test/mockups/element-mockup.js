import * as pal from 'aurelia-pal-nodejs';

pal.globalize();

class ElementClassListMock {
    classes;

    constructor() {
        this.classes = [];
    }

    add(style) {
        this.classes.push(style);
    }

    remove(style) {

    }
}

class Validity {
    get valid() {
        return this._valid;
    };

    set valid(value) {
        this._valid = value;
    }

    constructor() {
        this.valid = true;
    }
}

class Style {
    get display() {
        return this._display;
    }

    set display(value) {
        this._display = value
    }

    get width() {
        return this._width;
    }

    set width(value) {
        this._width = value;
    }
}


export class ElementMockup {
    id;
    attributes;
    children;
    classList;
    nodeType;
    nodeName;
    innerHTML;
    events;
    style;

    get childNodes() {
        return this.children;
    }

    constructor() {
        this.attributes = new Map();
        this.children = [];
        this.classList = new ElementClassListMock();
        this.events = new Map();
        this.validity = new Validity();
        this.style = new Style();
    }

    setAttribute(attribute, value) {
        this.attributes.set(attribute, value);
    }

    getAttribute(attribute) {
        return this.attributes.get(attribute);
    }

    removeAttribute(attribute) {
        this.attributes.delete(attribute);
    }

    appendChild(child) {
        this.children.push(child);
    }

    cloneNode(inDepth) {
        const element = new ElementMockup();
        element.nodeType = this.nodeType;
        element.children = this.children.slice(0);
        element.innerHTML = this.innerHTML;

        return element;
    }

    replaceChild(newElement, oldElement) {
        return newElement;
    }

    getElementById(id) {
        const child = this.children.find(function(item) {
           return item.id == id;
        });

        return child;
    }

    querySelector(selector) {
        return new ElementMockup();
    }

    addEventListener(event, action) {
        this.events.set(event, action);
    }

    removeEventListener(event, action) {
        if (this.events.has(event))
        {
            this.events.delete(event);
        }
    }

    dispatchEvent(event) {

    }
}

global.Element = new ElementMockup();