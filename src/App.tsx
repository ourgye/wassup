import { useState } from "react";
import "./App.css";
import SpeechBubble from "./components/SpeechBubble";

function App() {
  const [message, setMessage] = useState<string>("");
  const [messageList, setMessageList] = useState<string[]>(["안녕하세요"]);
  return (
    <>
      <div className="card">
        {messageList.map((m: string) => (
          <SpeechBubble message={m} />
        ))}
        <form className="text-sm bg-gray-400 flex flex-row gap-1">
          <input
            id="message"
            value={message}
            placeholder="입력하세요"
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            type="button"
            onClick={() => {
              if (message) setMessageList([...messageList, message]);
              setMessage("");
            }}
            className="px-2 py-0"
          >
            입력
          </button>
        </form>
      </div>
    </>
  );
}

export default App;
