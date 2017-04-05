/**
 * 这是经典模式下的Application类
 */
Ext.define('Admin.Application', {
    extend: 'Ext.app.Application',
    // 应用程序的名字，同时也是view、model、store、controller的命名空间，不能包含空格和特殊字符
    name: 'Admin',

    requires: [
        'Ext.window.MessageBox'
    ],

    // App的store，这里如果不写全类名默认就是读取AppName.store.StoreName，必须在当前的命名空间之下
    // 一般配置为全局或共享的Store
    /*stores: [
        'NavigationTree'
    ],*/

    // 默认令牌，当应用程序启动时如果没有提供Hash可以在配置中增加一个默认值
    defaultToken : 'dashboard',

    // The name of the initial view to create. This class will gain a "viewport" plugin
    // if it does not extend Ext.Viewport.
    // 主视图，可以是完整的类名，或者类对象。在init方法之后launch方法之前调用
    // 加上了登陆，注释掉主视图
    // mainView: 'Admin.view.main.Main',

    /*views: [
        'Admin.view.authentication.Login',
        'Admin.view.main.Main'
    ],*/

    // 初始化完成，页面全部加载后执行
    launch: function() {
        // Ext.log('应用启动中......1');

        var loggedIn = localStorage.getItem('LoggedIn');

        Ext.create({
            xtype: loggedIn ? 'main' : 'login'
        });

        // Ext.log('应用启动完毕......1');
    },

    // 初始化代码写在这里
    init: function() {
        // Ext.log('应用初始化......1');
        // Ext.log('应用初始化完成......1');
    },

    // 当你的应用程序版本过时(浏览器当前缓存的版本 vs 服务器上最新版本)的时候会调用onAppUpdate函数. 然后会提示用户是否重新加载应用程序
    onAppUpdate: function () {
        Ext.Msg.confirm('程序数据更新', '程序数据有更新，是否需要刷新页面以载入最新数据?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
