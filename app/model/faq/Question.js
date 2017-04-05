Ext.define('Admin.model.faq.Question', {
    extend: 'Admin.model.Base',

    fields: [
        {
            type: 'string',
            name: 'name'
        },
        {
            type: 'int',
            name: 'catId',
            // 实体类名。放在外键上面，来定义一对多
            // 因为模拟数据用的NoSql文档形式数据，这里的reference注释
            // reference: 'faq.Category'
        }
    ]
});
