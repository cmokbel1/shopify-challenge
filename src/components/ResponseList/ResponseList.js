// Response list conditionally returns a body variable
const ResponseList = ({ responses }) => {
    let body = <p className="text-center">There are no responses....</p>;
    if (responses.length > 0) {
        body = (
            <div>
                {responses.map((response, index) => <ResponseItem response={response} index={index} />)}
            </div>
        )
    }
    return body
}
// the Response Item is used to render the responses within the map 
// we add an index to seperate the children by position in the responses array
const ResponseItem = ({ response, index }) => {
    return (
        <div key={index} className="card mb-3">
            <div className="card-body">
                <p className="card-title fs-5">prompt: {response.prompt}</p>
                <p className="card-text fs-5">response: {response.aiResponse}</p>
            </div>
        </div>
    )
}

export default ResponseList