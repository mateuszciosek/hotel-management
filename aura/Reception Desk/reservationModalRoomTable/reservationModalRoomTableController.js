/**
 * Created by Mateusz on 2018-07-18.
 */
({
    onInit: function(component, event, helper) {
        var room = component.get('v.room');
        var guests = component.get('v.guests');

        for (let i=0; i<parseInt(room.Capacity__c); i++) {
            guests.push({
                'sobjectType': 'Guest__c',
                'First_Name__c': '',
                'Last_Name__c': '',
                'ID_Card__c': '',
                'roomId': room.Id,
                'index': i
            });
        }

        component.set('v.guests', guests);
    },

    applyGuestData: function(component, event, helper) {
         var guest = event.getParam('guest');
         var room = component.get('v.room');
         var guests = component.get('v.guests');

        if (event.getParam('editCancelled') == true) {
            //
        } else {
            if (guest.roomId == room.Id) {
                guests[guest.index] = guest;
                var sendEvent = $A.get("e.c:sendFinalData");
                sendEvent.setParam('guest', guest);
                sendEvent.fire();
            }
            component.set('v.guests', guests);
        }
    }
})