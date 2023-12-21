import { ReactNode } from "react";

interface slideProps {
  props: { icon: ReactNode; name: string; disabled: boolean }[];
}

const MenuSlide = ({ props }: slideProps) => {
  if (!props) {
    return (
      <div className="overflow-auto flex mb-6 flex-row justify-between w-full gap-4 justify-items-center items-center border-t border-b py-1 pt-4 border-gray-200">
        {Array(6).map((item) => {
          return (
            <div key={Math.random()}>
              <div className="category flex flex-col items-center h-16 pl-4 pr-4">
                {/* Skeleton Loading for Icon */}
                <div className="h-6 w-6 bg-gray-300 rounded-full mb-1"></div>
                {/* Skeleton Loading for Name */}
                <div className="h-4 bg-gray-300 w-16 mb-1 rounded"></div>
              </div>
            </div>
          );
        })}
        ;
      </div>
    );
  } else {
    return (
      <div className="overflow-auto flex mb-6 flex-row justify-between w-ful gap-4 justify-items-center items-center border-t border-b py-1 pt-4 border-gray-200">
        {props.map((item) => {
          return (
            <div key={Math.random()}>
              {item.disabled ? (
                <div className="category flex flex-col items-center h-16 text-gray-400 hover:text-gray-400 pl-4 pr-4">
                  {item.icon}
                  <p className="text-sm font-base mt-1">{item.name}</p>
                </div>
              ) : (
                <div className="category flex flex-col items-center h-16 text-gray-900 hover:text-gray-900 hover:border-b-2 pl-4 pr-4 hover:border-gray-900">
                  {item.icon}
                  <p className="text-sm font-base mt-1">{item.name}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  }
};

export default MenuSlide;
