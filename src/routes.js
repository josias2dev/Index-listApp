const express = require('express');
const crypto = require('crypto'); 

const connection = require('./database/connection');
const { Console } = require('console');

const routes = express.Router();

routes.post('/new', async (request, response) => {
    console.log(request.body);
    const { product, price, quantity, amount } = request.body;

    const id = crypto.randomBytes(4).toString('HEX');

 await connection('list').insert({
    id,
    product,
    price,
    quantity,
    amount,
});

    return response.json();
});

module.exports = routes;