const {OpenAI, default: OpenAI} = require("openai")

const OpenAI = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})