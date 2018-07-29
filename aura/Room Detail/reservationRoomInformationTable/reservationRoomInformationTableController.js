/**
 * Created by Mateusz on 2018-07-20.
 */
({
    setRoomGuests: function(component, event, helper) {
        var guests = component.get('v.guests');
        var room = component.get('v.room');
        var roomGuests = component.get('v.roomGuests');

        for (var i=0; i<guests.length; i++) {
            if (guests[i].Room__c == room.Room__c) {
                roomGuests.push(guests[i]);
            }
        }
        component.set('v.roomGuests', roomGuests);
    },

    handleClick: function(component, event, helper) {
        var room = component.get('v.room');
        var navEvent = $A.get("e.force:navigateToSObject");
        navEvent.setParams({
            'recordId': room.Room__c
        });
        navEvent.fire();
    }
})