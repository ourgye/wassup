import React, { useState, useEffect, useRef } from "react";
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
  const [defaultPosition, setDefaultPosition] = useState({
    x: Math.random() * parent.current.offsetWidth,
    y: Math.random() * parent.current.offsetHeight,
  });
  const bubbleRef = useRef<HTMLDivElement>(null);

  // 부모의 크기를 기반으로 초기 위치 설정
  useEffect(() => {
    if (parent.current && bubbleRef.current) {
      const parentWidth = parent.current.clientWidth;
      const parentHeight = parent.current.offsetHeight;

      // 랜덤 위치 계산: 부모 크기를 기준으로 계산하여 말풍선이 부모 영역 안에 위치하도록
      setDefaultPosition({
        x: Math.random() * parentWidth, // 부모의 너비 내에서 랜덤 위치
        y: Math.random() * parentHeight, // 부모의 높이 내에서 랜덤 위치
      });
    }
  }, [parent]);

  const backgroundColorStyle: React.CSSProperties = {
    backgroundColor: data.color,
    color: data.textColor,
  };

  const tailColorStyle: React.CSSProperties = {
    borderTopColor: data.color,
  };

  const commonBubbleStyle = `relative px-[0.6em] py-[0.1em] text-center flex justify-center items-center rounded-lg mb-[0.5rem]`;

  const selectedStyle = bubbleStyles[data.style] || bubbleStyles[0]; // fallback to default style

  return (
    <Draggable
      bounds="parent"
      defaultPosition={defaultPosition} // 부모 크기 기반으로 초기 위치 설정
    >
      <div className="max-w-fit cursor-pointer absolute" ref={bubbleRef}>
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
