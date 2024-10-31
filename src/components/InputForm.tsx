import { useState } from "react";
import { getRandomStyleIndex } from "./SpeechBubble";

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
    console.log("handle submit");
    e.preventDefault();
    if (message) {
      setMessageList([
        ...messageList,
        { text: message, style: getRandomStyleIndex() },
      ]);
      setMessage("");
    }
  };

  const handleInputValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };
  return (
    <form
      className="text-sm bg-gray-400 flex flex-row gap-2 w-full px-2 py-2"
      onSubmit={handleSubmit}
    >
      <input
        id="message"
        className="w-full px-2 rounded-md"
        value={message}
        placeholder="입력하세요"
        onChange={handleInputValueChange}
      />
      <button type="submit" className="px-2 py-0.5 line break-keep">
        입력
      </button>
    </form>
  );
}

export default InputForm;
