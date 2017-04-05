Ext.define('Admin.view.demo.DemoModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.demo',

    stores: {
        demo: {
            type: 'demo'
        }
    },

    data: {
        add: {
            id: null,
            name: '',
            email: '',
            phone: ''
        },
        edit: {
            id: null,
            name: '11',
            email: '222',
            phone: '333'
        }
    }
});
