const http = require('http');
const buildResponse = require('./src/commons/response');
const CustomerController = require('./src/controllers/CustomerController');
const WishlistController = require('./src/controllers/WishlistController');

customerController = new CustomerController();
wishlistController = new WishlistController();


const server = http.createServer();
server.on('request', async (req, res) => {

    var responseBody

    if (req.method == 'GET') {
        if (req.url.includes('/customer/') && req.url.includes('id=')) {
            const id = req.url.split('=')[1]
            responseBody = buildResponse(await customerController.get(id), res);
        }

        if (req.url == '/customer/list/') {
            responseBody = buildResponse(await customerController.list(), res);
        }

        if (req.url.includes('/wishlist/') && req.url.includes('customer_id=')) {
            const id = req.url.split('=')[1]
            responseBody = buildResponse(await wishlistController.get(id), res);
        }
    }

    if (req.method == 'POST') {

        var body = ''
        req.on('data', function (data) {
            body += data
        })
        req.on('end', async function () {

            if (req.url == '/customer/') {
                buildResponse(await customerController.create(JSON.parse(body)), res);
            }

            if (req.url == '/wishlist/') {
                responseBody = buildResponse(await wishlistController.create(JSON.parse(body)), res);
            }

        })
    }

    res.end(JSON.stringify(responseBody));
});


server.listen(8080);
