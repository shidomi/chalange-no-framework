const net = require('net');
const MongoDbOperations = require('./operations');
const BSON = require('bson');

class MongoDbClient {

    constructor(host, port) {
        const options = {
            "family": 0,
            "host": host,
            "port": port,
            "rejectUnauthorized": false
        }
        this.connection = net.createConnection(options);
        this.mongoDbOperations = new MongoDbOperations();

        this.result;
        this.connection.on('data', chunk => {
            try {
                this.result = this.read(chunk);
            } catch (error) {
                this.result = undefined;
            }
        });
    }

    async query(collectionName, query) {
        this.mongoDbOperations.createQueryProtocolMsg(
            this.connection,
            collectionName,
            query
        );

        var count = 0;
        do {
            await new Promise(resolve => {
                setTimeout(() => {
                    resolve({ data: 1 });
                }, 200);
            });
            count++

        } while (count == 5);

        return this.result;
    }

    async insert(collectionName, document) {
        this.mongoDbOperations.createInsertProtocolMsg(
            this.connection,
            collectionName,
            document
        );
    }

    read(data) {
        var length = data.readInt32LE(0);
        var isArray = false
        var index = 16;

        // { "flags": "int32", "cursorID": "int64", 
        // "startingFrom": "int32", "numberReturned": "int32",
        //  "documents": ["BSON"] }

        // flags
        data.readInt32LE(index);
        index += 4;
        //

        // cursorID
        var ptr = [];
        do {
            ptr.push(data.slice(index, index + 8));
            index += 8;
        } while (isArray && index + offset < length);
        // 

        // startingFrom
        xxx = data.readInt32LE(index);
        index += 4;
        //

        //numberReturned
        xxx = data.readInt32LE(index);
        index += 4;
        //

        // documents
        var ptr = [];
        do {
            var size = data.readInt32LE(index);
            if (index + size > data.byteLength) {
                // ???
            }
            ptr.push(BSON.deserialize(data.slice(index, index + size)));
            index += size;
        } while (index + 0 < length);
        //

        return ptr;

    }
}

module.exports = MongoDbClient
