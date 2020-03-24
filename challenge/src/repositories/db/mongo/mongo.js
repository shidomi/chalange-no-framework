const config = require('config');
const MongoDbClient = require('./driver/client');

class MongoDb {

    constructor() {
        this.mongoDbClient = new MongoDbClient(
            config.get('db.host'),
            config.get('db.port')
        );
    }

    async get(collectionName, query) {
        var result;
        result = await this.mongoDbClient.query(
            collectionName,
            query
        );

        return result;
    }

    async delete(collectionName, query) {
        var result;
        result = await this.mongoDbClient.query(
            collectionName,
            query
        );

        return result;
    }

    async create(collectionName, document) {
        this.mongoDbClient.insert(
            collectionName,
            document
        );
    }

}

module.exports = MongoDb