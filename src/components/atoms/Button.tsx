"use-client";
import { ReactNode, useState } from "react";
import colorst from "tailwindcss/colors";
import tailwindConfig from "../../../tailwind.config.js";

interface ButtonProps {
  onClick: () => void;
  children: ReactNode;
  iconRight?: ReactNode;
  iconLeft?: ReactNode;
  full?: boolean;
  rounded?: "xs" | "sm" | "md" | "lg" | "full";
  bordered?: boolean;
  color?: string;
  light?: boolean;
}

export default function Button({
  onClick,
  children,
  full,
  rounded = "full",
  bordered,
  color = "primary-300",
  light,
}: ButtonProps) {
  const [hover, setHover] = useState(false);

  const handleMouseEnter = () => {
    setHover(true);
  };

  const handleMouseLeave = () => {
    setHover(false);
  };

  const roundedBorder = () => {
    return `rounded-${rounded}`;
  };

  const defineBorder = () => {
    if (light) return `text-${color}`;
    if (bordered) return `border border-${color}`;
    else return `bg-${color} text-white`;
  };

  const { colors } = tailwindConfig.theme.extend;
  const tColors: any = { ...colorst, ...colors };

  const defineColor = () => {
    const colorAndIntensity: any = color.split("-");
    if (colorAndIntensity.length > 1)
      return tColors[colorAndIntensity[0]][
        hover
          ? Number(colorAndIntensity[1]) + 200
          : Number(colorAndIntensity[1])
      ];
    else return tColors[colorAndIntensity[0]];
  };

  const defineBg = () => {
    if (bordered || light) {
      return {};
    }
    if (!bordered || !light) {
      return { background: defineColor() };
    }
  };

  return (
    <button
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`${
        full && "w-full"
      } w-12 h-12 flex text-center justify-center items-center ${roundedBorder()} ${defineBorder()} transition-colors duration-300 ease-in-out focus:outline-none`}
      style={defineBg()}
    >
      {children}
    </button>
  );
}
