/**
 * Created by Mateusz on 2018-07-17.
 */

public with sharing class ReceptionDeskController {
    @AuraEnabled
    public static List<Room__c> getAvailableRooms(Map<String, String> data, List<String> ignoredRooms) {
        List<Id> reservedRooms = new List<Id>();

        Datetime beginDate = (Datetime) JSON.deserialize('"'+data.get('begin')+'"', Datetime.class);
        Datetime endDate = (Datetime) JSON.deserialize('"'+data.get('end')+'"', Datetime.class);
        String capacity = data.get('capacity');

        List<Reserved_Room__c> reservationList = [SELECT Room__c
                FROM Reserved_Room__c
                WHERE Date_End__c > :beginDate
                AND Date_Begin__c < :endDate AND Room__r.Capacity__c = :capacity
                ];

        for (Reserved_Room__c item : reservationList) {
            reservedRooms.add(item.Room__c);
        }

        for (String roomId : ignoredRooms) {
            roomId = (Id) roomId;
            reservedRooms.add(roomId);
        }

        List<Room__c> foundRooms = [SELECT Name, Capacity__c, Price_per_Day__c, Hotel__r.Name
        FROM Room__c
        WHERE Id NOT IN :reservedRooms
        AND Capacity__c = :capacity
        ORDER BY Name ASC];

        if (foundRooms.size() > 0) {
            return foundRooms;
        } else {
            return null;
        }
    }

    @AuraEnabled
    public static Id temporallyBlockRooms(List<Room__c> roomsToReserve, Map<String, String> dates) {
        List<Reserved_Room__c> reservedRooms = new List<Reserved_Room__c>();

        Datetime beginDate = (Datetime) JSON.deserialize('"'+dates.get('begin')+'"', Datetime.class);
        Datetime endDate = (Datetime) JSON.deserialize('"'+dates.get('end')+'"', Datetime.class);

        Reservation__c reservation = new Reservation__c(Reservation_Begin__c=beginDate, Reservation_End__c=endDate);

        insert reservation;

        for (Room__c room : roomsToReserve) {
            Reserved_Room__c tempReservedRoom = new Reserved_Room__c(Room__c=room.Id, Reservation__c=reservation.Id);
            reservedRooms.add(tempReservedRoom);
        }

        insert reservedRooms;

        return reservation.Id;
    }

    @AuraEnabled
    public static String[] fulfillReservation(Guest__c[] guests, Registered_Guest__c[] registeredGuests) {

        for (Guest__c guest : guests) {
            upsert guest ID_Card__c;
        }

        for (Integer i=0; i<registeredGuests.size(); i++) {
            registeredGuests[i].Guest__c = guests[i].Id;
        }

        insert registeredGuests;

        Reservation__c reservation = [SELECT Id, Name FROM Reservation__c WHERE Id = :registeredGuests[0].Reservation__c];
        List<String> reservationInfo = new List<String> {reservation.Id, reservation.Name};

        return reservationInfo;
    }

    @AuraEnabled
    public static void cancelReservation(String reservationId) {
        Reservation__c reservationToDelete = [SELECT Id FROM Reservation__c WHERE Id= :reservationId];
        delete reservationToDelete;
    }

    @AuraEnabled
    public static Guest__c getGuestByIDCard(String IDCard) {
        Guest__c foundGuest = [SELECT Id, First_Name__c, Last_Name__c, ID_Card__c FROM Guest__c WHERE ID_Card__c= :IDCard LIMIT 1];
        if (foundGuest.Id != null){
            return foundGuest;
        } else {
            return null;
        }
    }
}