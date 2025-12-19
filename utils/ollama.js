'use strict';

const API_URL = "https://api.groq.com/openai/v1/chat/completions";
const API_MODEL = process.env.GROQ_MODEL;

let API_KEY = process.env.GROQ_API_KEY;
let API_NAME = "GROQ_API_KEY";
let TOO_MANY_REQUESTS = false;

/**
 * Send chat messages to Ollama API.
 * @param {Array} messages - Array of messages (system + user)
 * @returns {Promise<string>} The assistant's response content
 */
async function sendMessages(messages) {
    try {
        const response = await sendMessagesToGroq(messages);

        if (response.status == 429 && !TOO_MANY_REQUESTS) {
            manageApiKeys();
            return await sendMessages(messages);
        }

        const responseData = await response.json();

        return responseData.choices[0].message.content || "No response content found.";
    } catch (error) {
        console.error("Error calling Ollama API:", error);
        return `Oops! Something went wrong while talking to me.`;
    }
}

async function sendMessagesToGroq(messages) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + API_KEY
        },
        body: JSON.stringify({
            model: API_MODEL,
            messages,
            stream: false,
        }),
    });

    logging(response);

    return response;
}

function manageApiKeys() {
    if (API_KEY == process.env.GROQ_API_KEY) {
        API_NAME = "GROQ_API_KEY_ALTERNATIVE_1";
        API_KEY = process.env.GROQ_API_KEY_ALTERNATIVE_1;
    } else if (API_KEY == process.env.GROQ_API_KEY_ALTERNATIVE_1) {
        API_NAME = "GROQ_API_KEY_ALTERNATIVE_2";
        API_KEY = process.env.GROQ_API_KEY_ALTERNATIVE_2;
    } else if (API_KEY == process.env.GROQ_API_KEY_ALTERNATIVE_2) {
        API_NAME = "GROQ_API_KEY_ALTERNATIVE_3";
        API_KEY = process.env.GROQ_API_KEY_ALTERNATIVE_3;
    } else {
        API_NAME = "GROQ_API_KEY";
        API_KEY = process.env.GROQ_API_KEY;
        TOO_MANY_REQUESTS = true;
    }
}

function logging(response) {
    console.log("========================== BEGIN ==========================");
    console.log("API KEY: " + API_KEY);
    console.log("API NAME: " + API_NAME);
    console.log("API MODEL: " + API_MODEL);
    console.log("API TOO MANY REQUESTS: " + TOO_MANY_REQUESTS);
    console.log("API RESPONSE STATUS: " + response.status);
    console.log("========================== END ============================");
}

module.exports = { sendMessages };