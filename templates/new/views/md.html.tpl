<template>
    <require from="./../../../../styles/views/__view-tag__.css"></require>

    <div class="md-layout">
        <div class="toolbar">
            <pragma-options-toolbar dropdown-items.bind="toolbarItems" selected-id.two-way="toolbarSelectedId">
                <div slot="items">
                    <icon name="search"></icon>
                    <input type="search" value.bind="searchText"/>
                </div>
            </pragma-options-toolbar>
        </div>

        <div class="body">
            <master-detail is-master-visible="true">
                <div slot="master">
                    <ul selectable="selected-id.two-way: selectedId; multi: false" role="list">
                        <li repeat.for="item of items" data-id="${item.id}" class="card" role="listitem">
                            <div class="default-padding no-mouse">
                                <div>${item.code}</div>
                                <div>${item.description}</div>
                            </div>
                        </li>
                    </ul>
                </div>

                <div slot="detail">
                    <pragma-form schema.bind="schema" model.two-way="model"></pragma-form>
                </div>
            </master-detail>
        </div>
    </div>
</template>