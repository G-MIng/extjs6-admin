Ext.define('Admin.store.demo.Demo', {
    extend: 'Ext.data.Store',

    alias: 'store.demo',

    model: 'Admin.model.demo.Demo',

    storeId: 'demo',

    pageSize: 20,

    autoLoad: true,

    proxy: {
        type: 'api',
        url: '~api/demo/demo'
    }
});
