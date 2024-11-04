import { useCallback, useRef, useState } from "react";
import "./App.css";
import SpeechBubble from "./components/SpeechBubble";
import InputForm from "./components/InputForm";
import { Button } from "./components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import DeleteIcon from "@/assets/icon/deleteAll.svg?react";
import TextDecreaseIcon from "@/assets/icon/textDecrease.svg?react";
import TextIncreaseIcon from "@/assets/icon/textIncrease.svg?react";

function App() {
  const bubbleContainerRef = useRef<HTMLDivElement>(null);
  const [messageList, setMessageList] = useState<speechBubble[]>([]);
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
  console.log(
    bubbleContainerRef.current?.offsetWidth,
    bubbleContainerRef.current?.offsetHeight
  );
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
              // bubbleContainerRef.current.style.width = `${
              //   img.width > window.innerWidth ? window.innerWidth : img.width
              // }px`;
              // bubbleContainerRef.current.style.height = `${
              //   img.height > window.innerHeight
              //     ? window.innerHeight
              //     : img.height
              // }px`;
            }
          };
        };
        reader.readAsDataURL(file);
        setIsBackgroundImage(true);
      }
    },
    [bubbleContainerRef]
  );

  const handleRemoveAllSpeechBubbles = () => {
    setMessageList([]);
  };
  const handleRemoveBackgroundImage = () => {
    setMessageList([]);
    setIsBackgroundImage(false);
    if (bubbleContainerRef.current) {
      bubbleContainerRef.current.style.backgroundImage = "none";
    }
  };
  const handleTextSizeIncrease = (e: React.MouseEvent) => {
    const currentSize = parseInt(getComputedStyle(document.body).fontSize);
    if (currentSize < 36) {
      document.body.style.fontSize = `${currentSize + 2}px`;
    }
  };
  const handleTextSizeDecrease = () => {
    const currentSize = parseInt(getComputedStyle(document.body).fontSize);
    if (currentSize > 10) {
      document.body.style.fontSize = `${currentSize - 2}px`;
    }
  };

  return (
    <>
      <div className="w-full h-full flex flex-col justify-between items-center">
        <div className="flex flex-row items-center">
          <InputForm
            messageList={messageList}
            setMessageList={setMessageList}
          />
          <Popover>
            <PopoverTrigger>
              <Button type="button" size={"icon"} variant={"outline"}>
                <DeleteIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <Button
                type="button"
                size={"default"}
                variant={"outline"}
                onClick={handleRemoveAllSpeechBubbles}
              >
                <DeleteIcon />
                말풍선만 삭제
              </Button>
              <Button
                type="button"
                size={"default"}
                variant={"destructive"}
                onClick={handleRemoveBackgroundImage}
              >
                <DeleteIcon fill={"white"} />
                모두 삭제
              </Button>
            </PopoverContent>
          </Popover>
          <div className="mx-4 flex flex-row items-center gap-2">
            <Button
              size={"icon"}
              variant={"outline"}
              onClick={handleTextSizeDecrease}
            >
              <TextDecreaseIcon />
            </Button>
            <div className="w-16 h-10 flex items-center justify-center text-sm">
              사이즈
            </div>
            <Button
              size={"icon"}
              variant={"outline"}
              onClick={handleTextSizeIncrease}
            >
              <TextIncreaseIcon />
            </Button>
          </div>
        </div>
        <div
          className={`relative overflow-hidden ${
            isBackgroundImage
              ? "h-full w-full bg-contain bg-no-repeat bg-center"
              : "h-full w-full"
          }`}
          ref={bubbleContainerRef}
          onDragOver={handleDragOver}
          onDragEnter={handelDrageEnter}
          onDrop={handleDrop}
        >
          {messageList.length > 0
            ? messageList.map((m, i) => (
                <SpeechBubble
                  key={`${m.text}-${i}`}
                  data={m}
                  parent={bubbleContainerRef}
                  // onClick={() => handleBubbleClick(i)}
                />
              ))
            : !isBackgroundImage && (
                <div className="w-full h-full">
                  + 버튼을 클릭해 말풍선을 추가해보세요. <br />
                  드래그 앤 드롭으로 이미지를 넣어보세요.
                </div>
              )}
        </div>
      </div>
    </>
  );
}

export default App;
