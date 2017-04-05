/**
 * Store数据存储
 * Store实例是model实例的集合
 */
Ext.define('Admin.store.faq.FAQ', {
    extend: 'Ext.data.Store',
    alias: 'store.faq',

    // 绑定Model，Model的类名
    model: 'Admin.model.faq.Category',

    // 配置代理
    // proxy的代理针对的是获取批量数据
    proxy: {
        type: 'api',// 代理类型，这里的api是自定义的类型Admin.proxy.API
        url: '~api/faq/faq'//请求地址
    }

    // Store还能配置排序器、过滤器，具体参考文档
});

