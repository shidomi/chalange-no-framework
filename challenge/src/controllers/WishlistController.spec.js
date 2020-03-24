const sinon = require('sinon');

const WishlistService = require('../service/WishlistService');
const WishlistController = require('./WishlistController');

describe('WishlistController', () => {

    const wishlistController = new WishlistController();

    beforeEach(async () => {
        sinon.restore();
    });

    describe('on get', () => {
        it('should return wishlist object', async () => {

            const wishlistServieResponse = [
                {
                    "customer_id": "1",
                    "products_id": [
                        {
                            "price": 1699,
                            "image": "http://challenge-api.luizalabs.com/images/1bf0f365-fbdd-4e21-9786-da459d78dd1f.jpg",
                            "brand": "bébé confort",
                            "id": "1bf0f365-fbdd-4e21-9786-da459d78dd1f",
                            "title": "Cadeira para Auto Iseos Bébé Confort Earth Brown"
                        }
                    ]
                }
            ]

            sinon.stub(WishlistService.prototype, 'getWishlist')
                .returns(wishlistServieResponse);

            const result = await wishlistController.get(1);
            expect(result).toEqual(wishlistServieResponse);
        })
    });

    describe('on create', () => {
        it('should return undefined object', async () => {

            sinon.stub(WishlistService.prototype, 'createWishlist')
                .returns(undefined);

            const result = await wishlistController.get(1);
            expect(result).toEqual(undefined);
        })
    });
});
