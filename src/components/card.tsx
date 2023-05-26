"use client";


const Card = (props: any) => {
  return (
    <div className="flex border border-1 w-full bg-white flex-col text-gray-500 p-6 rounded-xl">
      <div className="flex flex-row align-middle items-center gap-2 text-gray-950 font-bold">
        <div className="w-9 h-9 bg-black flex text-center justify-center items-center rounded-full transition-colors duration-300 ease-in-out focus:outline-none"><props.icon color="white" size={16}/></div>
        <div className="text-xl">{props.title}</div>
      </div>
      <div className="py-3 text-lg font-light">
        {props.text}
      </div>
    </div>
  );
};

export default Card;
