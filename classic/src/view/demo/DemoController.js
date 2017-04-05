Ext.define('Admin.view.demo.DemoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.demo',

    add: function(bt, e, eOpts) {
        this.openWindow(bt.params);
    },

    edit: function(bt, e, eOpts) {
        var developersList = this.lookupReference('developersList');
        var data = developersList.getSelection();// 这里获取到的是model数组
        var data = data[0].getData();
        // console.log(data);

        // console.log(vm.getData());
        var vm = this.getViewModel();
        //TODO 设置值这里应该有更好的方法，这里会持续更新
        this.openWindow(bt.params, function() {
            // vm.data.edit = data;
            // console.log(vm.getData());
            //
            var form = Ext.ComponentQuery.query('demoedit');
            console.log(form[0]);
            form[0].getForm().setValues(data);
        });
    },

    del: function(bt, e, eOpts) {
        var developersList = this.lookupReference('developersList');
        var data = developersList.getSelection();// 这里获取到的是model数组
        console.log(data[0].getData());
    },

    // Grid行点击的时候触发
    onItemClick: function(item, record, index, e, eOpts) {
        console.log(record);
    },

    onCancelClick: function(bt) {
        var win = bt.up('window');
        if (win) {
            win.close();
        }
    },

    onSaveClick: function(bt) {
        // var vm = this.getViewModel();
        // var data = vm.data.add;
        // console.log(vm.getData());
        // console.log(data);
        // 两种获取表单值的方式，可以自行对比区别

        var form = bt.up('form');
        form = form.getForm();
        console.log(form.getFieldValues());
    },

    openWindow: function(params, callback) {
        var view = params.view;

        if(view === ''){
            return false;
        }

        var cfg = Ext.apply({
            xtype: 'demowindow',
            items: [
                Ext.apply({
                    xtype: view
                }, params.targetCfg)// targetCfg放的是windows里面那个组件，也就是view组件的配置项
            ]
        }, params.windowCfg);

        Ext.create(cfg);

        if (callback) {
            callback();
        }
    }
});
