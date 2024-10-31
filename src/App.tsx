import { useRef, useState } from "react";
import "./App.css";
import SpeechBubble, { getRandomStyleIndex } from "./components/SpeechBubble";
import InputForm from "./components/InputForm";

function App() {
  const bubbleContainerRef = useRef<HTMLDivElement>(null);
  const [messageList, setMessageList] = useState<
    { text: string; style: number }[]
  >([
    {
      text: "안녕하세요",
      style: getRandomStyleIndex(),
    },
  ]);

  return (
    <>
      <div className="w-full h-full flex flex-col justify-between ">
        <div
          className="h-full relative overflow-hidden"
          ref={bubbleContainerRef}
        >
          {messageList.map((m, i) => (
            <SpeechBubble
              key={`${m.text}-${i}`}
              message={m.text}
              styleIndex={m.style}
              parent={bubbleContainerRef}
            />
          ))}
        </div>
        <InputForm messageList={messageList} setMessageList={setMessageList} />
      </div>
    </>
  );
}

export default App;
