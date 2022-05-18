import { useState } from 'react';


function App() {
  const [response,setResponse] = useState()
  async function onSubmit(event) {

  }

  return (
    <>
      <h1 className="text-light text-center bg-info">AI Sandbox</h1>
      <br />
      <div className="container">
        <h3 className="text-left">Instructions:</h3>
        <p>Insert a prompt to the AI and see what the computer has to tell to you</p>
        <form method="POST" onSubmit={onSubmit} className="mb-3">
          <label for="PromptAI" className="form-label badge rounded-pill text-bg-primary">Enter Prompt</label>
          <textarea className="form-control" id="PromptAi" rows="3"></textarea>
          <br />
          <input className="btn btn-primary" type="submit" id="query">Submit</input>
        </form>
      </div>
      <br />
      <div class="container">
        <h4 class="text-uppercase">Responses</h4>
        <div class="container" id="responses">
        </div>
      </div>
    </>
  );
}

export default App;
