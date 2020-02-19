const express = require('express');
let server = express();
const path = require('path');

server.use('/', express.static(__dirname + '/public'));

server.get('*', (request, response) => {
    return response.sendFile(path.join(__dirname, '/public/index.html'));
})

const port = 8080;

server.listen(port);

console.log(`Server is running on port: ${port}`);