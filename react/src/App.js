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
    // 
    <div className="App">
      <div className='container'>
        <div className='col-md-12 my-3'>
          <div className='col-md-6 my-3'>
            <textarea rows="3" value={description} placeholder="Tell me your dream"
              onChange={e => setDescription(e.target.value)}
              className="form-control dream-description"
            ></textarea>
          </div>
          <div className='col-md-6 my-3'>
            <button onClick={submitDescription} className='btn btn-success submit-button'>{submitStatus}</button>
          </div>
        </div>
        <span className="response">
          {responseAnalysis}
        </span>
      </div>

    </div>
  );
}

export default App;