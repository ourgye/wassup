import { useCallback, useRef, useState } from "react";
import "./App.css";
import SpeechBubble from "./components/SpeechBubble";
import MainHeader from "./components/MainHeader";
import * as htmlToImage from "html-to-image";
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from "html-to-image";
import { Button } from "./components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "./components/ui/popover";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "./components/ui/dialog";

function App() {
  const bubbleContainerRef = useRef<HTMLDivElement>(null);
  const [messageList, setMessageList] = useState<speechBubble[]>([]);
  const [isBackgroundImage, setIsBackgroundImage] = useState<boolean>(false);
  // const handleBubbleClick = (index: number) => {
  //   setMessageList((prev) => {
  //     const newList = [...prev];
  //     const [clickedBubble] = newList.splice(index, 1); // 클릭한 아이템을 배열에서 제거
  //     newList.unshift(clickedBubble); // 배열의 앞에 추가
  //     return newList;
  //   });
  // };

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
  const handleCaptureBtn = () => {
    if (bubbleContainerRef.current)
      htmlToImage
        .toPng(bubbleContainerRef.current)
        .then(function (dataUrl) {
          const img = new Image();
          img.src = dataUrl;
          document.getElementById("captured-img")?.appendChild(img);
        })
        .catch(function (error) {
          alert("캡쳐에 실패했습니다. 다시 시도해주세요.");
          console.error("캡처 실패..", error);
        });
  };

  return (
    <div className="w-full h-full flex flex-col justify-between items-center">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            className="absolute bottom-4 right-4 z-10"
            size={"sm"}
            onClick={handleCaptureBtn}
          >
            캡쳐
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-gray-100">
          <div id="captured-img"></div>
        </DialogContent>
      </Dialog>

      <MainHeader
        setMessageList={setMessageList}
        setIsBackgroundImage={setIsBackgroundImage}
        messageList={messageList}
        bubbleContainerRef={bubbleContainerRef}
      />
      <div
        className={`relative overflow-hidden bg-white ${
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
              <div className="w-full text-base">
                + 버튼을 클릭해 말풍선을 추가해보세요. <br />
                드래그 앤 드롭으로 이미지를 넣어보세요.
              </div>
            )}
      </div>
    </div>
  );
}

export default App;
