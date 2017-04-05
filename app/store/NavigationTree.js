Ext.define('Admin.store.NavigationTree', {
    extend: 'Ext.data.TreeStore',

    storeId: 'NavigationTree',

    model: 'Admin.model.NavigationTree',

    fields: [{
        name: 'text'
    }],

    autoLoad: false,

    proxy: {
        type: 'ajax',
        url: 'tree.json',
        reader: {
            type: 'json',
            messageProperty: 'msg',
            rootProperty: 'data'
        }
    },

    root: {
        text: 'root',
        expanded: true
    },

    // 系统内置数据字段有很多，具体手册搜索Ext.data.NodeInterface
    // 目录树的数据可以通过在当前类下配置一个Proxy来从后台读取
    /*root: {
        expanded: true,
        children: [
            {
                text: 'Dashboard',// 节点显示名称，系统内置字段
                iconCls: 'x-fa fa-desktop',// 一个或多个节点图标css类名，系统内置字段，这里使用font-awesome字体图标，但注意使用了x-fa类名，这个类名是兼容EXTJS的类名，不使用默认的fa类名
                rowCls: 'nav-tree-badge nav-tree-badge-new',// 因为使用本数据的组件xtype为treelist，所以新增了这个添加到行的样式类，具体手册查询Ext.list.TreeItem
                viewType: 'admindashboard',//自定义节点字段，值为视图xtype
                routeId: 'dashboard', // 自定义节点字段，routeId值默认跟viewType一致，URL的路由ID
                leaf: true// 是否是叶子节点，如果为true，则该节点不应该包含children子节点。系统内置字段
            },
            {
                text: 'Email',
                iconCls: 'x-fa fa-send',
                rowCls: 'nav-tree-badge nav-tree-badge-hot',
                viewType: 'email',
                leaf: true
            },
            {
                text: 'Profile',
                iconCls: 'x-fa fa-user',
                viewType: 'profile',
                leaf: true
            },
            {
                text: 'Search results',
                iconCls: 'x-fa refa-search',
                viewType: 'searchresults',
                leaf: true
            },
            {
                text: 'FAQ',
                iconCls: 'x-fa fa-question',
                viewType: 'faq',
                leaf: true
            },
            {
                text: 'Pages',
                iconCls: 'x-fa fa-leanpub',
                expanded: false,
                selectable: false,
                //routeId: 'pages-parent',
                //id: 'pages-parent',

                children: [
                    {
                        text: 'Blank Page',
                        iconCls: 'x-fa fa-file-o',
                        viewType: 'pageblank',
                        leaf: true
                    },
                    {
                        text: '404 Error',
                        iconCls: 'x-fa fa-exclamation-triangle',
                        viewType: 'page404',
                        leaf: true
                    },
                    {
                        text: '500 Error',
                        iconCls: 'x-fa fa-times-circle',
                        viewType: 'page500',
                        leaf: true
                    },
                    {
                        text: 'Lock Screen',
                        iconCls: 'x-fa fa-lock',
                        viewType: 'lockscreen',
                        leaf: true
                    },

                    {
                        text: 'Login',
                        iconCls: 'x-fa fa-check',
                        viewType: 'login',
                        leaf: true
                    },
                    {
                        text: 'Register',
                        iconCls: 'x-fa fa-pencil-square-o',
                        viewType: 'register',
                        leaf: true
                    },
                    {
                        text: 'Password Reset',
                        iconCls: 'x-fa fa-lightbulb-o',
                        viewType: 'passwordreset',
                        leaf: true
                    }
                ]
            },
            {
                text: 'Widgets',
                iconCls: 'x-fa fa-flask',
                viewType: 'widgets',
                leaf: true
            },
            {
                text: 'Forms',
                iconCls: 'x-fa fa-edit',
                viewType: 'forms',
                leaf: true
            },
            {
                text: 'Charts',
                iconCls: 'x-fa fa-pie-chart',
                viewType: 'charts',
                leaf: true
            },
            {
                text: 'Demo',
                iconCls: 'x-fa fa-cube',
                viewType: 'demo',
                leaf: true
            },
            {
                text: '注销',
                iconCls: 'x-fa fa-power-off',
                viewType: 'logout',// 这里的logout不为xtype，仅为判断登出的标记
                leaf: true
            }
        ]
    }*/
});
