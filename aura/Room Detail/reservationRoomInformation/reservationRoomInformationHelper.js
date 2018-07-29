/**
 * Created by Mateusz on 2018-07-20.
 */
({
    receiveReservationData: function(component, reservationId) {
        var action = component.get('c.getReservationData');

        action.setParam('reservationId', reservationId);

        action.setCallback(this, function(result) {
            var state = result.getState();
            if(state == 'SUCCESS') {
                component.set('v.guests', result.getReturnValue().registeredGuests);
                component.set('v.rooms', result.getReturnValue().reservedRooms);
            }
        })

        $A.enqueueAction(action);
    }
})