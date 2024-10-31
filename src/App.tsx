import { useState } from "react";
import "./App.css";
import SpeechBubble, { getRandomStyleIndex } from "./components/SpeechBubble";
import InputForm from "./components/InputForm";

function App() {
  const [messageList, setMessageList] = useState<
    { text: string; style: number }[]
  >([{ text: "안녕하세요", style: getRandomStyleIndex() }]);

  return (
    <>
      <div className="w-full h-full flex flex-col justify-between">
        <div>
          {messageList.map((m, i) => {
            console.log(m);
            return (
              <SpeechBubble
                message={m.text}
                styleIndex={m.style}
                key={`${m.text}-${i}`}
              />
            );
          })}
        </div>
        <InputForm messageList={messageList} setMessageList={setMessageList} />
      </div>
    </>
  );
}

export default App;
