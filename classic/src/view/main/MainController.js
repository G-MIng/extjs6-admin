/**
 * Main视图控制器
 */
Ext.define('Admin.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    /**
     * 别名由namespace和name组成，其中namespace必须为小写
     * 其他类型比如store、model、controller、proxy等等，就使用alias
     * 对于组件，一般仅设置一个xtype就可以了，比较直观，比如某个组件别名为widget.emailcompose，同时隐含设置了组件的xtype为emailcompose
     */
    alias: 'controller.main',

    // unmatchedroute - 如果hash发生了变化而没有找到相匹配的路由
    // 这里也走onRouteChange，如果找不到匹配路由的时候就会跳转到404页面
    listen: {
        controller: {
            '#': {
                unmatchedroute: 'onRouteChange'
            }
        }
    },

    // 如何使用路由，有中文文档：http://lovelyelfpop.github.io/Sencha_Cmd6_Extjs6_Guides/extjs/6.0/application_architecture/router.html
    routes: {
        ':node': {
            before: 'onBeforeRoute',
            action: 'onRouteChange'
        }
    },

    lastView: null,

    // 设置当前页面视图
    setCurrentView: function(hashTag) {
        // URL HASH值
        hashTag = (hashTag || '').toLowerCase();

        var me = this,
            refs = me.getReferences(),
            mainCard = refs.mainCardPanel, // 主视图面板
            mainLayout = mainCard.getLayout(),
            navigationList = refs.navigationTreeList, // 通过引用的方式获取组件
            store = Ext.getStore('NavigationTree'),
            node = store.findNode('routeId', hashTag) || store.findNode('viewType', hashTag), // 根据当前hash值获取节点
            view = (node && node.get('viewType')) || 'page404', // 获取视图类型，也就是视图页面的xtype，如果获取不到就显示404页面
            lastView = me.lastView, // 初始化最后视图为当前对象的最后视图
            existingItem = mainCard.child('component[routeId=' + hashTag + ']'), // 获取当前hash值的
            newView;

        // 如果上一次的视图为窗口类或窗口类的子类就销毁，例如lockingwindow
        // isWindow判断视图是否为一个Ext.window.Window实例或者子类的实例
        if (lastView && lastView.isWindow) {
            lastView.destroy();
        }
        // 获取主卡片面板的活动项赋予lastView
        lastView = mainLayout.getActiveItem();

        // 如果窗口不存在就创建
        if (!existingItem) {
            newView = Ext.create({
                xtype: view,
                routeId: hashTag, // 定义routeId为hash以方便上面的查询
                // 隐藏模式：
                // display - 用display: none来隐藏，默认值
                // visibility - 用visibility: hidden来隐藏
                // offsets - 通过将组件定位到文档可视区域之外来隐藏，适用于本框架的卡片式布局
                hideMode: 'offsets'
            });
        }

        // 如果视图不存在 或者 已经存在且是非窗口类型
        if (!newView || !newView.isWindow) {
            // 如果existingItem存在，即newView不存在的时候，只需将之前已经创建过的视图再次设置为活动就好
            if (existingItem) {
                if (existingItem !== lastView) {
                    mainLayout.setActiveItem(existingItem);
                }
                // 同时更新newView
                newView = existingItem;
            } else {
                // 如果existingItem不存在，即newView存在的时候，将newView添加到CardLayout
                // 因为容器改变尺寸的时候会重新布局，有子容器添加删除也会触发容器重新布局，但是有些情况我们想禁止自动重新布局，比如一次性添加了很多个组件的时候，如果每个组件都触发一次重新布局未免影响效率
                // 通过设置suspendLayout标志来true阻止一些通常会自动触发重新布局的行为，一次性添加好所有组件后再启用，以提高效率
                Ext.suspendLayouts();
                mainLayout.setActiveItem(mainCard.add(newView));
                Ext.resumeLayouts(true);
            }
        }
        // 导航选中
        navigationList.setSelection(node);

        // 如果新视图组件或下面的子组件能获取焦点，则获取焦点。isFocusable方法存在于Ext.util.Focusable
        if (newView.isFocusable(true)) {
            newView.focus();
        }

        // 更新lastView
        me.lastView = newView;
    },

    // 当导航切换的时候触发
    onNavigationTreeSelectionChange: function(tree, node) {
        var to = node && (node.get('routeId') || node.get('viewType'));

        //TODO 这里还有个BUG，因为treelist组件监听变化只有selectionchange事件，这样在同一个选项上第二次点击不会生效，对于其他导航还好，但退出按钮应该保证可以连续点击
        if (to == 'logout') {
            var me = this;
            Ext.MessageBox.confirm('系统登出', '确定要注销当前登陆帐号吗？', function(optional) {
                if (optional === 'yes') {
                    localStorage.removeItem('LoggedIn');

                    me.getView().destroy();

                    Ext.create({
                        xtype: 'login'
                    });
                }
            });

            return;
        }

        if (to) {
            this.redirectTo(to);
        }
    },

    // 导航隐藏/显示按钮
    onToggleNavigationSize: function() {
        var me = this,
            refs = me.getReferences(),
            navigationList = refs.navigationTreeList,
            wrapContainer = refs.mainContainerWrap,
            collapsing = !navigationList.getMicro(),
            new_width = collapsing ? 64 : 250;

        if (Ext.isIE9m || !Ext.os.is.Desktop) {
            Ext.suspendLayouts();

            refs.senchaLogo.setWidth(new_width);

            navigationList.setWidth(new_width);
            navigationList.setMicro(collapsing);

            Ext.resumeLayouts(); // do not flush the layout here...

            // No animation for IE9 or lower...
            wrapContainer.layout.animatePolicy = wrapContainer.layout.animate = null;
            wrapContainer.updateLayout(); // ... since this will flush them
        } else {
            if (!collapsing) {
                // If we are leaving micro mode (expanding), we do that first so that the
                // text of the items in the navlist will be revealed by the animation.
                navigationList.setMicro(false);
            }

            // Start this layout first since it does not require a layout
            refs.senchaLogo.animate({ dynamic: true, to: { width: new_width } });

            // Directly adjust the width config and then run the main wrap container layout
            // as the root layout (it and its chidren). This will cause the adjusted size to
            // be flushed to the element and animate to that new size.
            navigationList.width = new_width;
            wrapContainer.updateLayout({ isRoot: true });
            navigationList.el.addCls('nav-tree-animating');

            // We need to switch to micro mode on the navlist *after* the animation (this
            // allows the "sweep" to leave the item text in place until it is no longer
            // visible.
            if (collapsing) {
                navigationList.on({
                    afterlayoutanimation: function() {
                        navigationList.setMicro(true);
                        navigationList.el.removeCls('nav-tree-animating');
                    },
                    single: true
                });
            }
        }
    },

    beforeMainViewRender: function() {
        if (!Ext.getStore('NavigationTree')) {
            Ext.create('Admin.store.NavigationTree');
        }
    },

    afterMainViewRender: function() {
        if (!window.location.hash) {
            this.redirectTo("dashboard");
        }
    },

    onBeforeRoute: function(id, action) {
        var treeStore = Ext.getStore('NavigationTree');

        treeStore.addListener('load', function() {
            action.resume();
        }, this);

        if (treeStore.isLoaded()) {
            action.resume();
        } else {
            treeStore.load();
        }

        var navigationTreeList = this.lookupReference('navigationTreeList');

        navigationTreeList.setStore(treeStore);
    },

    // 当路由发生变动的时候
    onRouteChange: function(id) {
        if (id === 'logout') {
            return;
        }

        this.setCurrentView(id);
    },

    // 没被用到
    onSearchRouteChange: function() {
        this.setCurrentView('searchresults');
    },

    // 切换到摩登（移动端）形式
    onSwitchToModern: function() {
        Ext.Msg.confirm('切换到移动端视图', '确定要切换到移动端视图吗？',
            this.onSwitchToModernConfirmed, this);
    },

    // 切换到摩登（移动端）形式时的确认框
    onSwitchToModernConfirmed: function(choice) {
        if (choice === 'yes') {
            var s = location.search;

            // Strip "?classic" or "&classic" with optionally more "&foo" tokens
            // following and ensure we don't start with "?".
            s = s.replace(/(^\?|&)classic($|&)/, '').replace(/^\?/, '');

            // Add "?modern&" before the remaining tokens and strip & if there are
            // none.
            location.search = ('?modern&' + s).replace(/&$/, '');
        }
    },

    // 未使用
    onEmailRouteChange: function() {
        this.setCurrentView('email');
    }
});
