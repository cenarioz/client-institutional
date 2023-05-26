import { TbAdjustmentsHorizontal } from "react-icons/tb";

export default function Button({ onClick }: any) {
  return (
    <button onClick={onClick} className="w-12 h-12 flex text-center justify-center items-center rounded-full border-2 border-grey hover:bg-gray-300 transition-colors duration-300 ease-in-out focus:outline-none">
      <TbAdjustmentsHorizontal size={20} color="black"></TbAdjustmentsHorizontal>
    </button>
  );
}
