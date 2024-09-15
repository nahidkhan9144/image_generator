import './App.css';
// import './style.css';
import { useState } from 'react';

function App() {
  const [description, setDescription] = useState("");
  const [submitStatus, setSubmitStatus] = useState("Submit");
  const [responseAnalysis, setresponseAnalysis] = useState("");

  const responseGenerate = async (inputText) => {
    const prompt = {
      inputText: inputText
    }
    const result = await fetch("http://localhost:8000/getAIResponse", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(prompt)
    })

    if (result.ok) {
      const airespond = await result.json(); // Parse the JSON response body
      setresponseAnalysis(airespond.analysis);
      setSubmitStatus("Submit");
    } else {
      setSubmitStatus("Retry");
    }
  };

  async function submitDescription() {
    setSubmitStatus("Waiting");
    responseGenerate(description);
  }
  return (
    <div className="App">
      <div className='container'>
      <div className='container'>
        <textarea rows="3"
            value={description}
            placeholder="Tell me your dream" 
            onChange={e => setDescription(e.target.value)}
            className="dream-description"
        ></textarea>
        <button onClick={submitDescription} className='submit-button'>{submitStatus}</button>
        <span className="response">
          {responseAnalysis}
        </span>
      </div>
      </div>
      
    </div>
  );
}

export default App;