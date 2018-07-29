/**
 * Created by Mateusz on 2018-07-26.
 */

public with sharing class AttachmentController {
    @AuraEnabled
    public static void updatePicturePath(String recId) {
        ContentDocumentLink docLink = [SELECT ContentDocumentId
                                FROM ContentDocumentLink
                                WHERE LinkedEntityId = :recId ORDER BY Id DESC LIMIT 1];

        ContentVersion ver = [SELECT Id
                            FROM ContentVersion
                            WHERE ContentDocumentId = :docLink.ContentDocumentId];
//
//        Hotel__c hotel = [SELECT Id FROM Hotel__c WHERE Id = :recId];
//        hotel.Hotel_Picture_Path__c = '/sfc/servlet.shepherd/version/download/'+ ver.Id;
//        upsert hotel;
    }
}