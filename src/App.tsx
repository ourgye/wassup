import { useState } from "react";
import "./App.css";
import SpeechBubble from "./components/SpeechBubble";

function App() {
  const [message, setMessage] = useState<string>("");
  const [messageList, setMessageList] = useState<string[]>(["안녕하세요"]);
  return (
    <>
      <div className="w-full h-full flex flex-col justify-between">
        <div>
          {messageList.map((m: string) => (
            <SpeechBubble message={m} />
          ))}
        </div>
        <form
          className="text-sm bg-gray-400 flex flex-row gap-2 w-full px-2 py-2"
          onSubmit={(e) => {
            e.preventDefault();
            if (message) setMessageList([...messageList, message]);
            setMessage("");
          }}
        >
          <input
            id="message"
            className="w-full px-2 rounded-md"
            value={message}
            placeholder="입력하세요"
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit" className="px-2 py-0.5 line break-keep">
            입력
          </button>
        </form>
      </div>
    </>
  );
}

export default App;
