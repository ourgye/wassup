import React from "react";
import Draggable from "react-draggable";

const getRandomStyleIndex = () => Math.floor(Math.random() * 3);
const getRandomCount = () => Math.floor(Math.random() * 5 + 1);

interface SpeechBubbleProps {
  data: speechBubble;
  parent: React.RefObject<HTMLDivElement>;
}

const bubbleStyles = [
  { body: "", tail: "-bottom-[0.5em] right-1/2 translate-x-1/2" },
  { body: "rounded-bl-none", tail: "-bottom-[0.5em] border-l-0 left-0" },
  { body: "rounded-br-none", tail: "-bottom-[0.5em] border-r-0 right-0" },
];

const SpeechBubble: React.FC<SpeechBubbleProps> = ({ data, parent }) => {
  const backgroundColorStyle: React.CSSProperties = {
    backgroundColor: data.color,
    color: data.textColor,
  };

  const tailColorStyle: React.CSSProperties = {
    borderTopColor: data.color,
  };

  const commonBubbleStyle = `relative px-[0.6em] text-center flex justify-center items-center rounded-lg mb-[0.5rem]`;

  const selectedStyle = bubbleStyles[data.style] || bubbleStyles[0]; // fallback to default style

  // Get random position only on mount
  const defaultPosition = {
    x: Math.random() * (parent.current?.offsetWidth || 100),
    y: Math.random() * (parent.current?.offsetHeight || 100),
  };

  return (
    <Draggable bounds="parent" defaultPosition={defaultPosition}>
      <div className="max-w-fit cursor-pointer absolute">
        <div
          style={backgroundColorStyle}
          className={`${commonBubbleStyle} ${selectedStyle.body}`}
        >
          <span>{data.text}</span>
          <div
            style={tailColorStyle}
            className={`absolute w-0 h-0 border-transparent border-[0.6em] border-b-0 ${selectedStyle.tail}`}
          />
        </div>
      </div>
    </Draggable>
  );
};

export { SpeechBubble, getRandomStyleIndex, getRandomCount };
export default SpeechBubble;
