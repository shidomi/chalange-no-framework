const nock = require('nock');
const sinon = require('sinon');

const MongoDb = require('../repositories/db/mongo/mongo');
const WishlistService = require('../service/WishlistService');


describe('WishlistService', () => {

    const wishlistService = new WishlistService();

    beforeEach(async () => {
        sinon.restore();
    });

    describe('on getCustomer', () => {
        it('should return mongo object', async () => {

            const mongoGetResponse = [
                {
                    "_id": "5e77e5560f7dd989bf8aa42c",
                    "id": "1",
                    "name": "test",
                    "email": "nice@gmail.com"
                }
            ]

            sinon.stub(MongoDb.prototype, 'get')
                .returns(mongoGetResponse);

            const getProductsResponse = [
                {
                    "price": 1699,
                    "image": "http://challenge-api.luizalabs.com/images/1bf0f365-fbdd-4e21-9786-da459d78dd1f.jpg",
                    "brand": "bébé confort",
                    "id": "1bf0f365-fbdd-4e21-9786-da459d78dd1f",
                    "title": "Cadeira para Auto Iseos Bébé Confort Earth Brown"
                }
            ]

            sinon.stub(WishlistService.prototype, 'getProducts')
                .returns(getProductsResponse);

            const result = await wishlistService.getWishlist(1);
            expect(result[0].id).toEqual(mongoGetResponse[0].id);
        })
    });

    describe('on createWishlist', () => {
        it('should return mongo object', async () => {

            const mongoGetResponse = [
                {
                    "_id": "5e77e5560f7dd989bf8aa42c",
                    "id": "1",
                    "name": "test",
                    "email": "nice@gmail.com"
                }
            ]

            sinon.stub(MongoDb.prototype, 'get')
                .returns(mongoGetResponse);

            const getProductsResponse = [
                {
                    "price": 1699,
                    "image": "http://challenge-api.luizalabs.com/images/1bf0f365-fbdd-4e21-9786-da459d78dd1f.jpg",
                    "brand": "bébé confort",
                    "id": "1bf0f365-fbdd-4e21-9786-da459d78dd1f",
                    "title": "Cadeira para Auto Iseos Bébé Confort Earth Brown"
                }
            ]

            sinon.stub(WishlistService.prototype, 'getProducts')
                .returns(getProductsResponse);

            const result = await wishlistService.createWishlist({});
            expect(result).toEqual(undefined);
        })
    });
});
