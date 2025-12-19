'use strict';

const BASE_URL = "https://api.groq.com/openai/v1/chat/completions";
const API_KEY = process.env.GROQ_API_KEY;
const MODEL = process.env.GROQ_MODEL || "meta-llama/llama-4-scout-17b-16e-instruct";

/**
 * Send chat messages to Ollama API.
 * @param {Array} messages - Array of messages (system + user)
 * @returns {Promise<string>} The assistant's response content
 */
async function sendOllamaChat(messages) {
    try {
        const response = await fetch(BASE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + API_KEY
            },
            body: JSON.stringify({
                model: MODEL,
                messages,
                stream: false,
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        return data.choices[0].message.content || "No response content found.";
    } catch (error) {
        console.error("Error calling Ollama API:", error);
        return `Oops! Something went wrong while talking to me.`;
    }
}

module.exports = { sendOllamaChat };