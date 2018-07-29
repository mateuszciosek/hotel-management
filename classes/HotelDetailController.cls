/**
 * Created by Mateusz on 2018-07-29.
 */

public with sharing class HotelDetailController {
    @AuraEnabled
    public static List<String> getImages(Id recId) {
        List<String> imagesIds = new List<String>();
        List<Id> docLinksIds = new List<Id>();

        List<ContentDocumentLink> docLinks = [SELECT ContentDocumentId
                                            FROM ContentDocumentLink
                                            WHERE LinkedEntityId = :recId
                                            ORDER BY Id];
        if (docLinks.size() > 0) {
            for (ContentDocumentLink docLink : docLinks) {
                docLinksIds.add(docLink.ContentDocumentId);
            }

            List<ContentVersion> versions = [SELECT Id
            FROM ContentVersion
            WHERE ContentDocumentId IN :docLinksIds];

            for (ContentVersion ver : versions) {
                imagesIds.add('/sfc/servlet.shepherd/version/download/' + ver.Id);
            }
        }

        if (imagesIds.size() > 0) {
            return imagesIds;
        } else {
            return null;
        }
    }
}