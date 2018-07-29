/**
 * Created by Mateusz on 2018-07-14.
 */
({
    handleFlagUpdate: function(component, event, handler) {
        var updatedFlag = event.getParam("flag");
        component.set("v.flag", updatedFlag);
    },

    clearAll: function(component, event, helper) {
        component.rerender();
//        component.set('v.roomsFlag', false);
    }
})