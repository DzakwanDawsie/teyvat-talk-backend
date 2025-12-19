'use strict';

const CharacterController = require('../controllers/CharacterController');
const ChatController = require('../controllers/ChatController');
const BaseController = require('../controllers/BaseController');

module.exports = function (app) {
    // Health check / API info
    app.get('/', BaseController.index);

    // Character endpoints
    app.get('/characters', CharacterController.index);
    app.get('/characters/random', CharacterController.random);
    app.get('/characters/search', CharacterController.search);
    app.get('/characters/:name', CharacterController.show);

    // Chat endpoint
    app.post('/chat', ChatController.chat);

    // Meta endpoints
    app.get('/meta/elements', CharacterController.elements);
    app.get('/meta/weapons', CharacterController.weapons);
    app.get('/meta/regions', CharacterController.regions);

    // 404 handler
    app.all('/*', BaseController.notFound);
};
