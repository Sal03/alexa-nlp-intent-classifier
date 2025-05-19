const AWS = require('aws-sdk');

const s3SigV4Client = new AWS.S3({
    signatureVersion: 'v4',
    region: process.env.S3_PERSISTENCE_REGION
});

function keyGenerator(requestEnvelope) {
    if (requestEnvelope
        && requestEnvelope.context
        && requestEnvelope.context.System
        && requestEnvelope.context.System.application
        && requestEnvelope.context.System.application.applicationId) {
      return requestEnvelope.context.System.application.applicationId; 
    }
    throw 'Cannot retrieve app id from request envelope!';
}

module.exports = {
    getS3PreSignedUrl(s3ObjectKey) {
        const bucketName = process.env.S3_PERSISTENCE_BUCKET;
        const s3PreSignedUrl = s3SigV4Client.getSignedUrl('getObject', {
            Bucket: bucketName,
            Key: s3ObjectKey,
            Expires: 60*1 // the Expires is capped for 1 minute
        });
        console.log(`Util.s3PreSignedUrl: ${s3ObjectKey} URL ${s3PreSignedUrl}`);
        return s3PreSignedUrl;
    },
    getPersistenceAdapter() {
        function isAlexaHosted() {
            return process.env.S3_PERSISTENCE_BUCKET ? true : false;
        }
        var persistenceAdapter;
        if(isAlexaHosted()) {
            const {S3PersistenceAdapter} = require('ask-sdk-s3-persistence-adapter');
            persistenceAdapter = new S3PersistenceAdapter({ 
                bucketName: process.env.S3_PERSISTENCE_BUCKET,
                objectKeyGenerator: keyGenerator
            });
        } else {
            const {DynamoDbPersistenceAdapter} = require('ask-sdk-dynamodb-persistence-adapter');
            persistenceAdapter = new DynamoDbPersistenceAdapter({ 
                tableName: 'global_attr_table',
                createTable: true,
                partitionKeyGenerator: keyGenerator
            });
        }
        return persistenceAdapter;
    }
}

