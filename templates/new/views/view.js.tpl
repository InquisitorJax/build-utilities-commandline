import {bindable, inject} from "aurelia-framework";
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class __classname__ {
    constructor(eventAggregator) {
        this.eventAggregator = eventAggregator;
    }

    attached() {
        // initialize
    }

    detached() {
        // dispose
    }
}