import React, { useState } from "react";
import { getRandomCount, getRandomStyleIndex } from "@/components/SpeechBubble";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  // DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import AddIcon from "@/assets/icon/add.svg?react";

function InputForm({
  setMessageList,
  messageList,
}: {
  setMessageList: React.Dispatch<React.SetStateAction<speechBubble[]>>;
  messageList: speechBubble[];
}) {
  const [message, setMessage] = useState<string>("");
  const [count, setCount] = useState<number>(getRandomCount);
  const [color, setColor] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newMessageRandom: speechBubble[] = Array.from({
      length: count || getRandomCount(),
    }).map(() => ({
      text: message,
      style: getRandomStyleIndex(),
      color: color,
    }));
    if (message) {
      setMessageList([...messageList, ...newMessageRandom]);
      setMessage("");
    }
  };

  const handleMsgValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };
  const handleCountValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCount(Number(e.target.value));
  };
  const handleColorValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} size={"icon"} className="rounded-full m-2">
          <AddIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>말풍선 추가</DialogTitle>
          <DialogDescription>
            말풍선을 추가해보세요. 개수와 색깔을 지정할 수 있습니다.
            <br />
            랜덤도 가능!
          </DialogDescription>
        </DialogHeader>
        <form
          className="text-sm flex flex-col gap-2 px-2 py-1"
          onSubmit={handleSubmit}
        >
          <Input
            id="message"
            className="w-full px-2 rounded-md focus:outline-none"
            value={message}
            placeholder="입력하세요"
            onChange={handleMsgValueChange}
          />
          <span>개수와 색상</span>
          <Input
            id="count"
            className="w-full px-2 rounded-md focus:outline-none"
            value={count}
            type="number"
            onChange={handleCountValueChange}
          />
          <Input
            id="color"
            className="w-full p-0 px-1 rounded-md focus:outline-none"
            value={color}
            type="color"
            onChange={handleColorValueChange}
          />
          <DialogClose asChild>
            <Button
              type="submit"
              className="px-2 py-0.5 line break-keep hover:border-gray-800 focus:outline-none"
            >
              입력
            </Button>
          </DialogClose>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default InputForm;
