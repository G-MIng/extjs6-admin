/*
 * This file is responsible for launching the application. Application logic should be
 * placed in the Admin.Application class.
 * 应用程序启动入口类
 */
Ext.application({
    // 应用程序的名字，同时也是view、model、store、controller的命名空间，不能包含空格和特殊字符
    name: 'Admin',
    // 继承Admin.Application类，Admin.Application类存放在视图目录
    extend: 'Admin.Application',

    // Simply require all classes in the application. This is sufficient to ensure
    // that all Admin classes will be included in the application build. If classes
    // have specific requirements on each other, you may need to still require them
    // explicitly.
    // 在应用程序启动的时候包含进来所有的Admin命名空间下的类，其他非Admin下的再自行通过requires引用
    requires: [
        'Admin.data.*'
    ],

    // 初始化完成，页面全部加载后执行
    launch: function() {
        Ext.log('应用启动中......');

        // 调用父类方法，因为父类Admin.Application位于classic/modern目录，可以将针对不同平台的代码写入对应的父类方法中
        this.callParent(arguments);

        if (Ext.isIE && Ext.ieVersion < 9) {
            Ext.Msg.alert('浏览器兼容错误', '请使用IE9+或其他浏览器打开！');
        }

        Ext.log('应用启动完毕......');
    },

    // 初始化代码写在这里
    init: function() {
        Ext.log('应用初始化......');

        // 调用父类方法，因为父类Admin.Application位于classic/modern目录，可以将针对不同平台的代码写入对应的父类方法中
        this.callParent(arguments);

        // 加上这句，避免console出现警告错误
        Ext.ariaWarn = Ext.emptyFn;

        // 设置button menu的时候在console中显示错误，设置为false取消检查
        // 参阅此处
        // https://docs.sencha.com/extjs/6.0.0/guides/upgrades_migrations/extjs_upgrade_guide.html#upgrades_migrations-_-extjs_upgrade_guide_-_button
        Ext.enableAriaButtons = false;

        // 如果一个panel有ariaRole: "region"属性但是没有设置title，console里会显示一个警告，设置为false取消检查
        // 参阅此处
        // https://docs.sencha.com/extjs/6.0.0/guides/upgrades_migrations/extjs_upgrade_guide.html#upgrades_migrations-_-extjs_upgrade_guide_-_aria_regions_should_have_a_title
        Ext.enableAriaPanels = false;

        // 标识Ext的ajax请求
        Ext.Ajax.defaultHeaders = {
            'Request-By': 'Ext'
        };

        // 每次请求结束后判断是否带有LT(Login timeout)头，如果有则提示
        // 这要求后台在每次请求前判断是否登陆超时，如果是，就需要加一个名为LT的响应头
        Ext.Ajax.on('requestcomplete', function(conn, response, opts){
            if (response.getResponseHeader && response.getResponseHeader('LT')) {
                Ext.MessageBox.confirm('登陆超时', '登陆超时，是否需要跳转到登陆页？', function(optional) {
                    if (optional === 'yes') {
                        localStorage.removeItem('LoggedIn');

                        Ext.ComponentQuery.query('button').destroy();

                        Ext.create({
                            xtype: 'login'
                        });
                    }
                });
            }
        });

        Ext.log('应用初始化完成......');
    }
});
