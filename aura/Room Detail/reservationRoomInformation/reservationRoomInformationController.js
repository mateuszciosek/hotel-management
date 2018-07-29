/**
 * Created by Mateusz on 2018-07-20.
 */
({
    setReservationData: function(component, event, helper) {
        var reservationId = component.get('v.recordId');

        helper.receiveReservationData(component, reservationId);
    }
})