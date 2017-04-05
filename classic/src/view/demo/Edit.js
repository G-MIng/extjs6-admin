Ext.define('Admin.view.demo.Edit', {
    extend: 'Ext.form.Panel',

    xtype: 'demoedit',

    id: 'demoedit',

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

    items: [
        {
            xtype: 'textfield',
            name: 'name',
            fieldLabel: '姓名',
            bind: '{edit.name}'
        },
        {
            xtype: 'textfield',
            name: 'email',
            fieldLabel: '邮箱',
            bind: '{edit.email}'
        },
        {
            xtype: 'textfield',
            name: 'phone',
            fieldLabel: '手机',
            bind: '{edit.phone}'
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
