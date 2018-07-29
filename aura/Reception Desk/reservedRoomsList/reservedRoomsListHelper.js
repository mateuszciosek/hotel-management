/**
 * Created by Mateusz on 2018-07-18.
 */
({
    createReservation: function(component, rooms, dates) {
            var action = component.get("c.temporallyBlockRooms");

            action.setParams({
                'roomsToReserve': rooms,
                'dates': dates
            });

            action.setCallback(this, function(response) {
                var state = response.getState();

                if (state === 'SUCCESS') {
                    component.set('v.reservationId', response.getReturnValue());
                }
            })

            $A.enqueueAction(action);
    },

    cancelReservation: function(component, reservationId) {
        var action = component.get("c.cancelReservation");

        action.setParam('reservationId', reservationId);
        action.setCallback(this, function(response) {})

        $A.enqueueAction(action);
    }
})