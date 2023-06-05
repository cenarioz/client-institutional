'use-client'
import React, { ReactNode, useEffect, useRef, useState } from "react";
import { TfiClose } from "react-icons/tfi";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
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
  size,
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
    <div className="fixed inset-0 items-center justify-center z-50">
      <div className="modal-overlay bg-black opacity-50 fixed inset-0"></div>
      <div
        ref={modalRef}
        className={`modal overflow-y-auto bg-white rounded-md p-4 xs:pt-12 relative w-full max-w-md mx-auto ${
          isOpen
            ? `sm:max-w-full xs:h-screen md:h-auto md:w-4/5 lg:w-3/5  ${modalSize()}`
            : ""
        }`}
      >
        <div className="modal-header flex justify-between items-center mb-8">
          <button
            className="modal-close text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={onClose}
          >
            <TfiClose size={20} />
          </button>
          <div className="flex items-center justify-center w-full">
            <h2 className="text-lg font-semibold text-black">{title}</h2>
          </div>
        </div>
        <div className="modal-body">{children}</div>
        <Modal.footer>{/* Conteúdo do rodapé do modal */}</Modal.footer>
      </div>
    </div>
  );
};

Modal.footer = ({ children }) => {
  return (
    <div className="modal-footer xs:absolute xs:bottom-8 xs:right-0 xs:left-0 xs:px-3">
      {children}
    </div>
  );
};

export default Modal;
