'use strict';

const fs = require('fs');
const path = require('path');

let characters = null;

const loadCharacters = () => {
    if (characters) return characters;

    const filePath = path.join(__basedir, 'assets', 'characters.json');
    const data = fs.readFileSync(filePath, 'utf8');
    characters = JSON.parse(data);

    return characters;
};

exports.getAll = (filters = {}) => {
    let data = loadCharacters();

    if (filters.element) {
        data = data.filter(char =>
            char.element.toLowerCase() === filters.element.toLowerCase()
        );
    }

    if (filters.weapon) {
        data = data.filter(char =>
            char.weapon.toLowerCase() === filters.weapon.toLowerCase()
        );
    }

    if (filters.region) {
        data = data.filter(char =>
            char.region.toLowerCase() === filters.region.toLowerCase()
        );
    }

    if (filters.quality) {
        data = data.filter(char =>
            char.quality.toLowerCase().includes(filters.quality.toLowerCase())
        );
    }

    return data;
};

exports.getByName = (name) => {
    const data = loadCharacters();

    return data.find(char =>
        char.name.toLowerCase() === name.toLowerCase()
    );
};

exports.getRandom = (count = 1) => {
    const data = loadCharacters();
    const shuffled = [...data].sort(() => 0.5 - Math.random());

    return count === 1 ? shuffled[0] : shuffled.slice(0, count);
};

exports.search = (keyword) => {
    const data = loadCharacters();
    const lowerKeyword = keyword.toLowerCase();

    return data.filter(char => {
        return (
            char.name.toLowerCase().includes(lowerKeyword)
        );
    });
};

exports.getElements = () => {
    const data = loadCharacters();
    return [...new Set(data.map(char => char.element))];
};

exports.getWeapons = () => {
    const data = loadCharacters();
    return [...new Set(data.map(char => char.weapon))];
};

exports.getRegions = () => {
    const data = loadCharacters();
    return [...new Set(data.map(char => char.region))];
};
