'use strict';

const response = require('../utils/response');
const { sendMessages } = require('../utils/ollama');
const { buildCharacterNarrative } = require('../utils/chat');
const CharacterService = require('../services/CharacterService');

/**
 * Handle chat messages with Ollama AI
 * POST /chat
 * Body: { 
 *   messages: Array<{ role: 'user' | 'assistant', content: string }>,
 *   character?: string 
 * }
 */
exports.chat = async (req, res) => {
    const { messages: chatHistory, character: characterName } = req.body;

    if (!chatHistory || !Array.isArray(chatHistory) || chatHistory.length === 0) {
        return response.failed(res, 'Messages array is required');
    }

    let systemPrompt = `You are a friendly AI assistant knowledgeable about Genshin Impact.`;

    // If character name provided, get character data and build narrative
    if (characterName) {
        const character = CharacterService.getByName(characterName);

        if (!character) {
            return response.failed(res, `Character "${characterName}" not found`);
        }

        const narrative = buildCharacterNarrative(character);
        systemPrompt = `You are ${character.name} from Genshin Impact. Here is your character information:\n\n${narrative}\n\nRespond as this character would, using their personality and speech patterns. Stay in character at all times.`;
    }

    // Build messages array with system prompt + chat history
    const messages = [
        { role: 'system', content: systemPrompt },
        ...chatHistory
    ];

    try {
        const reply = await sendMessages(messages);

        response.success(res, {
            character: characterName || null,
            message: reply,
        });
    } catch (error) {
        console.error('Chat error:', error);
        response.failed(res, 'Failed to process chat message');
    }
};
