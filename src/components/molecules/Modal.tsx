"use-client";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";

type ModalProps = {
  isOpen: boolean;
  hiddenHeader?: boolean;
  hiddenHeaderBorder?: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  buttonLeft?: ReactNode;
  size?: "sm" | "md" | "large" | "full";
};

type ModalFooterProps = {
  children: ReactNode;
};

const Modal: React.FC<ModalProps> & { footer: React.FC<ModalFooterProps> } = ({
  isOpen,
  onClose,
  title,
  children,
  buttonLeft,
  size,
  hiddenHeader,
  hiddenHeaderBorder,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const [isBodyHidden, setIsBodyHidden] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsBodyHidden(true);
      document.body.style.overflow = "hidden";
    } else {
      setIsBodyHidden(false);
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscapeKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKeyPress);
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKeyPress);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  const modalSize = () => {
    switch (size) {
      case "sm":
        return "xl:w-2/5 md:top-10";
      case "full":
        return "xl:w-full xl:h-screen md:top-0";
      default:
        return "xl:w-2/4 md:top-10";
    }
  };
  return (
    <div>
      <div
        className="bg-gray-900 opacity-60 left-0 right-0 inset-0 fixed top-0 bottom-0 z-10"
        style={{
          animationFillMode: "both",
          animationIterationCount: 1,
          animationDuration: "400ms",
        }}
      ></div>

      <section>
        <div className="z-[2000] left-0 right-0 pt-10  fixed top-0 bottom-0 flex flex-row md:items-center md:justify-center max-h-[calc(4.56px,1vh * 100)]">
          <div className="contents">
            <div className="p-0 -mt-px" aria-hidden="true"></div>
            <div className="contents">
              <div
                ref={modalRef}
                className="bg-white rounded-md relative overflow-clip w-screen flex flex-col max-h-full md:max-w-xl text-gray-900"
              >
                {!hiddenHeader && (
                  <>
                    <div className="left-6 top-5 absolute flex z-[1]">
                      <button
                        className="modal-close text-gray-500 hover:text-gray-700 focus:outline-none"
                        onClick={onClose}
                      >
                        {buttonLeft ?? <IoClose size={24} />}
                      </button>
                    </div>
                    <header
                      className={`pl-6 pr-6 pb-0 pt-0 border-gray-300 flex justify-between items-center min-h-[64px]`}
                      style={{
                        borderBottomWidth: hiddenHeaderBorder ? 0 : 1,
                      }}
                    >
                      <div className="flex-grow-0 flex-shrink-0 basis-4 text-left"></div>
                      <div className="overflow-hidden flex-grow-0 flex-shrink basis-auto text-center ml-4 mr-4 flex items-center justify-center w-full">
                        <h2 className="text-base font-semibold text-black p-0 m-0">
                          {title}
                        </h2>
                      </div>
                      <div className="flex-grow-0 flex-shrink-0 basis-4 text-right"></div>
                    </header>
                  </>
                )}

                <div className="h-auto overflow-y-auto pl-6 pr-6">
                  <div>{children}</div>
                  {/* <Modal.footer>
            
                  </Modal.footer> */}
                </div>
              </div>
            </div>

            <div className="p-0 -mt-px" aria-hidden="true"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

Modal.footer = ({ children }) => {
  return (
    <div className="xs:fixed xs:bottom-4 xs:right-0 xs:left-0 xs:px-6 md:pt-12 md:pb-4">
      {children}
    </div>
  );
};

export default Modal;
