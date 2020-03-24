const BSON = require('bson');

class MongoDbOperations {

    createInsertProtocolMsg(connection, collectionName, document) {

        // Reference
        // https://docs.mongodb.com/manual/reference/mongodb-wire-protocol/

        // struct MsgHeader {
        //     int32   messageLength; // total message size, including this
        //     int32   requestID;     // identifier for this message
        //     int32   responseTo;    // requestID from the original request
        //                            //   (used in responses from db)
        //     int32   opCode;        // request type - see table below for details
        // }

        var header = new Buffer(16);
        header.writeInt32LE(0, 4);
        header.writeInt32LE(0, 8);
        header.writeInt32LE(2002, 12);

        // struct {
        //     MsgHeader header;             // standard message header
        //     int32     flags;              // bit vector - see below
        //     cstring   fullCollectionName; // "dbname.collectionname"
        //     document* documents;          // one or more documents to insert into the collection
        // }

        var buffers = [header];

        // flags
        var bufferFlag = new Buffer(4);
        bufferFlag.writeInt32LE(0, 0);
        buffers.push(bufferFlag);
        //

        // fullCollectionName
        var bufferCollectioName = new Buffer(collectionName.length + 1);
        bufferCollectioName.write(collectionName, 0);
        bufferCollectioName.writeInt8(0x00, collectionName.length);
        buffers.push(bufferCollectioName);
        //

        // documents
        var bufferDoc = BSON.serialize(document, false, true, false)
        buffers.push(bufferDoc);
        //

        var bufferFinal = Buffer.concat(buffers);
        bufferFinal.writeInt32LE(bufferFinal.byteLength, 0);

        connection.write(bufferFinal)
    }

    createQueryProtocolMsg(connection, collectionName, query) {

        // Reference
        // https://docs.mongodb.com/manual/reference/mongodb-wire-protocol/

        // struct MsgHeader {
        //     int32   messageLength; // total message size, including this
        //     int32   requestID;     // identifier for this message
        //     int32   responseTo;    // requestID from the original request
        //                            //   (used in responses from db)
        //     int32   opCode;        // request type - see table below for details
        // }

        var header = new Buffer(16);
        header.writeInt32LE(0, 4);
        header.writeInt32LE(0, 8);
        header.writeInt32LE(2004, 12);

        // struct OP_QUERY {
        //     MsgHeader header;                 // standard message header
        //     int32     flags;                  // bit vector of query options.  See below for details.
        //     cstring   fullCollectionName ;    // "dbname.collectionname"
        //     int32     numberToSkip;           // number of documents to skip
        //     int32     numberToReturn;         // number of documents to return
        //                                       //  in the first OP_REPLY batch
        //     document  query;                  // query object.  See below for details.
        //   [ document  returnFieldsSelector; ] // Optional. Selector indicating the fields
        //                                       //  to return.  See below for details.
        // }

        var buffers = [header];

        // flags
        var bufferFlag = new Buffer(4);
        bufferFlag.writeInt32LE(0, 0);
        buffers.push(bufferFlag);
        //

        // fullCollectionName
        var bufferCollectioName = new Buffer(collectionName.length + 1);
        bufferCollectioName.write(collectionName, 0);
        bufferCollectioName.writeInt8(0x00, collectionName.length);
        buffers.push(bufferCollectioName);
        //

        // numberToSkip
        var buffernumberToSkip = new Buffer(4);
        buffernumberToSkip.writeInt32LE(0, 0);
        buffers.push(buffernumberToSkip);
        //

        // numberToReturn
        var buffernumberToReturn = new Buffer(4);
        buffernumberToReturn.writeInt32LE(100, 0);
        buffers.push(buffernumberToReturn);
        //

        // query
        var bufferDoc = BSON.serialize(query, false, true, false)
        buffers.push(bufferDoc);
        //

        // returnFieldsSelector
        var bufferDoc = BSON.serialize({}, false, true, false)
        buffers.push(bufferDoc);
        //

        var bufferFinal = Buffer.concat(buffers);
        bufferFinal.writeInt32LE(bufferFinal.byteLength, 0);

        connection.write(bufferFinal);
    }

}

module.exports = MongoDbOperations
