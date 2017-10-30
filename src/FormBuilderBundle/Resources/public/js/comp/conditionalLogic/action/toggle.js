pimcore.registerNS('Formbuilder.comp.conditionalLogic.action');
pimcore.registerNS('Formbuilder.comp.conditionalLogic.action.toggle');
Formbuilder.comp.conditionalLogic.action.toggle = Class.create(Formbuilder.comp.conditionalLogic.action.abstract, {

    name: 'toggle field',

    getItem: function () {

        var toggleTypesStore = Ext.create('Ext.data.Store', {
            fields: ['label', 'value'],
            data: [{
                label: 'Show',
                value: 'show'
            }, {
                label: 'Hide',
                value: 'hide'
            }]
        });

        var fieldStore = Ext.create('Ext.data.Store', {
            fields: ['name', 'display_name'],
            data: this.panel.getFormFields().fields
        });

        var items = [{
            xtype: 'hidden',
            name: 'cl.' + this.sectionId + '.action.' + this.index + '.type',
            value: 'toggle'
        },
        {
            xtype: 'tagfield',
            name: 'cl.' + this.sectionId + '.action.' + this.index + '.fields',
            fieldLabel: t('form_builder_toggle_fields'),
            queryDelay: 0,
            stacked: true,
            displayField: 'display_name',
            valueField: 'name',
            mode: 'local',
            labelAlign: 'top',
            store: fieldStore,
            editable: false,
            triggerAction: 'all',
            anchor: '100%',
            //value: this.data ? this.data.fields : null,
            allowBlank: true,
            flex: 1
        },
        {
            xtype: 'combo',
            name: 'condition_type',
            name: 'cl.' + this.sectionId + '.action.' + this.index + '.state',
            fieldLabel: t('form_builder_toggle_type'),
            queryDelay: 0,
            displayField: 'label',
            valueField: 'value',
            mode: 'local',
            labelAlign: 'top',
            store: toggleTypesStore,
            editable: true,
            triggerAction: 'all',
            anchor: '100%',
            value: this.data ? this.data.state : null,
            summaryDisplay: true,
            allowBlank: false,
            flex: 1
        }];

        var compositeField = new Ext.form.FieldContainer({
            layout: 'hbox',
            hideLabel: true,
            style: 'padding-bottom:5px;',
            items: items
        });

        var _ = this,
            myId = Ext.id(),
            item = new Ext.form.FormPanel({
                id: myId,
                type: 'combo',
                forceLayout: true,
                style: 'margin: 10px 0 0 0',
                bodyStyle: 'padding: 10px 30px 10px 30px; min-height:30px;',
                tbar: this.getTopBar(_.name, myId, 'form_builder_icon_text'),
                items: compositeField,
                listeners: {}
            });

        return item;
    }
});
