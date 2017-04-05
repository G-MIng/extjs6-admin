/**
 * 自定义了一个api类型的proxy，其他store可以都使用这个api proxy，便于统一修改和配置
 */
Ext.define('Admin.proxy.API', {
    extend: 'Ext.data.proxy.Ajax',
    alias: 'proxy.api',

    // 读取器配置，相对应的还有写入器writer，具体使用查询手册
    reader: {
        type: 'json',// 读取类型
        rootProperty: 'data' // 读取数据根节点，后台统一返回
    },
    // 后台返回数据示例，不包含success字段貌似也不会报错，自行测试
    /*{
        "success": true,
        "data": [
            { "name": "User 1" },
            { "name": "User 2" }
        ]
    }*/

    // 服务端异常处理
    listeners: {
        exception: function(proxy, response, operation){
            Ext.MessageBox.show({
                title: '服务端异常',
                msg: operation.getError(),
                icon: Ext.MessageBox.ERROR,
                buttons: Ext.MessageBox.OK
            });
        }
    }
});