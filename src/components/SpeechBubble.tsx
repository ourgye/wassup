function SpeechBubble({ message }: { message: string }) {
  return (
    <div className="max-w-fit">
      <div className="relative px-4 h-8 bg-red-300 text-sm text-center flex justify-center items-center rounded-md mb-[0.5rem]">
        <span>{message}</span>
        <div className="absolute w-0 h-0 right-1/2 -bottom-1/2 translate-x-1/2 border-transparent border-[0.5rem] border-t-red-300" />
      </div>
    </div>
  );
}

export default SpeechBubble;
