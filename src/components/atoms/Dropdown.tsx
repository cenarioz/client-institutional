import React, { ReactNode, useEffect, useRef, useState } from "react";
import { createPopper } from '@popperjs/core';
interface DropdownItem {
  value: string;
  label: string;
}

interface DropdownProps {
  items: DropdownItem[];
  onSelect: (value: string) => void;
  children: ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({ children, items, onSelect }) => {
  const [selectedItem, setSelectedItem] = useState<DropdownItem | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const referenceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (referenceRef.current && dropdownRef.current) {
      const popper = createPopper(referenceRef.current as Element, dropdownRef.current, {
        placement: 'bottom-start', // ou qualquer outra posição desejada
      });

      return () => {
        popper.destroy();
      };
    }

    return undefined;
  }, [isOpen]);

  const handleSelect = (item: DropdownItem) => {
    setSelectedItem(item);
    onSelect(item.value);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div ref={referenceRef}>
        <button onClick={toggleDropdown}>
          {children}
        </button>
      </div>

      {isOpen && (
        <div ref={dropdownRef} className="dropdown-menu text-black text-sm">
          {items.map((item) => (
            <li key={item.value} onClick={() => handleSelect(item)}>
              {item.label}
            </li>
          ))}
          <div id="arrow" data-popper-arrow></div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
