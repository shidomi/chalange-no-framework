
function buildResponse(response, res) {
    if (!response) {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        return;
    }

    res.writeHead(200, { 'Content-Type': 'application/json' })
    return response;
}

module.exports = buildResponse;