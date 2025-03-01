const openai = require('../config/openaiConfig');

// Using OpenAI's GPT-4o model to generate text responses
// https://platform.openai.com/docs/models/gpt-4o

const openaiResponse = async (msg) => {
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                    role: "user",
                    content: msg
                }
            ],
        });
        
        return completion.choices[0].message.content.trim();
    } catch (err) {
        console.error("Error fetching response:", err.response ? err.response.data : err.message);
        return "Error fetching response. Please try again!";
    }
}

module.exports = openaiResponse;
