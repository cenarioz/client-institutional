import React, { ReactNode, useEffect, useRef, useState } from "react";

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

  useEffect(() => {
    const handleResize = () => {
      setIsOpen(false);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="dropdown" ref={dropdownRef}>
      <button
        className=""
        type="button"
        onClick={toggleDropdown}
      >
        {children}
      </button>
      {isOpen && (
        <ul className="dropdown-menu text-black text-sm">
          {items.map((item) => (
            <li key={item.value} onClick={() => handleSelect(item)}>
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
