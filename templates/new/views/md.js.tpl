import {bindable, inject} from "aurelia-framework";
import {EventAggregator} from 'aurelia-event-aggregator';
import {template} from './schema';
import {Model} from './model';
import {toolbarItems} from './toolbar-items';
import {SearchFilter} from 'pragma-views/lib/search-filter';

@inject(EventAggregator)
export class __classname__ {
    @bindable toolbarItems;
    @bindable toolbarSelectedId;
    @bindable schema;
    @bindable model;
    @bindable items;
    @bindable selectedId;
    @bindable searchText;

    constructor(eventAggregator) {
        this.eventAggregator = eventAggregator;
        this.schema = template;
    }

    attached() {
        this.toolbarItems = toolbarItems;
        this.fetchItems();
    }

    detached() {
        this.schema = null;
        this.model = null;
        this.toolbarItems = null;
    }


    toolbarSelectedIdChanged(newValue) {
        alert(newValue);
    }

    selectedIdChanged(newValue) {
        this.fetch(newValue);
    }

    fetchItems() {
        return new Promise(_ => {
            this.items = [];

            for (let i = 0; i < 100; i++) {
                const model = new Model();
                model.id = i;
                model.code = `Code ${i}`;
                model.description = `Description ${i}`;

                this.items.push(model);
            }
        })
    }

    fetch(id) {
        return new Promise(_ => {
            this.model = this.items.find(item => item.id == id);
        })
    }

    searchTextChanged(newValue, oldValue) {
        if ((oldValue || '').length == 0) {
            this.itemsBackup = this.items.slice(0);
        }

        SearchFilter(newValue, this.itemsBackup).then(result => {
            this.items = result;
        });
    }
}