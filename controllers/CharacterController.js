'use strict';

const response = require('../utils/response');
const CharacterService = require('../services/CharacterService');

// Helper function to filter character keys for list responses
const filterCharacterKeys = (character) => ({
    name: character.name,
    picture: character.picture,
    region: character.region,
    element: character.element
});

exports.index = async (req, res) => {
    const query = req.query;

    const filters = {};
    if (query.element) filters.element = query.element;
    if (query.weapon) filters.weapon = query.weapon;
    if (query.region) filters.region = query.region;
    if (query.quality) filters.quality = query.quality;

    const characters = CharacterService.getAll(filters);

    response.success(res, {
        count: characters.length,
        characters
    });
};

exports.show = async (req, res) => {
    const name = req.params.name;

    const character = CharacterService.getByName(name);

    if (!character) {
        return response.failed(res, `Character "${name}" not found`);
    }

    response.success(res, { character });
};

exports.random = async (req, res) => {
    const count = parseInt(req.query.count) || 1;

    const characters = CharacterService.getRandom(count);

    response.success(res, {
        count: Array.isArray(characters) ? characters.length : 1,
        characters
    });
};

exports.search = async (req, res) => {
    const keyword = req.query.keyword;

    if (!keyword) {
        return response.failed(res, 'Keyword is required');
    }

    const characters = CharacterService.search(keyword);

    response.success(res, {
        count: characters.length,
        characters
    });
};

exports.elements = async (req, res) => {
    const elements = CharacterService.getElements();
    response.success(res, { elements });
};

exports.weapons = async (req, res) => {
    const weapons = CharacterService.getWeapons();
    response.success(res, { weapons });
};

exports.regions = async (req, res) => {
    const regions = CharacterService.getRegions();
    response.success(res, { regions });
};
