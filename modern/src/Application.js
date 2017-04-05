/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.define('Admin.Application', {
    extend: 'Ext.app.Application',

    name: 'Admin',

    defaultToken : 'dashboard',

    mainView: 'Admin.view.main.Main',

    profiles: [
        'Phone',
        'Tablet'
    ],

    stores: [
        'NavigationTree'
    ],

    // 初始化完成，页面全部加载后执行
    launch: function() {
        // Ext.log('应用启动中......1');

        // TODO modern模式下还没有做登陆逻辑，参照经典模式做就行

        // Ext.log('应用启动完毕......1');
    },

    // 初始化代码写在这里
    init: function() {
        // Ext.log('应用初始化......1');
        // Ext.log('应用初始化完成......1');
    },
});
