/**
 * Created by Mateusz on 2018-07-17.
 */
({
    removeFromReservedList: function(component, event, handler) {
        var roomToDelete = component.get('v.room');

        var sendEvent = $A.get("e.c:sendRemovedRoom");
        sendEvent.setParam("room", roomToDelete);

        sendEvent.fire();
    }
})