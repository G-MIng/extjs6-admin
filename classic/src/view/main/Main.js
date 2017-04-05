Ext.define('Admin.view.main.Main', {
    extend: 'Ext.container.Viewport',

    // 依赖类异步加载，仅加载，不创建
    requires: [
        'Ext.button.Segmented',
        'Ext.list.Tree',
        'Admin.store.NavigationTree'
    ],

    xtype: 'main',

    // 当前视图的控制器，值可以为别名、一个配置对象或者是一个视图控制器的对象，为别名的时候可以省去前面的前缀
    controller: 'main',
    // 当前视图的视图模型，值可以为别名、一个配置对象或者是一个视图模型的对象，为别名的时候可以省去前面的前缀
    // 尽可能使用下面的形式来配置viewModel。主要原因是因为配置系统(Config System)合并config值的方式。使用这种形式，type属性在合并过程中会被保留
    viewModel: {type: 'main'},

    // 额外的组件样式类名
    cls: 'sencha-dash-viewport',

    // 子items组件的ID，可以通过容器的getComponent方法访问，该方法存在于Ext.container.Container
    // 注意跟getCmp的区别，getCmp接受的参数为ID，存在于Ext
    // itemId作用域为当前容器，跟其他的容器的itemId不冲突
    itemId: 'mainView',

    // 布局，手册搜索Ext.enums.Layout查看所有布局类
    layout: {
        type: 'vbox',//布局类型
        align: 'stretch'//排列方式
    },

    // 监听器，每个组件的事件都不一样，具体查询组件文档的events列表
    listeners: {
        afterrender: 'afterMainViewRender',
        beforerender: 'beforeMainViewRender'
    },

    // 容器里的组件
    // 这里使用的是vbox布局，分为上下两块
    items: [
        {
            xtype: 'toolbar',// 指定组件的xtype
            cls: 'sencha-dash-dash-headerbar shadow',
            height: 64,
            itemId: 'headerBar',
            items: [
                {
                    xtype: 'component',
                    reference: 'senchaLogo',
                    cls: 'sencha-logo',
                    html: '<div class="main-logo"><img src="resources/images/logo_rapoo.png"></div>',
                    width: 250
                },
                {
                    margin: '0 0 0 8',
                    ui: 'header',
                    iconCls:'x-fa fa-navicon',
                    id: 'main-navigation-btn',
                    handler: 'onToggleNavigationSize'
                },
                // ->：表示按钮右靠齐，相当于{xtype: 'tbfill'}，－：表示垂直分离两个按钮，相当于{xtype: 'tbseparator'}，空格：表示水平分离，相当于{xtype: 'tbspacer'}
                '->',
                {
                    xtype: 'segmentedbutton',
                    margin: '0 16 0 0',

                    // 为特殊的平台设置属性，存在于Ext类，只读属性
                    // ie9m意思是IE9.x或者更低的浏览器
                    platformConfig: {
                        ie9m: {
                            hidden: true
                        }
                    },

                    items: [{
                        iconCls: 'x-fa fa-desktop',
                        pressed: true// 根据item的xtype去文档里找对应的属性说明
                    }, {
                        iconCls: 'x-fa fa-tablet',
                        handler: 'onSwitchToModern',// 去当前的视图控制器里找
                        tooltip: 'Switch to modern toolkit'
                    }]
                },
                {
                    iconCls:'x-fa fa-search',
                    ui: 'header',
                    href: '#searchresults',
                    hrefTarget: '_self',
                    tooltip: 'See latest search'
                },
                {
                    iconCls:'x-fa fa-envelope',
                    ui: 'header',
                    href: '#email',
                    hrefTarget: '_self',
                    tooltip: 'Check your email'
                },
                {
                    iconCls:'x-fa fa-question',
                    ui: 'header',
                    href: '#faq',
                    hrefTarget: '_self',
                    tooltip: 'Help / FAQ\'s'
                },
                {
                    iconCls:'x-fa fa-th-large',
                    ui: 'header',
                    href: '#profile',
                    hrefTarget: '_self',
                    tooltip: 'See your profile'
                },
                {
                    xtype: 'tbtext',
                    text: 'Goff Smith',
                    cls: 'top-user-name'
                },
                {
                    xtype: 'image',
                    cls: 'header-right-profile-image',
                    height: 35,
                    width: 35,
                    alt:'current user image',
                    src: 'resources/images/user-profile/2.png'
                }
            ]
        },
        {
            xtype: 'maincontainerwrap',// 在Admin.view.main.MainContainerWrap定义
            id: 'main-view-detail-wrap',
            reference: 'mainContainerWrap',
            flex: 1,
            items: [
                {
                    xtype: 'treelist',
                    reference: 'navigationTreeList',// 在编写视图控制器逻辑的时候，最烦的就是需要获取所需的组件来完成只能的操作，reference就为了解决这个问题，视图控制器里使用this.lookupReference(referenceName)或者this.getReferences()就能获取到引用的组件。详细用法查询文档Ext.container.Container
                    itemId: 'navigationTreeList',
                    ui: 'navigation',// 组件的UI样式，如何自定义UI，具体谷歌，这里的navigation是内置的
                    store: 'NavigationTree',// 指定store，这里用的storeId
                    width: 250,
                    expanderFirst: false,
                    expanderOnly: false,
                    // 监听器
                    listeners: {
                        selectionchange: 'onNavigationTreeSelectionChange'
                    }
                },
                {
                    xtype: 'container',
                    flex: 1,
                    reference: 'mainCardPanel',
                    cls: 'sencha-dash-right-main-container',
                    itemId: 'contentPanel',
                    layout: {
                        type: 'card',
                        anchor: '100%'
                    }
                }
            ]
        }
    ]
});
