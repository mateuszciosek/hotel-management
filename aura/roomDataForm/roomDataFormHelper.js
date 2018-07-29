/**
 * Created by Mateusz on 2018-07-16.
 */
({
    proceedToSendData: function(component) {
        var beginDate = component.get('v.setDate');
        var endDate = component.find('endDate').get('v.value');
        var capacity = component.find('capacity').get('v.value');
        var ignoredRooms = component.get('v.ignoredRooms');
        var flagEvent = component.getEvent("updateFlag");

        var data = {
            "begin" : beginDate,
            "end" : endDate,
            "capacity" : capacity
        };
        this.sendData(component, data, ignoredRooms);

        flagEvent.setParams({"flag": true});
        flagEvent.fire();

        var datesEvent = $A.get("e.c:sendReservationDates");
        datesEvent.setParams({
            "begin": beginDate,
            "end": endDate
        })

        datesEvent.fire();
    },

    sendData: function(component, data, ignoredRooms) {
        var action = component.get("c.getAvailableRooms");

        action.setParams({
            "data": data,
            "ignoredRooms": ignoredRooms
            });

        action.setCallback(this, function(response) {
            var state = response.getState();

            if (state === 'SUCCESS') {
                if (response.getReturnValue() != null) {
                    var appEvent = $A.get("e.c:updateRoomsList");

                    appEvent.setParams({
                         "rooms": response.getReturnValue(),
                         "capacity": data.capacity
                         });
                    appEvent.fire();
                } else {
                    var appEvent = $A.get("e.c:updateRoomsList");
                    var rooms = [];

                    appEvent.setParams({
                        "rooms": rooms,
                        "capacity": data.capacity
                        })
                    appEvent.fire();
                }
            }
        });

        $A.enqueueAction(action);
    },
})