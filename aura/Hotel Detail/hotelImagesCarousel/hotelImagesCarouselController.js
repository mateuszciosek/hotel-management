/**
 * Created by Mateusz on 2018-07-29.
 */
({
    setImages: function(component, event, helper) {
        var recordId = component.get('v.recordId');
        var action = component.get('c.getImages');

        action.setParams({
            recId: recordId
        });
        action.setCallback(this, function(response) {
            if (response.getState() === 'SUCCESS' && response.getReturnValue() != null) {
                component.set('v.imagesLinks', response.getReturnValue());
                component.set('v.imagesFound', true);
            }
        });

        $A.enqueueAction(action);
    }
})