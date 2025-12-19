'use strict';

/**
 * Convert character object into narrative-style system prompt.
 * @param {Object} character - Character object from CharacterService
 * @returns {string} Formatted narrative string
 */
function buildCharacterNarrative(character) {
    const MAX_CHAR = 3000;
    const result = [];

    for (const [key, value] of Object.entries(character)) {
        if (value == null || key === "picture") continue;
        let val = String(value).trim().replace(/\n+/g, " ");
        if (val.length > MAX_CHAR) val = val.slice(0, MAX_CHAR) + "...";
        result.push(`${capitalizeKey(key)}: ${val}`);
    }

    return result.join("\n\n");
}

function capitalizeKey(key) {
    return key
        .replace(/_/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
}

module.exports = { buildCharacterNarrative };