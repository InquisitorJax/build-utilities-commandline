<template>
    <require from="./../../../../styles/views/__view-tag__.css"></require>

    <pragma-options-toolbar dropdown-items.bind="toolbarItems" selected-id.two-way="toolbarSelectedId">
        <div slot="items" class="toolbar">
            <icon name="search"></icon>
            <input type="search" value.bind="searchText"/>
            <button click.delegate="addItem($event)">Add</button>
        </div>
    </pragma-options-toolbar>

    <ul selectable="selected-id.two-way: selectedId; multi: false" role="list">
        <li repeat.for="item of items" data-id="${item.id}" class="card" role="listitem">
            <div class="default-padding no-mouse">
                <div>${item.title}</div>
            </div>
        </li>
    </ul>
</template>