import { useState } from 'react';
import './App.css'
import { ResponseList } from './components'

const apiKey = process.env.REACT_APP_API_KEY;

const aiURL = 'https://api.openai.com/v1/engines/text-davinci-002/completions';


function App() {
  // userPrompt captures the users input to send to openapi
  const [userPrompt, setUserPrompt] = useState('');
  // responses is the collection of responses from openapi
  const [responses, setResponses] = useState([]);
  // loading determines if the button is enabled or disabled, when a request is sent
  // we set loading to true (disabling the button).
  const [loading, setLoading] = useState(false);
  // errorText is either a user error  or an API error
  const [errorText, setErrorText] = useState('');


  async function onSubmit(event) {
    event.preventDefault();
    if (userPrompt === '') {
      setErrorText('A prompt is required');
      // set the #errorText to 'A prompt is required'
      return
    }

    setLoading(true);
    setErrorText('');

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
        // get response body as JSON
        const jsonResponse = await response.json();
        setResponses([
          {
            prompt: data.prompt,
            aiResponse: jsonResponse.choices[0].text
          }, ...responses]);
      }
    } catch (error) {
      setErrorText(error);
    } finally {
      setUserPrompt('');
      setLoading(false);
    }
  }

  return (
    <>
      <nav>
        <h1 className="text-light text-center bg-info shadow-lg p-3 mb-5">AI Sandbox</h1>
      </nav>
      <br />
      <h3 className="text-left shadow p-3 mb-5 bg-body rounded text-uppercase">Instructions</h3>
      <div className="container">
        <h5 className="fw-light">Insert a prompt to the AI and see what the computer has to tell to you. There is a placeholder value to give you a suggestion, but you are not limited to this type of prompt. You can also ask the computer to tell you a story, or ask about the weather. The sky is the limit with this AI sandbox. </h5>
        <form method="POST" className="mb-3">
          <label htmlFor="PromptAI" className="form-label mt-2">Enter Prompt</label>
          {/* the prompt wrapper will have a border of 1px soldi red added if the error state is set */}
          <div id="promptWrapper" className={errorText ? "error" : null}>
            <textarea className="form-control" id="PromptAi" rows="3" onChange={(e) => setUserPrompt(e.target.value)} placeholder="Name a famous actor from the early 19th century" value={userPrompt}></textarea>
          </div>
          {/* error text will only display if the state is set */}
          <p id="errorText" style={{ color: "red" }}>{errorText}</p>
          <input className="btn btn-primary mt-2" type="submit" onClick={onSubmit} disabled={loading} id="query"></input>
        </form>
      </div>
      <h4 className="text-uppercase shadow p-3  mb-5 bg-body ">Responses</h4>
      <div className="container">
        <ResponseList responses={responses} />
      </div>
    </>
  );
}

export default App;
