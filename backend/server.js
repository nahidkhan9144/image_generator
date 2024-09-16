const express = require('express');
require('dotenv').config();
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(express.json()); // To parse JSON bodies
app.use(cors());

// Test endpoint
app.get('/hi', (req, res) => {
    return res.json("hello");
});

// Endpoint to get AI response
app.post('/getAIResponse', async (req, res) => {
    console.log('Request received:', new Date().toISOString());
    try {
        const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-4',
                messages: [
                    {
                        role: 'system',
                        content: 'You are a helpful assistant.'
                    },
                    {
                        role: 'user',
                        content: 'Hello!'
                    }
                ]
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${OPENAI_API_KEY}`
                },
                timeout: 30000 // Timeout after 30 seconds
            }
        );

        console.log('Response received:', new Date().toISOString());
        return res.json(response.data);
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'An error occurred while fetching AI response.' });
    }
});

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
