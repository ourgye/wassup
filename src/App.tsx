import { useCallback, useRef, useState } from "react";
import "./App.css";
import SpeechBubble, { getRandomStyleIndex } from "./components/SpeechBubble";
import InputForm from "./components/InputForm";

function App() {
  const bubbleContainerRef = useRef<HTMLDivElement>(null);
  const [messageList, setMessageList] = useState<speechBubble[]>([
    {
      text: "안녕하세요",
      style: getRandomStyleIndex(),
      color: "#ffffff",
    },
  ]);
  // const handleBubbleClick = (index: number) => {
  //   setMessageList((prev) => {
  //     const newList = [...prev];
  //     const [clickedBubble] = newList.splice(index, 1); // 클릭한 아이템을 배열에서 제거
  //     newList.unshift(clickedBubble); // 배열의 앞에 추가
  //     return newList;
  //   });
  // };
  const [isBackgroundImage, setIsBackgroundImage] = useState<boolean>(false);

  // for image drag
  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
  }, []);
  const handelDrageEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
  }, []);
  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.stopPropagation();
      e.preventDefault();
      const files = e.dataTransfer.files;
      if (files.length === 0) {
        return;
      }
      const file = files[0];
      if (file.type.match(/image.*/)) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new Image();
          img.src = e.target?.result as string;
          img.onload = () => {
            if (bubbleContainerRef.current) {
              bubbleContainerRef.current.style.backgroundImage = `url(${img.src})`;
              bubbleContainerRef.current.style.width = `${img.width}px`;
              bubbleContainerRef.current.style.height = `${img.height}px`;
            }
          };
        };
        reader.readAsDataURL(file);
        setIsBackgroundImage(true);
      }
    },
    [bubbleContainerRef]
  );

  return (
    <>
      <div className="w-full h-full flex flex-col justify-between items-center">
        <div>
          <InputForm
            messageList={messageList}
            setMessageList={setMessageList}
          />
        </div>
        <div
          className={`relative overflow-hidden ${
            isBackgroundImage
              ? "bg-contain bg-no-repeat bg-center"
              : "h-full w-full"
          }`}
          ref={bubbleContainerRef}
          onDragOver={handleDragOver}
          onDragEnter={handelDrageEnter}
          onDrop={handleDrop}
        >
          {messageList.map((m, i) => (
            <SpeechBubble
              key={`${m.text}-${i}`}
              data={m}
              parent={bubbleContainerRef}
              // onClick={() => handleBubbleClick(i)}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
