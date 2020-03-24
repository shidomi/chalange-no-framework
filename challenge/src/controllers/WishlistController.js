const WishlistService = require('../service/WishlistService');

class WishlistController {

    constructor() {
        this.wishlistService = new WishlistService()
    }

    async get(id) {
        return await this.wishlistService.getWishlist(id);
    }

    async create(param) {
        return await this.wishlistService.createWishlist(param);
    }

}

module.exports = WishlistController
