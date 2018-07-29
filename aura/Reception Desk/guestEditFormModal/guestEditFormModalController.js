/**
 * Created by Mateusz on 2018-07-28.
 */
({
//    onInit: function(component, event, helper) {
//        var guest = component.get('v.guest');
//
//        component.set('v.receivedGuest', guest);
//        var receivedGuest = component.get('v.receivedGuest');
//
//        console.log(guest.First_Name__c);
//        console.log(receivedGuest.First_Name__c);
//    },

    cancelModal: function(component, event, helper) {
        var guest = component.get('v.guest');
        var compEvent = $A.get("e.c:guestFormModalData");

        compEvent.setParams({
            'editFormFlag': false,
            'guest': guest,
            'editCancelled': true
            });
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