import Draggable from "react-draggable";

const getRandomStyleIndex = () => Math.floor(Math.random() * 3);
const getRandomCount = () => Math.floor(Math.random() * 5 + 1);

function SpeechBubble({
  message,
  styleIndex,
  parent,
}: {
  message: string;
  styleIndex: number;
  parent: React.RefObject<HTMLDivElement>;
}) {
  const commonBubbleStyle =
    "relative px-4 h-8 bg-red-300 text-sm text-center flex justify-center items-center rounded-lg mb-[0.5rem]";
  const bubbleStyles = [
    { body: "", tail: "-bottom-2 right-1/2 translate-x-1/2" },
    { body: "rounded-bl-none", tail: "-bottom-2 border-l-0 left-0" },
    {
      body: "rounded-br-none",
      tail: "-bottom-2 border-r-0 right-0",
    },
  ];

  const selectedStyle = bubbleStyles[styleIndex];
  console.log(
    "width, height: ",
    parent.current?.offsetWidth,
    parent.current?.offsetHeight
  );

  return (
    <Draggable
      bounds={"parent"}
      defaultPosition={{
        x: Math.random() * (parent.current?.offsetWidth || 100),
        y: Math.random() * (parent.current?.offsetHeight || 100),
      }}
    >
      <div className="max-w-fit cursor-pointer absolute">
        <div className={`${commonBubbleStyle} ${selectedStyle.body}`}>
          <span>{message}</span>
          <div
            className={`absolute w-0 h-0 border-transparent border-[0.6rem] border-t-red-300 border-b-0 ${selectedStyle.tail}`}
          />
        </div>
      </div>
    </Draggable>
  );
}

export { getRandomStyleIndex, getRandomCount };

export default SpeechBubble;
