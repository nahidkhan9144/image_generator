const express = require('express');
require('dotenv').config();
const cors = require('cors');
// require('dotenv').config({ path: '/.env' });

const app = express();
app.use(express.json()); // To parse JSON bodies
app.use(cors());

app.get('/hi',(req,res)=>{
    return res.json("heelo");
});

app.post('/getAIResponse', async (req, res) => {
    // console.log(req.body);
    // return;
    try{
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
              }
            }
          );
      
          console.log('Response:', response.data);
        } catch (error) {
          console.error('Error:', error);
        }
      
});
// });
const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});