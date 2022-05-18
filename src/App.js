import { useState } from 'react';

const apiKey = process.env.REACT_APP_API_KEY;

const aiURL = 'https://api.openai.com/v1/engines/text-davinci-002/completions';


function App() {
  const [userPrompt, setUserPrompt] = useState('');
  const [responses, setResponses] = useState([{
    prompt: '',
    aiResponse: '',
}]);



  async function onSubmit(event) {
    event.preventDefault();

    const data = {
      prompt: userPrompt,
      temperature: 0.6,
      max_tokens: 64,

    }
    try {
      const response = await fetch(aiURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        // change our response from the API call to an object
        const jsonResponse = await response.json();
        console.log(jsonResponse)
        setResponses({prompt: userPrompt, aiResponse: jsonResponse.choices[0].text })
        console.log(responses)
        // We want to prepend our findings from the API to the responses section
      }

    } catch (error) {
      console.log(error)
    }
  }

return (
  <>
    <h1 className="text-light text-center bg-info shadow-lg p-3 mb-5">AI Sandbox</h1>
    <br />

    <div className="container">
      <h3 className="text-left shadow p-3 mb-5 bg-body rounded text-uppercase">Instructions</h3>
      <h5 className="fw-light">Insert a prompt to the AI and see what the computer has to tell to you</h5>
      <form method="POST" onSubmit={onSubmit} className="mb-3">
        <label htmlFor="PromptAI" className="form-label badge rounded-pill text-bg-primary">Enter Prompt</label>
        <textarea className="form-control" id="PromptAi" rows="3" onChange={(e) => setUserPrompt(e.target.value)} placeholder="Name a famous actor from the early 19th century" value={userPrompt}></textarea>
        <br />
        <input className="btn btn-primary" type="submit" id="query"></input>
      </form>
    </div>
    <br />
    <div className="container">
      <h4 className="text-uppercase shadow p-3 mb-5 bg-body rounded">Responses</h4>
      <div className="container align-center" id="responses">
        {responses.map((response, index) => { return (
          <div key={index} className="card w-75">
          <div className="card-body">
            <h5 className="card-title">prompt: {response.userPrompt}</h5>
            <p className="card-text">response: {response.aiResponse}</p>
          </div>
        </div>
        )})}
      </div>
    </div>
  </>
);
}

export default App;
