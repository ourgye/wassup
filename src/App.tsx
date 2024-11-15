import { useCallback, useRef, useState } from "react";
import "./App.css";
import SpeechBubble from "./components/SpeechBubble";
import MainHeader from "./components/MainHeader";
import * as htmlToImage from "html-to-image";
import { Button } from "./components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./components/ui/dialog";

function App() {
  const bubbleContainerRef = useRef<HTMLDivElement>(null);
  const imgConRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
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

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length === 0) {
      return;
    }
    const file = files[0];
    if (file.type.match(/image.*/)) {
      const imgElement = document.getElementById(
        "droppedImage"
      ) as HTMLImageElement;
      if (imgElement) {
        imgElement.remove(); // 이미지를 완전히 제거
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target?.result as string;
        img.id = "droppedImage";
        img.onload = () => {
          document.getElementById("backimg")?.appendChild(img);
          setIsBackgroundImage(true);
        };
      };
      reader.readAsDataURL(file);
      setIsBackgroundImage(true);
    }
  }, []);
  const handleCaptureBtn = () => {
    if (imgConRef.current && imgRef.current) {
      htmlToImage
        .toPng(imgConRef.current)
        .then(function (dataUrl) {
          const img = new Image();
          img.src = dataUrl;
          document.getElementById("captured-img")?.appendChild(img);
        })
        .catch(function (error) {
          alert("캡쳐에 실패했습니다. 다시 시도해주세요.");
          console.error("캡처 실패..", error);
        });
    } else {
      alert("failed to capture, try again");
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center">
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
        imgRef={imgRef}
      />
      <div
        className={`relative overflow-hidden h-full w-full bg-white flex justify-center items-center ${
          isBackgroundImage ? "bg-contain bg-no-repeat bg-center" : ""
        }`}
        ref={bubbleContainerRef}
        onDragOver={handleDragOver}
        onDragEnter={handelDrageEnter}
        onDrop={handleDrop}
      >
        <div id="backimg" className="max-h-full relative" ref={imgConRef}>
          <img id="droppedImage" ref={imgRef} className="object-cover" />
          {messageList.length > 0 &&
            messageList.map((m, i) => (
              <SpeechBubble
                key={`${m.text}-${i}`}
                data={m}
                parent={imgConRef}
                // onClick={() => handleBubbleClick(i)}
              />
            ))}
        </div>
        {!isBackgroundImage && (
          <div className="w-full h-full text-base flex justify-center items-center">
            <p>
              + 버튼을 클릭해 말풍선을 추가해보세요. <br />
              드래그 앤 드롭 혹은 이미지 버튼을 클릭으로 이미지를 넣어보세요.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
