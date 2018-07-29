/**
 * Created by Mateusz on 2018-07-29.
 */
({
    handleUploadFinished: function(component, event, helper) {
        var uploadedFiles = event.getParam('files');

        var action = component.get('c.updatePicturePath');
        action.setParams({
            recId: component.get('v.recordId')
        });
        action.setCallback(this, function(response) {
            if (response.getState() === 'SUCCESS') {
                var resultToast = $A.get('e.force:showToast');
                resultToast.setParams({
                    'title': 'Success!',
                    'message': uploadedFiles.length + 'hotel pictures successfully uploaded'
                });
                resultToast.fire();
            }
        });
        $A.enqueueAction(action);
    }
})