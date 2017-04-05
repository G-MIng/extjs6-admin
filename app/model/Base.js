/**
 * Model，数据模型，这个是基类
 * Model是数据的类型，它的实例是一条数据记录
 * Model子类注释见Admin.model.faq.Category
 */
Ext.define('Admin.model.Base', {
    extend: 'Ext.data.Model',

    //schema用于基类，尤其是配置namespace这个项时
    schema: {
        // 命名空间
        // 如果配置了schema中的namespace，那么子类的entityName就会是Model类名中去掉namespace的那部分
        // 比如：Admin.model.email.Email这个类，因为它的基类有namespace：Admin.model，所以他的entityName默认自动产生就是email.Email
        // 当然也可以手动在子类中配置entityName
        namespace: 'Admin.model',
        urlPrefix: '~api',// url前缀
        // 统一配置model的代理，这里仅是一个对象模板，以便于产生一个真实的Ext.data.proxy.Proxy，并不用配置为一个完整的Proxy
        // model的proxy针对的是模型的单条数据，模型的增删改查通过这里提交给后台
        proxy: {
            // 代理类型，具体使用文档搜索Ext.data.proxy.Ajax
            // type: 'ajax',

            // 自动生成API链接
            // 这里有三个静态属性可以调用
            // {prefix}，就是上面的urlPrefix
            // {entityName}，实体类名，在子类中产生，子类中可以手动配置entityName项为email/friend，方便自动生成API链接，因为不配置而自动产生的entityName为email.friend
            // {schema}，当前对象
            /*api: {
                read: '{prefix}/{entityName:lowercase}/get',
                create: '{prefix}/{entityName:lowercase}/create',
                update: '{prefix}/{entityName:lowercase}/update',
                destroy: '{prefix}/{entityName:lowercase}/delete'
            },*/

            reader: {
                type: 'json',
                // successProperty: 'success', // 返回的json数据里需要包含一个为success的bool字段。默认为success，可以修改为其他，不包含这个字段貌似也不会报错，自行测试
                // rootProperty: 'data'// 这里添加rootProperty会出现404，暂未清楚原因
            },
            // 以json形式，把所有字段提交后台
            writer: {
                type: 'json',
                writeAllFields: true,
            },
            // 异常处理
            listeners: {
                exception: function(proxy, response, operation){
                    Ext.MessageBox.show({
                        title: '服务端异常',
                        msg: operation.getError(),
                        icon: Ext.MessageBox.ERROR,
                        buttons: Ext.MessageBox.OK
                    });
                }
            },

            // 或者使用RESTful形式，具体使用文档搜索Ext.data.proxy.Rest
            type: 'rest',
            url: '{prefix}/{entityName:lowercase}'
        }
    }
});
