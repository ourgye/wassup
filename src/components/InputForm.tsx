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
  setMessageList: React.Dispatch<
    React.SetStateAction<
      {
        text: string;
        style: number;
      }[]
    >
  >;
  messageList: {
    text: string;
    style: number;
  }[];
}) {
  const [message, setMessage] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newMessageRandom: {
      text: string;
      style: number;
    }[] = Array.from({ length: getRandomCount() }).map(() => ({
      text: message,
      style: getRandomStyleIndex(),
    }));
    if (message) {
      setMessageList([...messageList, ...newMessageRandom]);
      setMessage("");
    }
  };

  const handleInputValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
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
          className="text-sm flex flex-row gap-2 px-2 py-1"
          onSubmit={handleSubmit}
        >
          <Input
            id="message"
            className="w-full px-2 rounded-md focus:outline-none"
            value={message}
            placeholder="입력하세요"
            onChange={handleInputValueChange}
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
