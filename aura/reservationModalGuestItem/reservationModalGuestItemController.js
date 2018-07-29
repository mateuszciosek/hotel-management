/**
 * Created by Mateusz on 2018-07-19.
 */
({
    enableGuestModal: function(component, event, helper) {
        component.set('v.formFlag', true);
    },

    enableEditGuestModal: function(component, event, helper) {
        component.set('v.editFormFlag', true);
    },

    cancelModal: function(component, event, helper) {
        component.set('v.formFlag', event.getParam('formFlag'));
        component.set('v.editFormFlag', event.getParam('editFormFlag'));
    }
})