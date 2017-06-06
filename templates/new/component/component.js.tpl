import {customElement, inject} from 'aurelia-framework';

@customElement('__control-tag__')
@inject(Element)
export class __classname__ {
    constructor(element) {
        this.element = element;

        // define handlers
        // this.actionHandler = this.action.bind(this);
    }

    attached() {
        // initialize
    }

    detached() {
        // dispose
    }
}