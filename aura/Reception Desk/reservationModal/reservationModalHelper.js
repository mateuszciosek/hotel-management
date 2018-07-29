/**
 * Created by Mateusz on 2018-07-19.
 */
({
    fulfillReservation: function(component, guests, registeredGuests) {
        var action = component.get('c.fulfillReservation');

        action.setParams({
            'guests': guests,
            'registeredGuests': registeredGuests
        });

        action.setCallback(this, function(response) {
            var state = response.getState();
            var toastEvent = $A.get("e.force:showToast");
            var navEvt = $A.get("e.force:navigateToSObject");

            if (state === 'SUCCESS') {

                toastEvent.setParams({
                    "title": "Success!",
                    "message": "New reservation was successfully created!"
                });
                toastEvent.fire();

                navEvt.setParams({
                  "recordId": response.getReturnValue()[0],
                  "slideDevName": "related"
                });
                navEvt.fire();
            }
        });

        $A.enqueueAction(action);
    }
})