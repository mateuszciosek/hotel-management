/**
 * Created by Mateusz on 2018-07-16.
 */
({
    addRoomToReservation: function(component, event, handler) {
        var roomToSend = component.get('v.room');

        var sendEvent = $A.get("e.c:sendRoomAfterClick");
        sendEvent.setParam("room", roomToSend);

        sendEvent.fire();
    }
})