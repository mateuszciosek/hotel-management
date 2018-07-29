/**
 * Created by Mateusz on 2018-07-16.
 */
({
    checkDate : function(component, event, helper) {
        var beginDateField = component.find('beginDate');
        var beginDate = component.get('v.setDate');
        var endDateField = component.find('endDate');
        var endDate = endDateField.get('v.value');
        var capacity = component.find('capacity').get('v.value');
        var ignoredRooms = component.get('v.ignoredRooms');
        var previousBeginDate = component.get('v.previousBeginDate');
        var previousEndDate = component.get('v.previousEndDate');

        var myDate = new Date(beginDate);
        var myDate2 = new Date(endDate);

        if (myDate > myDate2) {
//            beginDateField.setCustomValidity("Beginning Date must be earlier than End Date!");
//            beginDateField.reportValidity();
              $A.util.addClass(beginDateField, 'red-border');
              component.set('v.resetError', true);
        } else {
            if (ignoredRooms.length > 0 && (previousBeginDate != beginDate || previousEndDate != endDate)) {
                component.set('v.resetReservedRooms', true);
            } else {
                helper.proceedToSendData(component);
            }
        }
    },

    addToIgnoredList: function(component, event, helper) {
        var reservedRoom = event.getParam('room');
        var ignoredRooms = component.get('v.ignoredRooms');

        ignoredRooms.push(reservedRoom.Id);
        component.set('v.ignoredRooms', ignoredRooms);
    },

    removeFromIgnored: function(component, event, helper) {
        var roomToUnignore = event.getParam('room');
        var ignoredRooms = component.get('v.ignoredRooms');

        for (let i=0; i<ignoredRooms.length; i++) {
            if (ignoredRooms[i] == roomToUnignore.Id) {
                ignoredRooms.splice(i, 1);
            }
        }
        component.set('v.ignoredRooms', ignoredRooms);
    },

    setPreviousReservationDates: function(component, event, helper) {
        component.set('v.previousBeginDate', event.getParam('begin'));
        component.set('v.previousEndDate', event.getParam('end'));
    },

    cancelBox: function(component, event, helper) {
        component.set('v.resetReservedRooms', false);
    },

    confirmBox: function(component, event, helper) {
        var beginDateField = component.find('beginDate');
        var removeEvent = $A.get("e.c:removeReservedRooms");

        component.set('v.ignoredRooms', []);

        removeEvent.setParam('flow', 'yes');
        removeEvent.fire();

        helper.proceedToSendData(component);
        $A.util.removeClass(beginDateField, 'red-border');
        component.set('v.resetError', false);
        component.set('v.resetReservedRooms', false);
    }
})