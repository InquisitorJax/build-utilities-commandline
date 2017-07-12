import {bindable} from "aurelia-framework";
import {toolbarItems} from './toolbar-items';
import {SearchFilter} from 'pragma-views/lib/search-filter';

export class __classname__ {
    itemsBackup;

    @bindable toolbarItems;
    @bindable toolbarSelectedId;
    @bindable items;
    @bindable selectedId;
    @bindable searchText;

    constructor() {
    }

    attached() {
        this.toolbarItems = toolbarItems;
        this.fetchItems();
    }

    detached() {
        this.toolbarItems = null;
        this.itemsBackup = null;
    }

    toolbarSelectedIdChanged(newValue) {
        alert(newValue);
    }

    fetchItems() {
        return new Promise(_ => {
            this.items = [
                {
                    id: 0,
                    title: "Item 0"
                }
            ];
        })
    }

    addItem() {
        this.items.push({
            id: this.items.length,
            title: `Item ${this.items.length}`
        })
    }

    selectedIdChanged(newValue) {
        console.log(newValue);
    }

    searchTextChanged(newValue, oldValue) {
        if ((oldValue || '').length == 0) {
            this.itemsBackup = this.items.slice(0);
        }

        SearchFilter(newValue, this.itemsBackup, 'title').then(result => {
            this.items = result;
        });
    }
}