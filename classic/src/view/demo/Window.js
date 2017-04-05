Ext.define('Admin.view.demo.Window', {
    extend: 'Ext.window.Window',
    alias: 'widget.demowindow',
    autoShow: true,
    modal: true,

    layout: 'fit',

    width: 200,
    height: 200,

    // 窗口渲染后调用
    afterRender: function () {
        var me = this;
        // 调用父类方法
        me.callParent(arguments);
        // 调整窗口尺寸
        me.syncSize();

        // 监听重置窗口大小事件
        Ext.on(me.resizeListeners = {
            resize: me.onViewportResize,
            scope: me,
            buffer: 50
        });
    },

    // 销毁的时候注销调整窗口大小监听
    doDestroy: function () {
        Ext.un(this.resizeListeners);

        this.callParent();
    },

    // 调整窗口大小的时候调用syncSize方法重置窗口尺寸和位置
    onViewportResize: function () {
        this.syncSize();
    },

    // 跳转弹框窗口的尺寸和位置
    syncSize: function () {
        // var width = Ext.Element.getViewportWidth(),
        //     height = Ext.Element.getViewportHeight();

        // this.setSize(Math.floor(width * 0.5), Math.floor(height * 0.5));
        // this.setXY([ Math.floor(width * 0.05), Math.floor(height * 0.05) ]);

        var width = this.width,
            height = this.height;

        this.setSize(width, height);
        this.setXY([ Math.floor(width * 0.05), Math.floor(height * 0.05) ]);
    }
});
