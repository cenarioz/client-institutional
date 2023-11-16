"use-client";

interface ButtonProps {
  isLoading?: boolean;
  value: string;
  type?: "reset" | "submit" | "button";
  rounded?: boolean;
  bgColor?: string;
  textColor?: string;
  onClick?: any;
}

export default function ButtonFull({
  isLoading,
  value,
  bgColor,
  onClick,
  textColor,
  rounded,
  type = "submit",
}: ButtonProps) {
  const dotStyles = (i: number) => {
    return {
      "--i": i,
    } as React.CSSProperties;
  };

  return (
    <button
      onClick={onClick}
      type={type}
      className={`${
        !isLoading ? (bgColor ? bgColor : "bg-violet-600") : "bg-gray-300"
      } 
      ${rounded ? "rounded-full" : "rounded-md"} 
      ${textColor ? textColor : "text-white"} 
      py-3 px-12 mb-4 relative`}
    >
      {isLoading && (
        <div className="loader">
          <span className="dot" style={dotStyles(3)}></span>
          <span className="dot" style={dotStyles(2)}></span>
          <span className="dot" style={dotStyles(1)}></span>
          <span className="dot" style={dotStyles(0)}></span>
        </div>
      )}
      {!isLoading && value}
    </button>
  );
}
