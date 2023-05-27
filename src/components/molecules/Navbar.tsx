"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { IoGlobeOutline } from "react-icons/io5";
import Divisor from "../atoms/Divisor";
import Dropdown from "../atoms/Dropdown";
import InputWithLabel from "../atoms/Input";
import Modal from "../molecules/Modal";
import Search from "./Search";

interface NavBarProps {
  search?: boolean;
  divisor?: boolean;
}
export default function Nav({ search, divisor }: NavBarProps) {
  const [loginVisible, setLoginVisible] = React.useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const router = useRouter();
  const t = useTranslations();
  const items = [
    { value: "pt-BR", label: t("navBar.dropDown.portuguese") },
    { value: "en", label: t("navBar.dropDown.english") },
    { value: "es", label: t("navBar.dropDown.spanish") },
  ];

  const handleSelect = (value: string) => {
    router.push(value);
  };

  const menuItems = [
    {
      value: (
        <a
          href="#"
          className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
        >
          {t("navBar.advertiseYourSpace")}
        </a>
      ),
    },
    {
      value: (
        <button
          key={Math.random()}
          onClick={() => setLoginVisible(true)}
          className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
        >
          {t("navBar.logIn")}
        </button>
      ),
    },
    {
      value: (
        <button
          key={Math.random()}
          onClick={() => setLoginVisible(true)}
          className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
        >
          {t("navBar.signUp")}
        </button>
      ),
    },
    {
      action: () => setLoginVisible(true),
      value: (
        <Dropdown key={"dropdown"} items={items} onSelect={handleSelect}>
          <IoGlobeOutline size={22} />
        </Dropdown>
      ),
    },
  ];

  return (
    <>
      <Modal
        isOpen={loginVisible}
        onClose={() => setLoginVisible(false)}
        title="Entrar ou Cadastrar-se"
        size={"sm"}
      >
        <div className="flex flex-col gap-4">
          <h1 className="text-xl text-gray-700 font-semibold">
            Bem vindo a CenárioZ
          </h1>
          <InputWithLabel label={"Qual seu email ?"}></InputWithLabel>
          <p className="text-sm text-gray-500">
            Enviaremos um e-mail para confirmar sua identidade.
          </p>
        </div>
        <Modal.footer>
          <div className="flex flex-col pt-6 mt-6">
            <button className="bg-violet-600 text-white py-2 rounded-md px-12 mb-4">
              Continuar
            </button>
            <Divisor />
            <button className="bg-transparent text-violet-600 py-2 rounded-md border border-violet-700 px-4 mt-4 flex flex-row items-center">
              <div>
                <FcGoogle size={24}></FcGoogle>
              </div>
              <div className="w-full text-center -ml-6">
                Continuar com o Google
              </div>
            </button>
          </div>
        </Modal.footer>
      </Modal>

      <nav className="bg-transparent absolute z-10 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <a
                href="#"
                className="text-white font-bold text-xl flex items-center gap-3"
              >
                <Image
                  src="/logo.svg"
                  alt="Vercel Logo"
                  className="text-white fill-black"
                  width={50}
                  height={35}
                  priority
                />
                Cenárioz
              </a>
            </div>
            <div className="hidden md:block">
              {search && <Search />}
              <div className="ml-10 flex items-center space-x-5 text-gray-300">
                {menuItems.map((item) => {
                  return item.value;
                })}
              </div>
            </div>
            <div className="-mr-2 flex z-10 items-center sm:hidden">
              <button
                onClick={handleToggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              >
                <span className="sr-only">Open main menu</span>
                {/* Ícone do Menu */}
                <svg
                  className={`${isOpen ? "hidden" : "block"} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                {/* Ícone de Fechar */}
                <svg
                  className={`${isOpen ? "block" : "hidden"} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div
              className={`${
                isOpen ? "block" : "hidden"
              } sm:hidden absolute top-0 left-0 right-0 bg-black h-screen backdrop-blur-sm bg-opacity-90`}
            >
              <div className="px-2 pt-2 pb-3 flex flex-col items-start mt-8 text-white ">
                {menuItems.map((item) => {
                  return item.value;
                })}
              </div>
            </div>
          </div>
        </div>

        {divisor && <Divisor />}
      </nav>
    </>
  );
}
