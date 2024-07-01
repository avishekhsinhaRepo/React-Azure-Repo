import { useState } from "react";
import "./App.css";
import { Chat } from "./components/Chat";
import { Welcome } from "./components/Welcome";
import { TELESALES_API_ENDPOINT } from "./constants/contants";
function App() {
  const [isLoading, setLoading] = useState(false);
  const [chat, setChat] = useState([]);
  const [isError, setIsError] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");

  const fetchData = async () => {
    const url = `${TELESALES_API_ENDPOINT}`;
    try {
      const response = await fetch(url);
      const data = await response.json();

      return data;
    } catch (error) {
      console.log("Error fetching data: ", error);
      setLoading(false);
    }
  };

  const handleSend = async () => {
    setLoading(true);
    const aiResponse = await fetchData();
    if (!aiResponse?.response) {
      setIsError(true);
    }
    setChat([
      ...chat,
      {
        question: newQuestion,
        answer: aiResponse.response,
      },
    ]);
    setLoading(false);
    setNewQuestion("");
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  const adjustScroll = () => {
    const messageBody = document.querySelector("#scrollableContainer");
    if (messageBody) messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
  };
  return (
    <>
      <div className="card border border-primary ">
        <h5 className="card-header bg-primary text-white">TeleSales Companion</h5>
        <div className="card-body">
          <div className="card alert alert-primary chatbox-container">
            <div className="row card-body">
              {chat && chat.length > 0 ? (
                <div className="row" id="scrollableContainer">
                  {chat.map((message, index) => (
                    <Chat question={message.question} answer={message.answer} key={index} />
                  ))}
                </div>
              ) : (
                <Welcome />
              )}
            </div>
            <div className="row card-body">
              <div className="input-group mb-3">
                <textarea
                  type="text"
                  className="form-control"
                  placeholder="Ask a question..."
                  aria-label="Question"
                  aria-describedby="button-addon2"
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  onKeyDown={handleEnter}
                  id="questionarea"
                  rows="1"
                  required
                  style={{ position: "sticky", height: "auto" }}
                />

                <button className="btn btn-primary" type="button" id="button-addon2" onClick={handleSend} disabled={newQuestion.length == 0}>
                  {isLoading ? (
                    <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                  ) : (
                    <span role="status">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
                        <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z" />
                      </svg>
                    </span>
                  )}
                </button>
              </div>
              {isError && <div className="text-danger">Something went wrong. Please try again later.</div>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
