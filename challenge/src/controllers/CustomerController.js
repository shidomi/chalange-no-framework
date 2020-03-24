const CustomerService = require('../service/CustomerService');

class CustomerController {

    constructor() {
        this.customerService = new CustomerService()
    }

    async get(id) {
        return await this.customerService.getCustomer(id);
    }

    async list() {
        return await this.customerService.listCustomers();
    }

    async create(param) {
        return await this.customerService.createCustomer(param);
    }
}

module.exports = CustomerController
