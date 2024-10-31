import { useState } from "react";
import { getRandomCount, getRandomStyleIndex } from "./SpeechBubble";

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
    <form
      className="text-sm bg-gray-100 border-gray-500 flex flex-row gap-2 w-full px-2 py-1"
      onSubmit={handleSubmit}
    >
      <input
        id="message"
        className="w-full px-2 rounded-md focus:outline-none"
        value={message}
        placeholder="입력하세요"
        onChange={handleInputValueChange}
      />
      <button
        type="submit"
        className="px-2 py-0.5 line break-keep hover:border-gray-800 focus:outline-none"
      >
        입력
      </button>
    </form>
  );
}

export default InputForm;
