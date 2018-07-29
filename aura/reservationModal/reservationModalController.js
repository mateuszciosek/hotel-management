/**
 * Created by Mateusz on 2018-07-19.
 */
({
    prepareEnteredData: function(component, event, helper) {
        var enteredData = component.get('v.enteredData');
        var rooms = component.get('v.rooms');

        enteredData = {};

        for (let i=0; i<rooms.length; i++) {
            var roomId = rooms[i].Id;

            var guestArray = [];

            for (let j=0; j<parseInt(rooms[i].Capacity__c); j++) {
                guestArray.push({});
            }

            enteredData[roomId] = guestArray;
        }

        component.set('v.enteredData', enteredData);
    },

    setRequiredData: function(component, event, helper) {
        var enteredData = component.get('v.enteredData');
        var guests = component.get('v.guests');
        var rooms = component.get('v.rooms');

        var receivedGuest = event.getParam('guest');

        enteredData[receivedGuest.roomId][receivedGuest.index] = {
            'sobjectType': 'Guest__c',
            'First_Name__c': receivedGuest.First_Name__c,
            'Last_Name__c': receivedGuest.Last_Name__c,
            'ID_Card__c': receivedGuest.ID_Card__c
        };
    },

    makeCompleteReservation: function(component, event, helper) {
        var guests = [];
        var registeredGuests = [];
        var enteredData = component.get('v.enteredData');
        var reservationId = component.get('v.reservationId');
        var stopProceedingToHelper = true;

        for (var room in enteredData) {
            for (let i=0; i<enteredData[room].length; i++) {
                if (Object.keys(enteredData[room][i]).length === 0 || enteredData[room][i].First_Name__c === '' || enteredData[room][i].Last_Name__c === '' || enteredData[room][i].ID_Card__c === '') {
                    stopProceedingToHelper = false;
                    break;
                }
                guests.push(enteredData[room][i]);

                registeredGuests.push({
                        'sobjectType': 'Registered_Guest__c',
                        'Reservation__c': reservationId,
                        'Room__c': room
                })
            };
        }

        if (stopProceedingToHelper) {
            helper.fulfillReservation(component, guests, registeredGuests);
        } else {
            component.set('v.notAllGuestsFilled', true);
        }

    },

    cancelReservation: function(component, event, helper) {
        component.set('v.cancelFlag', true);
    },

    cancelModal: function(component, event, helper) {
        var appEvent = $A.get("e.c:closeReservationModal");

        appEvent.setParam('modalFlag', false);
        appEvent.fire();

        component.set('v.cancelFlag', false);
    },

    abortCancel: function(component, event, helper) {
        component.set('v.cancelFlag', false);
    },

    handleClick: function(component, event, helper) {
        var reservationId = component.get('v.reservationId');
        var navEvent = $A.get("e.force:navigateToSObject");

        navEvent.setParams({
            'recordId': reservationId
        });
        navEvent.fire();
    }
})