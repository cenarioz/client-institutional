import { ReactNode, useRef, useState } from "react";
import {
  IoHappyOutline,
  IoHeartOutline,
  IoMedalOutline,
  IoMegaphoneOutline,
  IoMicOutline,
  IoMusicalNotesOutline,
  IoWalkOutline,
} from "react-icons/io5";

interface slideProps {
  children?: ReactNode[];
}

const MenuSlide = ({ children }: slideProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isSelected, setIsSelected] = useState(false);
  const scrollRef = useRef();
  const animationValue = useRef(0);

  // const handleScroll = (event) => {
  //   if (event && !isSelected) {
  //     const { target } = event;
  //     const index = Math.floor(
  //       (target.scrollLeft / (target.scrollWidth - target.offsetWidth)) *
  //         children.length
  //     );
  //     animationValue.current = index * 80;
  //     setSelectedIndex(index);
  //   }
  // };

  // const handlePress = (index) => {
  //   setIsSelected(true);
  //   setTimeout(() => setIsSelected(false), 400);
  //   setSelectedIndex(index);
  //   animationValue.current = index * 80;

  //   scrollRef.current.scrollLeft = index * 80;
  // };

  // useEffect(() => {
  //   const handleResize = () => {
  //     const scrollWidth = scrollRef.current.scrollWidth;
  //     const containerWidth = scrollRef.current.offsetWidth;
  //     const index = Math.floor(
  //       (scrollRef.current.scrollLeft / (scrollWidth - containerWidth)) *
  //         children.length
  //     );
  //     animationValue.current = index * 80;
  //     setSelectedIndex(index);
  //   };

  //   window.addEventListener("resize", handleResize);

  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, [children.length]);

  const categories = [
    { icon: <IoMicOutline />, name: "Gravação" },
    { icon: <IoHeartOutline />, name: "Casamento" },
    { icon: <IoHappyOutline />, name: "Aniversário" },
    { icon: <IoMusicalNotesOutline />, name: "Show" },
    { icon: <IoMegaphoneOutline />, name: "Conferencia" },
    { icon: <IoWalkOutline />, name: "Desfile" },
    { icon: <IoMedalOutline />, name: "Competição" },
  ];

  return (
    <div className="flex mb-6 flex-row justify-center w-ful overflow-x-scroll gap-4 justify-items-center items-center border-t border-b py-1 pt-4 border-gray-200">
      {categories.map((item) => {
        return (
          <div
            key={Math.random()}
            className="category flex flex-col items-center h-16 text-gray-900 hover:text-gray-900 hover:border-b-2 hover:border-gray-900"
          >
            {item.icon}
            <p className="text-sm font-base mt-1">{item.name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default MenuSlide;
