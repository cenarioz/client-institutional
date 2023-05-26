"use client";
import Image from "next/image";
import React from "react";
import { IoGlobeOutline } from "react-icons/io5";
import Dropdown from "./dropdown";

export default function Nav() {
  const [variant, setVariant] = React.useState("static");

  const variants = ["static", "floating", "sticky"];
  const items = [
    { value: "1", label: "Português" },
    { value: "2", label: "Inglês" },
    { value: "3", label: "Espanhol" },
  ];
  const handleSelect = (value: string) => {
    console.log("Selected:", value);
  };
  return (
    <nav className="bg-transparent absolute z-10 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <a href="#" className="text-white font-bold text-xl flex items-center gap-3">
              <Image
                src="/logo.svg"
                alt="Vercel Logo"
                className="text-white"
                width={50}
                height={35}
                priority
              />
              Cenárioz
            </a>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-5 text-gray-300 hover:text-white">
              <a
                href="#"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Anuncie seu espaço
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Entrar
              </a>
              <a href="#" className="px-3 py-2 rounded-md text-sm font-medium">
                Cadastrar
              </a>
              <Dropdown items={items} onSelect={handleSelect}>
                <IoGlobeOutline size={22} />
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
