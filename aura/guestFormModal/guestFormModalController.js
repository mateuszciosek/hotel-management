/**
 * Created by Mateusz on 2018-07-19.
 */
({
    cancelModal: function(component, event, helper) {
        var compEvent = $A.get("e.c:guestFormModalData");
        var guest = component.get('v.guest');

        compEvent.setParams({
            'formFlag': false,
            'guest': {
                 'sobjectType': 'Guest__c',
                 'First_Name__c': '',
                 'Last_Name__c': '',
                 'ID_Card__c': '',
                 'roomId': guest.roomId,
                 'index': guest.index
             }
            });
        console.log(compEvent.getParam('guest'));
        compEvent.fire();
    },

    saveGuest: function(component, event, helper) {
        var newGuest = component.get('v.guest');
        var compEvent = $A.get("e.c:guestFormModalData");
        compEvent.setParams({
            'formFlag': false,
            'guest': newGuest
            });
        compEvent.fire();
    },

    searchByIdCard: function(component, event, helper) {
        var IDCardField = component.find('idcard');
        var IDCardValue = IDCardField.get('v.value');

        if(IDCardField.get('v.validity')) {
            helper.getGuestData(component, IDCardValue);
        }
    }
})