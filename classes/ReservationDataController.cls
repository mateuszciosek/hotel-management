/**
 * Created by Mateusz on 2018-07-20.
 */

public with sharing class ReservationDataController {
    @AuraEnabled
    public static Map<String, List<Object>> getReservationData(String reservationId) {
        List<Reserved_Room__c> reservedRooms = [SELECT Room__c, Room_Number__c, Hotel_Name__c
                                                FROM Reserved_Room__c
                                                WHERE Reservation__c = :reservationId];
        List<Registered_Guest__c> registeredGuests = [SELECT First_Name__c, Last_Name__c, Room__c
                                                FROM Registered_Guest__c
                                                WHERE Reservation__c = :reservationId];

        Map<String, List<Object>> reservationInfo = new Map<String, List<Object>>();

        reservationInfo.put('reservedRooms', reservedRooms);
        reservationInfo.put('registeredGuests', registeredGuests);

        return reservationInfo;
    }
}
//Map<String, List<Object>>