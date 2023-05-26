"use client";
import { useTranslations } from 'next-intl';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { IoGlobeOutline } from "react-icons/io5";
import Divisor from "../atoms/Divisor";
import Dropdown from "../atoms/Dropdown";
import InputWithLabel from "../atoms/Input";
import Modal from "../molecules/Modal";

export default function Nav() {
  const [loginVisible, setLoginVisible] = React.useState(false);
  const router = useRouter()
  const t = useTranslations();
  const items = [
    { value: "pt-BR", label: t("navBar.dropDown.portuguese")},
    { value: "en", label: t("navBar.dropDown.english") },
    { value: "es", label: t("navBar.dropDown.spanish") },
  ];
  const handleSelect = (value: string) => {
    router.push(value)
  };
  return (
    <>
      <Modal
        isOpen={loginVisible}
        onClose={() => setLoginVisible(false)}
        title="Entrar ou Cadastrar-se"
        size={'sm'}
      >
        <div className="flex flex-col gap-4">
          <h1 className="text-xl text-gray-700 font-semibold">
            Bem vindo a CenárioZ
          </h1>
          <InputWithLabel label={"Qual seu email ?"}></InputWithLabel>
          <p className="text-sm text-gray-500">Enviaremos um e-mail para confirmar sua identidade .</p>
        </div>
        <Modal.footer>
          <div className="flex flex-col pt-6 mt-6">
            <button className="bg-violet-600 text-white py-2 rounded-md px-12 mb-4">
              Continuar
            </button>
            <Divisor ></Divisor>
            <button className="bg-transparent text-violet-600 py-2 rounded-md border border-violet-700 px-4 mt-4 flex flex-row items-center">
              <div><FcGoogle size={24}></FcGoogle></div>
              <div className="w-full text-center -ml-6">Continuar com o Google</div>
              
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
                  className="text-white"
                  width={50}
                  height={35}
                  priority
                />
                Cenárioz
              </a>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-5 text-gray-300">
                <a
                  href="#"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  {t("navBar.advertiseYourSpace")}
                </a>
                <button
                  onClick={() => setLoginVisible(true)}
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  {t("navBar.logIn")}
                </button>
                <button
                  onClick={() => setLoginVisible(true)}
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                   {t("navBar.signUp")}
                </button>
                <Dropdown items={items} onSelect={handleSelect}>
                  <IoGlobeOutline size={22} />
                </Dropdown>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
