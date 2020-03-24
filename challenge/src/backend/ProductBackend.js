const config = require('config');
const request = require('request-promise-native');

class ProductBackend {

    constructor() {
        this.url = config.get('productBackend.host');
    }

    async getProduct(productId) {
        const url = this.url + productId;
        try {
            const response = await this.timeout(
                request(url),
                3000
            );

            if (!response) {
                return;
            }

            return JSON.parse(response);

        } catch (error) {
            console.log(`Error on ${error}`);
            return;
        }
    }

    timeout(promise, milliseconds, errorType) {
        const message = `Timed out in ${milliseconds} ms.`;
        const timeout = new Promise((resolve, reject) => {
            const id = setTimeout(() => {
                clearTimeout(id);
                if (errorType == 'RequestError') {
                    reject(new RequestError(message));
                } else {
                    reject(new Error(message));
                }
            }, milliseconds);
        });

        return Promise.race([
            promise,
            timeout
        ]);
    }
}

module.exports = ProductBackend
