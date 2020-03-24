const sinon = require('sinon');

const CustomerService = require('../service/CustomerService');
const CustomerController = require('./CustomerController');

describe('CustomerController', () => {

    const customerController = new CustomerController();

    beforeEach(async () => {
        sinon.restore();
    });

    describe('on get', () => {
        it('should return customer object', async () => {

            const customerServieResponse = [
                {
                    "id": "3",
                    "name": "test",
                    "email": "nice@gmail.com"
                }
            ]

            sinon.stub(CustomerService.prototype, 'getCustomer')
                .returns(customerServieResponse);

            const result = await customerController.get(1);
            expect(result).toEqual(customerServieResponse);
        })
    });

    describe('on list', () => {
        it('should list customer object', async () => {

            const customerServieResponse = [
                {
                    "id": "1",
                    "name": "test",
                    "email": "nice@gmail.com"
                },
                {
                    "id": "2",
                    "name": "test",
                    "email": "nice@gmail.com"
                },
                {
                    "id": "3",
                    "name": "test",
                    "email": "nice@gmail.com"
                },
                {
                    "id": "4",
                    "name": "test",
                    "email": "nice@gmail.com"
                }
            ]

            sinon.stub(CustomerService.prototype, 'listCustomers')
                .returns(customerServieResponse);

            const result = await customerController.list();
            expect(result).toEqual(customerServieResponse);
        })
    });

    describe('on create', () => {
        it('should return undefined object', async () => {

            sinon.stub(CustomerService.prototype, 'createCustomer')
                .returns(undefined);

            const result = await customerController.create();
            expect(result).toEqual(undefined);
        })
    });
});
