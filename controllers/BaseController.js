'use strict';

const response = require('../utils/response');

exports.index = async (req, res) => {
    response.success(res, {
        name: 'Genshin Character API',
        version: '1.0.0',
        endpoints: [
            'GET /characters - List all characters',
            'GET /characters/random - Get random character',
            'GET /characters/search?keyword= - Search characters',
            'GET /characters/:name - Get character by name',
            'GET /meta/elements - List all elements',
            'GET /meta/weapons - List all weapons',
            'GET /meta/regions - List all regions'
        ]
    });
};

exports.notFound = async (req, res) => {
    response.failed(res, 'Endpoint not found');
};
