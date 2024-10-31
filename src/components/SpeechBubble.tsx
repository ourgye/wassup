export const getRandomStyleIndex = () => Math.floor(Math.random() * 3);

function SpeechBubble({
  message,
  styleIndex,
}: {
  message: string;
  styleIndex: number;
}) {
  const commonBubbleStyle =
    "relative px-4 h-8 bg-red-300 text-sm text-center flex justify-center items-center rounded-lg mb-[0.5rem]";
  const bubbleStyles = [
    { body: "", tail: "-bottom-4 right-1/2 translate-x-1/2" },
    { body: "rounded-bl-none", tail: "-bottom-2 border-l-0 border-b-0 left-0" },
    {
      body: "rounded-br-none",
      tail: "-bottom-2 border-r-0 border-b-0 right-0",
    },
  ];

  const selectedStyle = bubbleStyles[styleIndex];

  return (
    <div className="max-w-fit">
      <div className={commonBubbleStyle + " " + selectedStyle.body}>
        <span>{message}</span>
        <div
          className={`absolute w-0 h-0 border-transparent border-[0.5rem] border-t-red-300 ${selectedStyle.tail}`}
        />
      </div>
    </div>
  );
}
export default SpeechBubble;
