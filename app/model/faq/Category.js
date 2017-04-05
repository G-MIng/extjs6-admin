Ext.define('Admin.model.faq.Category', {
    extend: 'Admin.model.Base',

    // 定义主键，默认为id。也可以
    idProperty: 'id',

    // 定义模型字段
    // 预定义的字段类型有auto、boolean、date、int、number、string，默认为auto
    // 可以通过扩展 Ext.data.field.Field 创建自定义类型
    // 具体配置文档搜索Ext.data.field.Field，以下仅列出常用配置
    fields: [
        {
            type: 'int',
            name: 'id',
            // 为了保证性能，可以将convert方法设置为null
            convert: null
        },
        {
            type: 'string',
            name: 'name',
            defaultValue: '', // 默认值。默认值也会传递给convert方法
            // auto类型的项没有convert方法，其它类型的项都有convert方法
            convert: function(value) {
                // 数据转换
                return value;
            }
        }
    ],

    /** Model支持对数据进行校验，以下是支持的验证器：
     * presence - 确保字段有值.0值认为是一个有效值但空的字符串无效
     * length - 确保一个字符串有一个最小和最大的长度，二者都是可选的
     * format - 确保一个字符串符合指定的表达式格式
     * inclusion - 确保字段的值在一定指定的值列表中 (例如.确保性别只是男或女)
     * exclusion - 确保一个值不在某一个指定的值列表中 (例如.把用户名'admin'置为用户黑名单)
     */
    /*validators: {
        age: 'presence',
        name: { type: 'length', min: 2 },
        gender: { type: 'inclusion', list: ['Male', 'Female'] },
        username: [
            { type: 'exclusion', list: ['Admin', 'Operator'] },
            { type: 'format', matcher: /([a-z]+)[0-9]{2,3}/i }
        ]
    }*/

    // 定义模型关系，这里是一对多
    // 定义关系有两种方式，一种是keyed，一般用在关系型数据库的外键上面，具体见Admin.model.faq.Question
    // 一种是keyless，一般用在NoSql数据库，一个文档包含多个其他类型的文档。当然也可以通过添加foreignKey: 'catId'来达到跟keyed一样的目的，不过在新版已经过期，被keyed方式替代，具体如下
    hasMany: {
        name: 'questions',
        model: 'faq.Question',
        // foreignKey方式已经过期
        // foreignKey: 'catId'
    }
});
