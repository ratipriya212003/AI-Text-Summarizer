import React, { useState } from 'react';
import './App.css';
import "./Page.css";
function App() {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading,setLoading]=useState(false);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = async () => {
    try {
       setLoading(true);
        const response = await fetch('https://ai-text-summarizer-backend.vercel.app/summarize', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text_to_summarize: text }), 
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! Status: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        setSummary(data.summary); 
        setLoading(false)
    } catch (error) {
        console.error("Error submitting text for summarization:", error);
    }
  };

  const handleRefresh=()=>{
setText("");
setSummary("");
  }

  return (
    <div className="App">
      <h1>AI Text Summarizer</h1>
      <p>
        Welcome to the AI Text Summarizer App! Harness the power of artificial
        intelligence APIs to provide concise summaries of long texts. Whether you
        have a lengthy article, research paper, or any other text document that
        you want to summarize quickly, our app can assist you.
      </p>
      <p>
        Simply paste your text into the text area below and click the "Submit"
        button.
      </p>
      <div className="container">
        <div className="text-box">
          <textarea
            id="text_to_summarize"
            name="text_to_summarize"
            placeholder="Enter your text here to summarize"
            value={text}
            onChange={handleTextChange}
          />
          <button id="submit" onClick={handleSubmit} >
          {  loading ? "Loading" : "Submit"}
          </button>
          <button id="submit" onClick={handleRefresh}>
           Refresh
          </button>
        </div>
        <div className="summary-box">
          <textarea
            id="summarize_result"
            readOnly
            value={summary}
            placeholder="Summary will appear here"
          />
        </div>
      </div>
    </div>
  );
}

export default App;

