/**
 * Created by Mateusz on 2018-07-16.
 */
({
    handleRoomUpdate: function(component, event, handler) {
        var updatedRooms = event.getParam("rooms");
        var currentCapacity = event.getParam("capacity");

        component.set("v.rooms", updatedRooms);
        component.set("v.currentCapacity", currentCapacity);
    },

    removeSelectedRoom: function(component, event, handler) {
        var selectedRoom = event.getParam('room');
        var currentRooms = component.get('v.rooms');

        for (let i=0; i<currentRooms.length; i++) {
            if (currentRooms[i].Id == selectedRoom.Id) {
                currentRooms.splice(i, 1);
            }
        }

        component.set('v.rooms', currentRooms);
    },

    addRoomFromReservation: function(component, event, helper) {
        var receivedRoom = event.getParam('room');
        var currentCapacity = component.get('v.currentCapacity');
        var currentRooms = component.get('v.rooms');

//        console.log(receivedRoom.Capacity__c);

        if (receivedRoom.Capacity__c == currentCapacity) {
            currentRooms.push(receivedRoom);
        }

        console.log(component.get('v.currentCapacity'));

        component.set('v.rooms', currentRooms);
    },
})