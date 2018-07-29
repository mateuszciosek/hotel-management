/**
 * Created by Mateusz on 2018-07-25.
 */

@IsTest
private class ReceptionDeskControllerTest {
    static testMethod void testFulfillingIfNewGuests() {
        Datetime dateBegin = Datetime.now();
        Datetime dateEnd = Datetime.now().addDays(5);

        Reservation__c reservation = new Reservation__c(Reservation_Begin__c=dateBegin, Reservation_End__c=dateEnd);
        insert reservation;
        Reservation__c testReservation = new Reservation__c(Reservation_Begin__c=dateBegin, Reservation_End__c=dateEnd);
        insert testReservation;

        Hotel__c hotel = new Hotel__c(Name='Test Hotel');
        insert hotel;

        Room__c room = new Room__c(Name='1', Hotel__c=hotel.Id, Capacity__c='2');
        insert room;
        Room__c testRoom = new Room__c(Name='2', Hotel__c=hotel.Id, Capacity__c='2');
        insert testRoom;

        Reserved_Room__c reservedRoom = new Reserved_Room__c(Reservation__c=reservation.Id, Room__c=room.Id);
        insert reservedRoom;

        Reserved_Room__c testReservedRoom = new Reserved_Room__c(Reservation__c=testReservation.Id, Room__c=testRoom.Id);
        insert testReservedRoom;

        List<Guest__c> guests = new List<Guest__c> {
                new Guest__c(First_Name__c='John', Last_Name__c='Tester', ID_Card__c='YPO564880'),
                new Guest__c(First_Name__c='Huablo', Last_Name__c='Tester', ID_Card__c='JQP723896')
        };

        List<Guest__c> testGuests = new List<Guest__c> {
                new Guest__c(First_Name__c='Maria', Last_Name__c='Tester', ID_Card__c='YPO564882'),
                new Guest__c(First_Name__c='Kaleb', Last_Name__c='Tester', ID_Card__c='JQP723897')
        };

        upsert guests;

        List<Registered_Guest__c> registeredGuests = new List<Registered_Guest__c> {
                new Registered_Guest__c(Guest__c=guests[0].Id, Reservation__c=reservation.Id),
                new Registered_Guest__c(Guest__c=guests[1].Id, Reservation__c=reservation.Id)
        };

        insert registeredGuests;

        List<Registered_Guest__c> testRegisteredGuests = new List<Registered_Guest__c> {
                new Registered_Guest__c(Reservation__c=testReservation.Id),
                new Registered_Guest__c(Reservation__c=reservation.Id)
        };

        List<String> reservationInfo = new List<String> {reservation.Id, reservation.Name};

        Test.startTest();
        List<String> expected = ReceptionDeskController.fulfillReservation(testGuests, testRegisteredGuests);
        Test.stopTest();

        System.assertEquals(reservationInfo.size(), expected.size(), 'Not equal :/');
    }
}