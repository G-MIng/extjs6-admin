/**
 * 模拟浏览器AJAX请求
 */
Ext.define('Admin.data.Simulated', {

    requires: [
        'Ext.ux.ajax.JsonSimlet',
        'Ext.ux.ajax.SimManager'
    ],

    // 在类继承的时候调用，这里会自动将所有的静态模拟数据进行URL注册
    onClassExtended: function (cls, data) {
        // 将静态数据类的类名替换为URL
        var url = data.$className.toLowerCase().replace(/\./g, '/').
                    replace(/^admin\/data/, '~api'),
            simlet = {
                type: 'json',
                data: data.data
            },
            registration = {};

        registration[url] = simlet;
        // 注册针对URL的模拟器
        Ext.ux.ajax.SimManager.register(registration);
    }
},
// 类创建之后调用，这里是初始化模拟器
function() {
    Ext.ux.ajax.SimManager.init({
        defaultSimlet: null
    });
});
