Ext.define('Admin.model.demo.Demo', {
    extend: 'Admin.model.Base',

    fields: [
        {
            type: 'int',
            name: 'id'
        },
        {
            type: 'string',
            name: 'name'
        },
        {
            type: 'string',
            name: 'email'
        },
        {
            type: 'string',
            name: 'phone'
        }
    ],

});
