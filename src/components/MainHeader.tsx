import InputForm from "./InputForm";
import { Button } from "./ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import DeleteIcon from "@/assets/icon/deleteAll.svg?react";
import TextDecreaseIcon from "@/assets/icon/textDecrease.svg?react";
import TextIncreaseIcon from "@/assets/icon/textIncrease.svg?react";
import AddImageIcon from "@/assets/icon/background.svg?react";

interface MainHeaderProps {
  setMessageList: React.Dispatch<React.SetStateAction<speechBubble[]>>;
  messageList: speechBubble[];
  setIsBackgroundImage: React.Dispatch<React.SetStateAction<boolean>>;
  bubbleContainerRef: React.RefObject<HTMLDivElement>;
  imgRef: React.RefObject<HTMLImageElement>;
}

const MainHeader: React.FC<MainHeaderProps> = ({
  setMessageList,
  messageList,
  setIsBackgroundImage,
  imgRef,
}) => {
  const handleRemoveAllSpeechBubbles = () => {
    setMessageList([]);
  };
  const handleRemoveBackgroundImage = () => {
    setMessageList([]);
    setIsBackgroundImage(false);

    // droppedImage 요소 제거
    const imgElement = document.getElementById(
      "droppedImage"
    ) as HTMLImageElement;
    if (imgElement) {
      imgElement.remove(); // 이미지를 완전히 제거
    }
    const inputFile = document.getElementById("bg-img") as HTMLInputElement;
    if (inputFile) {
      inputFile.value = ""; // 파일 입력 초기화
    }
  };

  const handleTextSizeIncrease = () => {
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
  const handleBackgroundUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) {
      return;
    }
    const file = files[0];
    if (file.type.match(/image.*/)) {
      const imgElement = document.getElementById("droppedImage");
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
          // 배경 이미지가 설정되었음을 상태로 반영
          setIsBackgroundImage(true);
        };
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-row items-center justify-center">
      <input
        id="bg-img"
        type="file"
        className="hidden"
        onChange={handleBackgroundUpload}
      />
      <label htmlFor="bg-img">
        <Button size={"icon"} variant={"outline"} asChild>
          <div className="[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0">
            <AddImageIcon />
          </div>
        </Button>
      </label>
      <InputForm messageList={messageList} setMessageList={setMessageList} />

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
      <Popover>
        <PopoverTrigger asChild>
          <Button type="button" size={"icon"} variant={"destructive"}>
            <DeleteIcon fill="#000" />
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
    </div>
  );
};

export default MainHeader;
