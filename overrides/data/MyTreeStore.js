Ext.define('Ext.data.MyTreeStore', {
    override: 'Ext.data.TreeStore',

    onProxyLoad: function(operation) {
        var me = this,
            options = operation.initialConfig,
            successful = operation.wasSuccessful(),
            records = operation.getRecords(),
            node = options.node,
            isRootLoad = options.isRootLoad,
            scope = operation.getScope() || me,
            args = [records, operation, successful];

        if (me.destroyed) {
            return;
        }

        me.loading = false;
        node.set('loading', false);

        if (successful) {
            ++me.loadCount;
            if (!me.getClearOnLoad()) {
                records = me.cleanRecords(node, records);
            }

            // Nodes are in linear form, linked to the parent using a parentId property
            if (me.getParentIdProperty()) {
                records = me.treeify(node, records);
            }

            if (isRootLoad) {
                me.suspendEvent('add', 'update');
            }
            records = me.fillNode(node, records);
        }

        // The load event has an extra node parameter
        // (differing from the load event described in AbstractStore)
        /**
         * @event load
         * Fires whenever the store reads data from a remote data source.
         * @param {Ext.data.TreeStore} this
         * @param {Ext.data.TreeModel[]} records An array of records.
         * @param {Boolean} successful True if the operation was successful.
         * @param {Ext.data.Operation} operation The operation that triggered this load.
         * @param {Ext.data.NodeInterface} node The node that was loaded.
         */

        Ext.callback(options.onChildNodesAvailable, scope, args);
        if (isRootLoad) {
            me.resumeEvent('add', 'update');
            me.callObservers('BeforePopulate');
            me.fireEvent('datachanged', me);
            me.fireEvent('refresh', me);
            me.callObservers('AfterPopulate');
        }
        me.fireEvent('load', me, records, successful, operation, node);
    },

    findNode: function(property, value, startsWith, endsWith, ignoreCase) {
        if (Ext.isEmpty(value, false)) {
            return null;
        }

        // If they are looking up by the idProperty, do it the fast way.
        if (property === this.model.idProperty && arguments.length < 3) {
            return this.byIdMap[value];
        }
        var regex = Ext.String.createRegex(value, startsWith, endsWith, ignoreCase),
            result = null;

        Ext.Object.eachValue(this.byIdMap, function(node) {
            if (node && regex.test(node.get(property))) {
                result = node;
                return false;
            }
        });
        return result;
    }

});