/**
 * Created by Mateusz on 2018-07-17.
 */
({
    addReceivedRoom: function(component, event, handler) {
        var rooms = component.get('v.rooms');
        var receivedRoom = event.getParam('room');

        rooms.push(receivedRoom);

        component.set('v.rooms', rooms);
    },

    removeRoom: function(component, event, handler) {
        var rooms = component.get('v.rooms');
        var receivedRoom = event.getParam('room');

        for (let i=0; i<rooms.length; i++) {
            if (rooms[i].Id == receivedRoom.Id) {
                rooms.splice(i, 1);
            }
        }

        component.set('v.rooms', rooms);
    },

    setReservationDates: function(component, event, helper) {
        var beginDate = event.getParam('begin');
        var endDate = event.getParam('end');

        component.set('v.dates', {
            'begin': beginDate,
            'end': endDate
        })
    },

    makeReservation: function(component, event, helper) {
        var rooms = component.get('v.rooms');
        var dates = component.get('v.dates');

        if (rooms.length == 0) {
            console.log('Not possible to make reservation on no rooms')
        } else {
            helper.createReservation(component, rooms, dates);
            component.set('v.modalFlag', true);
        }
    },

     closeReservationModal: function(component, event, helper) {
        var modalFlag = event.getParam("modalFlag");
        var reservationId = component.get('v.reservationId');

        component.set("v.modalFlag", modalFlag);

        helper.cancelReservation(component, reservationId);
     },

     clearList: function(component, event, helper) {
         component.set('v.rooms', []);
     }
})