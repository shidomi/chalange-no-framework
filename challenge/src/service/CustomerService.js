const MongoDb = require('../repositories/db/mongo/mongo');

class CustomerService {

    constructor() {
        this.collectioName = 'test.customer'
        this.mongo = new MongoDb();
    }

    async getCustomer(id) {
        const response = await this.mongo.get(this.collectioName, { "id": id });
        if (response) {
            return response
        }
    }

    async listCustomers() {
        const response = await this.mongo.get(this.collectioName, {});
        if (response) {
            return response
        }
    }

    async createCustomer(param) {
        await this.mongo.create(this.collectioName, param);
    }

    async deleteCustomer(id) {
        const response = await this.mongo.get(this.collectioName, { "id": id });
        if (response) {
            return response
        }
    }
}

module.exports = CustomerService
