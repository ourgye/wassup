import { useCallback, useRef, useState } from "react";
import "./App.css";
import SpeechBubble from "./components/SpeechBubble";
import MainHeader from "./components/MainHeader";
import { Button } from "./components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./components/ui/dialog";
import * as htmlToImage from "html-to-image";
// import { domToImage } from "modern-screenshot";
import html2canvas from "html2canvas";

function App() {
  const bubbleContainerRef = useRef<HTMLDivElement>(null);
  const imgConRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [messageList, setMessageList] = useState<speechBubble[]>([]);
  const [isBackgroundImage, setIsBackgroundImage] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
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
  const handleCaptureBtn = async () => {
    setLoading(true);

    if (imgConRef.current) {
      // 새로운 라이브러리
      // domToImage(imgConRef.current).then((item) =>
      //   document.getElementById("captured-img")?.appendChild(item)
      // );
      // 기존

      await htmlToImage.toPng(imgConRef.current);
      await htmlToImage.toPng(imgConRef.current);
      await htmlToImage.toPng(imgConRef.current);

      const result = await htmlToImage.toPng(imgConRef.current);

      const img = new Image();
      img.src = result;
      img.className = "object-cover";
      document.getElementById("captured-img")?.appendChild(img);

      // html2canvas(imgConRef.current).then((element) => {
      //   document.getElementById("captured-img")?.appendChild(element);
      // });
    } else {
      alert("failed to capture, try again");
    }
    setLoading(false);
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            className="fixed bottom-4 right-4 z-10"
            size={"sm"}
            onClick={handleCaptureBtn}
          >
            캡쳐
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-gray-100">
          {loading && "로딩중..."}
          <div id="captured-img" className="overflow-scroll"></div>
        </DialogContent>
      </Dialog>

      <div className="w-full flex flex-col items-center">
        <MainHeader
          setMessageList={setMessageList}
          setIsBackgroundImage={setIsBackgroundImage}
          messageList={messageList}
          bubbleContainerRef={bubbleContainerRef}
          imgRef={imgRef}
          imgConRef={imgConRef}
        />
        <div
          className={`relative flex justify-center items-center ${
            isBackgroundImage ? "bg-contain bg-no-repeat bg-center" : ""
          }`}
          ref={bubbleContainerRef}
          onDragOver={handleDragOver}
          onDragEnter={handelDrageEnter}
          onDrop={handleDrop}
        >
          <div
            id="backimg"
            ref={imgConRef}
            className="relative bg-contain bg-no-repeat bg-center"
          >
            {/* <img
              id="droppedImage"
              ref={imgRef}
              className="object-cover max-w-lg"
            /> */}
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
            <div className="text-base flex justify-center items-center">
              <p>
                + 버튼을 클릭해 말풍선을 추가해보세요. <br />
                드래그 앤 드롭 혹은 이미지 버튼을 클릭으로 이미지를 넣어보세요.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
