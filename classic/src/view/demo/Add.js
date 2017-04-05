Ext.define('Admin.view.demo.Add', {
    extend: 'Ext.form.Panel',

    xtype: 'demoadd',

    requires: [
        'Ext.grid.Panel',
        'Ext.tab.Panel'
    ],

    controller: 'demo',

    viewModel: {
        type: 'demo'
    },

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    bodyPadding: 10,
    scrollable: true,

    publishes: ['add.name', 'add.email', 'add.phone'],

    items: [
        {
            xtype: 'textfield',
            name: 'name',
            fieldLabel: '姓名',
            bind: '{add.name}'
        },
        {
            xtype: 'textfield',
            name: 'email',
            fieldLabel: '邮箱',
            bind: '{add.email}'
        },
        {
            xtype: 'textfield',
            name: 'phone',
            fieldLabel: '手机',
            bind: '{add.phone}'
        },
    ],

    bbar: {
        items: [
            '->',
            {
                xtype: 'button',
                ui: 'soft-red',
                text: '取消',
                handler: 'onCancelClick'
            },
            {
                xtype: 'button',
                ui: 'gray',
                text: '保存',
                handler: 'onSaveClick'
            }
        ]
    }
});
