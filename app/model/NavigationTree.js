Ext.define('Admin.model.NavigationTree', {
    extend: 'Admin.model.Base',

    fields: [
        {
            type: 'string',
            name: 'id'
        },
        {
            type: 'string',
            name: 'text'
        },
        {
            type: 'string',
            name: 'iconCls'
        },
        {
            type: 'string',
            name: 'rowCls'
        },
        {
            type: 'string',
            name: 'viewType'
        },
        {
            type: 'string',
            name: 'routeId'
        },
        {
            type: 'boolean',
            name: 'leaf'
        }
    ]
});