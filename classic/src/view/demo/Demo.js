Ext.define('Admin.view.demo.Demo', {
    extend: 'Ext.container.Container',

    xtype: 'demo',

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

    // margin: '20 0 0 20',

    items: [{
        xtype: 'gridpanel',
        flex: 2,
        bind: {
            store: '{demo}'
        },
        // store: { type: 'demo'},
        reference: 'developersList',
        columns: [
            { text: '姓名', dataIndex: 'name' },
            { text: '邮箱', dataIndex: 'email', width: '30%' },
            { text: '电话', dataIndex: 'phone' }
        ],
        bbar: {
            xtype: 'pagingtoolbar',
            displayInfo: true
        },
        tbar: {
            xtype: 'container',
            items: [{
                xtype: 'toolbar',
                items: [
                    { xtype: 'button', text: '新增', iconCls: 'x-fa fa-plus', handler: 'add', params: { view: 'demoadd', windowCfg: { title: '添加开发者', width: 400, height: 250 } }, targetCfg: {} },
                    { xtype: 'button', text: '编辑', iconCls: 'x-fa fa-pencil', handler: 'edit', params: { view: 'demoedit', windowCfg: { title: '编辑开发者', width: 400, height: 250 } } },
                    { xtype: 'button', text: '删除', iconCls: 'x-fa fa-trash', handler: 'del' }
                ]
            }, {
                xtype: 'toolbar',
                items: [
                    {
                        xtype: 'textfield',
                        fieldLabel: '姓名'
                    }, {
                        xtype: 'combobox',
                        fieldLabel: '状态',
                        allowBlank: false,
                        // value: '',
                        name: 'state',
                        itemId: 'state',
                        //queryMode: 'local',
                        editable: false,
                        data: [
                            { value: "", text: "请选择" },
                            { value: "valid", text: "有效" },
                            { value: "invalid", text: "禁用" }
                        ],
                        valueField: 'value',
                        displayField: 'text'
                    }
                ]
            }]
        },
        listeners: {
            itemclick: 'onItemClick'
        }
    }, {
        xtype: 'tabpanel',
        flex: 1,
        items: [{
            title: '客户信息',
            xtype: 'gridpanel',
            // store: 'demo',
            columns: [
                { text: '姓名', dataIndex: 'name' },
                { text: '邮箱', dataIndex: 'email', width: '30%' },
                { text: '电话', dataIndex: 'phone' }
            ],
        }, {
            title: '产品信息',
            xtype: 'gridpanel',
            // store: 'demo',
            columns: [
                { text: '姓名', dataIndex: 'name' },
                { text: '邮箱', dataIndex: 'email', width: '30%' },
                { text: '电话', dataIndex: 'phone' }
            ],
        }]
    }]
});
