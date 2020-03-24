const MongoDb = require('../repositories/db/mongo/mongo');
const ProductBackend = require('../backend/ProductBackend');
const CustomerService = require('../service/CustomerService');

class WishlistService {

    constructor() {
        this.collectioName = 'test.wishlist'
        this.mongo = new MongoDb();
        this.productBackend = new ProductBackend();
        this.customerService = new CustomerService();
    }

    async getWishlist(customer_id) {
        const response = await this.mongo.get(
            this.collectioName,
            {
                "customer_id": customer_id
            }
        );

        if (!response) {
            return;
        }

        var newProducts = await this.getProducts(response[0].products_id);
        response[0].products_id = newProducts;
        return response;
    }

    async createWishlist(param) {
        const products = param.products_id;
        const customerId = await this.customerService.getCustomer(param.customer_id);

        if (!customerId) {
            return;
        }

        param.products_id = await this.getProducts(products);
        await this.mongo.create(this.collectioName, param);
    }

    async getProducts(products) {
        let newProducts = [];
        for (const value of products) {
            const pp = await this.productBackend.getProduct(value);
            if (pp) {
                newProducts.push(pp);
            }
        }
        return newProducts;
    }

}

module.exports = WishlistService
