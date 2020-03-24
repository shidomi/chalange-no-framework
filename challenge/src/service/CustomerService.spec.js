const sinon = require('sinon');

const MongoDb = require('../repositories/db/mongo/mongo');
const CustomerService = require('./CustomerService');

describe('CustomerService', () => {

    const customerService = new CustomerService();

    beforeEach(async () => {
        sinon.restore();
    });

    describe('on getCustomer', () => {
        it('should return mongo object', async () => {

            const mongoGetResponse = [
                {
                    "id": "3",
                    "name": "test",
                    "email": "nice@gmail.com"
                }
            ];

            sinon.stub(MongoDb.prototype, 'get')
                .returns(mongoGetResponse);

            const result = await customerService.getCustomer(1);
            expect(result).toEqual(mongoGetResponse);
        })
    });

    describe('on listCustomers', () => {
        it('should return mongo list object', async () => {

            const mongoGetResponse = [
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
            ];

            sinon.stub(MongoDb.prototype, 'get')
                .returns(mongoGetResponse);

            const result = await customerService.listCustomers();
            expect(result).toEqual(mongoGetResponse);
        })
    });

    describe('on createCustomer', () => {
        it('should return undefined object', async () => {

            sinon.stub(MongoDb.prototype, 'create')
                .returns(undefined);

            const result = await customerService.createCustomer({
                "id": "4",
                "name": "test",
                "email": "nice@gmail.com"
            });
            expect(result).toEqual(undefined);
        })
    });
});
