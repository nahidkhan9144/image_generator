const express = require('express');
const { OpenAI } = require('openai');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json()); // To parse JSON bodies
app.use(cors());

app.post('/getAIResponse', async (req, res) => {
    try {
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY
        });

        const inputText = req.body.inputText;

        const completion = await openai.chat.completions.create({
            model: "gpt-4-0125-preview",
            messages: [
                { "role": "system", "content": "You are an assistant helping users analyze their dreams. The user will provide a description of the dream, and you will help them analyze it. The response should be in paragraph format, avoiding any markdown symbols." },
                { "role": "user", "content": `Write an analysis based on the description of my dream: "${inputText}"` }
            ]
        });

        const response = await openai.images.generate({
            model: "dall-e-3",
            prompt: `Generate a beautiful, fantastical image visualizing the dream: "${inputText}"`,
            size: "1024x1024",
            quality: "standard",
            n: 1,
        });

        res.json({ imageURL: response.data[0].url, analysis: completion.choices[0].message.content });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
