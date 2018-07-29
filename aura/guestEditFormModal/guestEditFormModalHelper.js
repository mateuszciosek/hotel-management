/**
 * Created by Mateusz on 2018-07-28.
 */
({
    getGuestData: function(component, IDCard) {
        var action = component.get('c.getGuestByIDCard');
        var guest = component.get('v.guest');

        action.setParam('IDCard', IDCard);

        action.setCallback(this, function(response) {
//            console.log(response.getReturnValue());
            var returnedValue = response.getReturnValue();
            if (returnedValue == null) {
                component.set('v.searchResult', true);
                setTimeout(function(){component.set('v.searchResult', false);}, 3000);
            } else {
                 var newGuest = response.getReturnValue();
                 var appEvent = $A.get("e.c:guestFormModalData");
                 newGuest['roomId'] = guest.roomId;
                 newGuest['index'] = guest.index;
                 appEvent.setParams({
                     'formFlag': false,
                     'guest': newGuest
                     });
                 appEvent.fire();
            }
        })

        $A.enqueueAction(action);
    }
})