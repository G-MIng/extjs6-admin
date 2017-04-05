Ext.define('Admin.view.authentication.AuthenticationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.authentication',

    //TODO: implement central Facebook OATH handling here

    onFaceBookLogin : function() {
        this.redirectTo('dashboard', true);
    },

    onLoginButton: function() {
        // viewmodel是双向绑定的
        var vm = this.getViewModel();
        var data = vm.data;

        // 开发时候可以使用Ext.Ajax.request来进行后端登陆验证
        if (data.userid === 'admin' && data.password === 'admin') {
            // 设置本地存储LoggedIn为true
            localStorage.setItem('LoggedIn', true);

            // 移除登陆窗口，这里需要移除它的父窗口才行
            this.getView().up('lockingwindow').destroy();
            console.log(1);
            // 添加main视图到viewport
            Ext.create({
                xtype: 'main'
            });

            // 跳转到dashboard页面
            this.redirectTo('dashboard', true);
        } else {
            // 清空错误的帐号密码
            // vm.set('userid', '');
            vm.set('password', '');

            Ext.MessageBox.show({
                title: '登陆失败',
                msg: '帐号密码错误！',
                icon: Ext.MessageBox.ERROR,
                buttons: Ext.MessageBox.OK
            });
        }
    },

    onLoginAsButton: function() {
        this.redirectTo('login', true);
    },

    onNewAccount:  function() {
        this.redirectTo('register', true);
    },

    onSignupClick:  function() {
        this.redirectTo('dashboard', true);
    },

    onResetClick:  function() {
        this.redirectTo('dashboard', true);
    }
});