"use client";
import { checkEmail, login, signup } from "@/utils/auth.api";
import { useAppDispatch } from "@/utils/redux/hooks";
import { loginSuccess, logoutSuccess } from "@/utils/redux/slices/userSlice";
import { Field, Form, Formik } from "formik";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import {
  IoCheckmarkCircle,
  IoChevronBack,
  IoCloseCircle,
  IoGlobeOutline,
  IoPersonCircleOutline,
} from "react-icons/io5";
import { useSelector } from "react-redux";
import ButtonFull from "../atoms/ButtonFull";
import Checkbox from "../atoms/Checkbox";
import Divisor from "../atoms/Divisor";
import Dropdown from "../atoms/Dropdown";
import CustomInput from "../atoms/InputCustom";
import Modal from "../molecules/Modal";
import Search from "./Search";

interface NavBarProps {
  search?: boolean;
  divisor?: boolean;
  fill?: string;
  searchSize?: "xs" | "sm" | "md" | "lg";
}

function calculateAge(dateOfBirth: Date) {
  const today = new Date();
  const birthdate = new Date(dateOfBirth);
  return (
    today.getFullYear() -
    birthdate.getFullYear() -
    (today.getMonth() < birthdate.getMonth() ||
    (today.getMonth() === birthdate.getMonth() &&
      today.getDate() < birthdate.getDate())
      ? 1
      : 0)
  );
}

export default function Nav({
  search,
  divisor,
  fill,
  searchSize,
}: NavBarProps) {
  const [loginVisible, setLoginVisible] = React.useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [signupModalIsOpen, setSignupModalIsOpen] = useState(false);
  const [signupModalSteps, setSignupModalSteps] = useState(0);
  const [email, setEmail] = useState("");
  const [passwordAttr, setPasswordAttr] = useState({
    length: false,
    hasNumberOrSymbol: false,
    hasEmail: false,
    hasName: false,
    strong: "Fraca",
  });
  const [signUpData, setSignUpData] = useState({
    name: "",
    last_name: "",
    password: "",
    email: "",
    birthdate: "",
    sms_marketing: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const isLoggedIn = useSelector((state: any) => state.persistedUser.isLoggedIn);
  const dispatch = useAppDispatch();

  const handleSignupSubmit = async (values: any, {}) => {
    setIsLoading(true);
    setSignUpData(values);
    setIsLoading(false);
    setSignupModalSteps(2);
  };
  
  const handleAcceptTermsAndSignupSubmit = async () => {
    setIsLoading(true);
    const user = await signup({
      ...signUpData,
      sms_marketing: !signUpData.sms_marketing,
    });
    setIsLoading(false);
    if (user.data) {
      dispatch(loginSuccess(user.data));
      setSignupModalSteps(5);
    } else {
      setSignupModalSteps(1);
    }
  };

  const handleCheckEmailSubmit = async (values: any, {}) => {
    setIsLoading(true);
    const user = await checkEmail(values.email);
    setEmail(values.email);

    setIsLoading(false);
    if (!user.data) {
      setSignupModalSteps(4);
    } else {
      setSignupModalSteps(1);
    }
  };

  const handleLoginSubmit = async (values: any, {}) => {
    setIsLoading(true);
    const user = await login(email, values.password);
    setIsLoading(false);
    if (!user.data) {
      console.log("deu ruim");
    } else {
      dispatch(loginSuccess(user.data));
      setSignupModalIsOpen(false);
    }
  };

  const checkEmailDefaultValue = {
    email: "",
  };
  const loginWithPassDefaultValue = {
    password: "",
  };
  const signupDefaultValue = {
    name: "",
    last_name: "",
    birthdate: "",
    email,
    password: "",
    sms_marketing: false,
  };

  const validateCheckEmailForm = (values: any) => {
    const errors: any = {};
    if (!values.email) {
      errors.email = "Email é obrigatório.";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Insira um email válido.";
    }

    return errors;
  };
  const validateSignupForm = (values: any) => {
    const errors: any = {};
    if (!values.email) {
      errors.email = "Email é obrigatório.";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Insira um email válido.";
    }
    if (!values.name) errors.name = "Nome é obrigatório.";
    if (!values.last_name) errors.last_name = "Sobrenome é obrigatório.";
    if (!values.password) {
      setPasswordAttr(() => ({
        hasEmail: false,
        hasNumberOrSymbol: false,
        length: false,
        hasName: false,
        strong: "Fraca",
      }));
      errors.password = "Senha é obrigatório.";
    }
    if (values.password) {
      if (values.password.length < 8) {
        setPasswordAttr((prevUserInfo) => ({
          ...prevUserInfo,
          length: false,
        }));
      } else {
        setPasswordAttr((prevUserInfo) => ({
          ...prevUserInfo,
          length: true,
        }));
      }

      const hasNumberOrSymbol = /[0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(
        values.password
      );
      if (!hasNumberOrSymbol) {
        setPasswordAttr((prevUserInfo) => ({
          ...prevUserInfo,
          hasNumberOrSymbol: false,
        }));
      } else {
        setPasswordAttr((prevUserInfo) => ({
          ...prevUserInfo,
          hasNumberOrSymbol: true,
        }));
      }

      const lowerCasePassword = values.password.toLowerCase().trim();

      if (values.name) {
        if (lowerCasePassword.includes(values.name.toLowerCase().trim())) {
          setPasswordAttr((prevUserInfo) => ({
            ...prevUserInfo,
            hasName: true,
          }));
        } else {
          setPasswordAttr((prevUserInfo) => ({
            ...prevUserInfo,
            hasName: false,
          }));
        }
      }
      if (values.email) {
        if (lowerCasePassword.includes(values.email.toLowerCase())) {
          setPasswordAttr((prevUserInfo) => ({
            ...prevUserInfo,
            hasEmail: true,
          }));
        } else {
          setPasswordAttr((prevUserInfo) => ({
            ...prevUserInfo,
            hasEmail: false,
          }));
        }
      }
      const hasUppercase = /[A-Z]/.test(values.password);
      const hasLowercase = /[a-z]/.test(values.password);
      const hasNumbers = /\d/.test(values.password);
      const hasSpecialChars = /[!@#$%^&*]/.test(values.password);

      if (
        !passwordAttr.hasEmail &&
        !passwordAttr.hasName &&
        passwordAttr.hasNumberOrSymbol &&
        passwordAttr.length &&
        hasUppercase &&
        hasLowercase &&
        hasNumbers &&
        hasSpecialChars
      ) {
        setPasswordAttr((prevUserInfo) => ({
          ...prevUserInfo,
          strong: "Forte",
        }));
      } else if (
        !passwordAttr.hasEmail &&
        !passwordAttr.hasName &&
        passwordAttr.hasNumberOrSymbol &&
        passwordAttr.length
      ) {
        setPasswordAttr((prevUserInfo) => ({
          ...prevUserInfo,
          strong: "Boa",
        }));
      }
    }
    if (!values.birthdate) {
      errors.birthdate = "Selecione sua data de nascimento para continuar.";
    } else if (values.birthdate && calculateAge(values.birthdate) < 18)
      errors.birthdate =
        "Você deve ter 18 anos ou mais para usar o Airbnb. Outras pessoas não verão sua data de nascimento.";
    return errors;
  };
  const validateloginWithPassForm = (values: any) => {
    const errors: any = {};
    if (!values.password) {
      errors.password = "A senha é obrigatória.";
    }
    return errors;
  };

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const router = useRouter();
  const path = usePathname();
  const t = useTranslations();
  const items = [
    { value: "pt-BR", label: t("navBar.dropDown.portuguese") },
    { value: "en", label: t("navBar.dropDown.english") },
    { value: "es", label: t("navBar.dropDown.spanish") },
  ];
  const userDropdown = [{ value: "logout", label: "Sair" }];

  const handleSelect = (value: string) => {
    router.push(`${value}/${path.replace("en", "").replace("es", "")}`);
    router.refresh();
  };

  const handleSelectUserDropdown = (value: string) => {
    if (value === "logout") dispatch(logoutSuccess());
    router.refresh();
  };

  const menuItems = [
    {
      value: (
        <button
          key={Math.random()}
          onClick={() => ""}
          className="hover:opacity-50 px-3 py-2 rounded-md text-sm font-medium"
        >
          {t("navBar.advertiseYourSpace")}
        </button>
      ),
    },
    {
      value: !isLoggedIn && (
        <button
          key={Math.random()}
          onClick={() => setSignupModalIsOpen(true)}
          className="hover:opacity-50 px-3 py-2 rounded-md text-sm font-medium"
        >
          {t("navBar.logIn")}
        </button>
      ),
    },
    {
      value: !isLoggedIn && (
        <button
          key={Math.random()}
          onClick={() => setSignupModalIsOpen(true)}
          className="hover:opacity-50 px-3 py-2 rounded-md text-sm font-medium"
        >
          {t("navBar.signUp")}
        </button>
      ),
    },
    {
      value: (
        <Dropdown key={"dropdown"} items={items} onSelect={handleSelect}>
          <IoGlobeOutline size={22} />
        </Dropdown>
      ),
    },
    {
      value: isLoggedIn && (
        <Dropdown
          key={"user"}
          items={userDropdown}
          onSelect={handleSelectUserDropdown}
        >
          <IoPersonCircleOutline size={26} />
        </Dropdown>
      ),
    },
  ];

  const handleSignupModal = () => {
    if (signupModalSteps === 0)
      return (
        <>
          <Modal
            isOpen={signupModalIsOpen}
            onClose={() => setSignupModalIsOpen(false)}
            title="Entrar ou cadastrar-se"
            size={"sm"}
          >
            <Formik
              key={"validateEmailForm"}
              initialValues={checkEmailDefaultValue}
              onSubmit={handleCheckEmailSubmit}
              validate={validateCheckEmailForm}
            >
              <Form>
                <div className="flex flex-col gap-4 mt-6">
                  <h1 className="text-xl text-gray-700 font-semibold">
                    Bem-vindo a Cenarioz
                  </h1>

                  <div>
                    <Field
                      key={"email"}
                      label="email"
                      type="text"
                      name="email"
                      component={CustomInput}
                    />
                  </div>
                </div>
                <div className="flex flex-col mt-6 mb-6">
                  <ButtonFull
                    isLoading={isLoading}
                    value="Continuar"
                  ></ButtonFull>

                  <Divisor />

                  <button className="bg-transparent text-violet-600 py-3 rounded-md border border-violet-700 px-4 mt-4 flex flex-row items-center">
                    <div>
                      <FcGoogle size={24}></FcGoogle>
                    </div>
                    <div className="w-full text-center -ml-6">
                      Continuar com o Google
                    </div>
                  </button>
                </div>
              </Form>
            </Formik>
          </Modal>
        </>
      );
    if (signupModalSteps === 1)
      return (
        <>
          <Modal
            isOpen={signupModalIsOpen}
            onClose={() => setSignupModalSteps(0)}
            title="Cadastrar-se"
            size={"sm"}
            buttonLeft={
              <IoChevronBack size={24} fill="#222222"></IoChevronBack>
            }
          >
            <Formik
              key={"signupForm"}
              initialValues={signupDefaultValue}
              onSubmit={handleSignupSubmit}
              validate={validateSignupForm}
            >
              <Form>
                <div className="flex flex-col gap-4 mt-6">
                  <Field
                    key={"name"}
                    label="Nome"
                    type="text"
                    name="name"
                    component={CustomInput}
                  />
                  <Field
                    key={"last_name"}
                    label="Sobrenome"
                    type="text"
                    name="last_name"
                    info="Certifique-se de que corresponde ao nome no seu documento de identificação oficial."
                    component={CustomInput}
                  />
                  <Field
                    key={"birthdate"}
                    label="Data de nascimento"
                    type="Date"
                    name="birthdate"
                    component={CustomInput}
                    info="Para se cadastrar, você precisa ter pelo menos 18 anos. A
                    data do seu aniversário não será compartilhada com outros
                    usuários."
                  />

                  <Field
                    key={"signupEmail"}
                    label="Email"
                    type="text"
                    name="email"
                    component={CustomInput}
                    info="Vamos enviar confirmações de viagem e recibos para você por
                    email.."
                  />

                  <Field
                    key={"signupPassword"}
                    label="Senha"
                    type="password"
                    name="password"
                    component={CustomInput}
                  />
                  <div className="text-xs">
                    <p
                      className={`${
                        passwordAttr.strong != "Fraca"
                          ? "text-green-600"
                          : "text-orange-500"
                      } flex gap-1 items-center`}
                    >
                      {passwordAttr.strong === "Fraca" ? (
                        <IoCloseCircle />
                      ) : (
                        <IoCheckmarkCircle />
                      )}
                      Força da senha: {passwordAttr.strong}
                    </p>

                    {passwordAttr.strong === "Fraca" && (
                      <>
                        <p
                          className={`${
                            !passwordAttr.hasEmail && !passwordAttr.hasName
                              ? "text-green-600"
                              : "text-orange-500"
                          } flex gap-1 items-center`}
                        >
                          {!passwordAttr.hasEmail && !passwordAttr.hasName ? (
                            <IoCheckmarkCircle />
                          ) : (
                            <IoCloseCircle />
                          )}
                          Não pode conter seu nome nem seu endereço de email
                        </p>
                        <p
                          className={`${
                            passwordAttr.length
                              ? "text-green-600"
                              : "text-orange-500"
                          }  flex gap-1 items-center`}
                        >
                          {passwordAttr.length ? (
                            <IoCheckmarkCircle />
                          ) : (
                            <IoCloseCircle />
                          )}
                          Pelo menos 8 caracteres
                        </p>
                        <p
                          className={`${
                            passwordAttr.hasNumberOrSymbol
                              ? "text-green-600"
                              : "text-orange-500"
                          } flex gap-1 items-center`}
                        >
                          {passwordAttr.hasNumberOrSymbol ? (
                            <IoCheckmarkCircle />
                          ) : (
                            <IoCloseCircle />
                          )}
                          Contém um número ou símbolo
                        </p>
                      </>
                    )}
                  </div>

                  <p className="text-xs font-normal text-gray-500">
                    Ao selecionar Concordar e continuar, eu concordo com os
                    Termos de Serviço, os Termos de Serviço de Pagamentos, a
                    Política de Não Discriminação e reconheço a Política de
                    Privacidade.
                  </p>
                </div>
                <div className="flex flex-col pt-6 mt-6 mb-6">
                  <ButtonFull
                    isLoading={isLoading}
                    value="Concordar e Continuar"
                  ></ButtonFull>

                  <Divisor />
                  <p className="text-sm text-gray-500 py-4">
                    A Cenarioz enviará notificações push, ideias inspiradoras,
                    emails promocionais e ofertas exclusivas para membros. Você
                    pode cancelar o recebimento dessas mensagens quando quiser
                    ao acessar as configurações da sua conta ou diretamente nas
                    notificações promocionais. Não quero receber mensagens de
                    marketing da Cenarioz.
                  </p>
                  <div className="py-4">
                    <Field
                      key={"signupsms_marketing"}
                      type="checkbox"
                      name="sms_marketing"
                      label={
                        "Não quero receber mensagens de marketing da Cenarioz."
                      }
                      component={Checkbox}
                    ></Field>
                  </div>
                </div>
              </Form>
            </Formik>
          </Modal>
        </>
      );
    if (signupModalSteps === 2) {
      return (
        <>
          <Modal
            isOpen={signupModalIsOpen}
            onClose={() => setSignupModalIsOpen(false)}
            title="Cadastrar-se"
            size={"sm"}
            hiddenHeader
          >
            <div className="mt-8 mb-4">
              <svg
                width="50"
                height="50"
                viewBox="0 0 101 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_1804_1416)">
                  <mask id="path-1-inside-1_1804_1416" fill="white">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M18.0438 16.7927H66.1987H66.1988C73.7429 16.7927 79.8586 22.9084 79.8586 30.4525C79.8586 37.9966 73.7429 44.1123 66.1988 44.1123H66.1987H17.9876V44.1122C10.4435 44.1122 4.32788 37.9965 4.32788 30.4524C4.32788 22.9083 10.4436 16.7926 17.9877 16.7926C18.0064 16.7926 18.0251 16.7926 18.0438 16.7927Z"
                    />
                  </mask>
                  <path
                    d="M18.0438 16.7927L18.0237 21.7927L18.0337 21.7927H18.0438V16.7927ZM17.9876 44.1123H12.9876V49.1123H17.9876V44.1123ZM17.9876 44.1122H22.9876V39.1123L17.9876 39.1122L17.9876 44.1122ZM66.1987 11.7927H18.0438V21.7927H66.1987V11.7927ZM66.1988 11.7927H66.1987V21.7927H66.1988V11.7927ZM84.8586 30.4525C84.8586 20.147 76.5043 11.7927 66.1988 11.7927V21.7927C70.9815 21.7927 74.8586 25.6698 74.8586 30.4525H84.8586ZM66.1988 49.1123C76.5043 49.1123 84.8586 40.7581 84.8586 30.4525H74.8586C74.8586 35.2352 70.9815 39.1123 66.1988 39.1123V49.1123ZM66.1987 49.1123H66.1988V39.1123H66.1987V49.1123ZM17.9876 49.1123H66.1987V39.1123H17.9876V49.1123ZM12.9876 44.1122V44.1123H22.9876V44.1122H12.9876ZM17.9876 39.1122C13.205 39.1122 9.32788 35.2351 9.32788 30.4524H-0.672119C-0.672119 40.7579 7.68207 49.1121 17.9875 49.1122L17.9876 39.1122ZM9.32788 30.4524C9.32788 25.6697 13.205 21.7926 17.9877 21.7926V11.7926C7.68216 11.7926 -0.672119 20.1469 -0.672119 30.4524H9.32788ZM17.9877 21.7926C17.9997 21.7926 18.0117 21.7926 18.0237 21.7927L18.0639 11.7928C18.0385 11.7927 18.0131 11.7926 17.9877 11.7926V21.7926Z"
                    fill={"#4E20E0"}
                    mask="url(#path-1-inside-1_1804_1416)"
                  />
                  <mask id="path-3-inside-2_1804_1416" fill="white">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M74.1297 18.9503C80.3298 23.2484 81.8716 31.7587 77.5735 37.9588L77.5225 38.0319L50.1534 77.5122C50.1379 77.5349 50.1222 77.5576 50.1065 77.5802C45.8085 83.7803 37.2981 85.3221 31.0981 81.024C24.8981 76.726 23.3562 68.2157 27.6542 62.0157L27.654 62.0156L55.121 22.394L55.1213 22.3941C59.4194 16.1941 67.9297 14.6522 74.1297 18.9503Z"
                    />
                  </mask>
                  <path
                    d="M77.5735 37.9588L81.6737 40.8204L81.6782 40.8139L81.6827 40.8074L77.5735 37.9588ZM74.1297 18.9503L71.2811 23.0595L71.2811 23.0595L74.1297 18.9503ZM77.5225 38.0319L73.4224 35.1702L73.4179 35.1767L73.4133 35.1832L77.5225 38.0319ZM50.1534 77.5122L46.0442 74.6635L46.0358 74.6757L46.0274 74.688L50.1534 77.5122ZM50.1065 77.5802L45.9974 74.7315L45.9973 74.7316L50.1065 77.5802ZM31.0981 81.024L28.2494 85.1332H28.2495L31.0981 81.024ZM27.6542 62.0157L31.7634 64.8643L34.5979 60.7754L30.5231 57.9207L27.6542 62.0157ZM27.654 62.0156L23.5448 59.167L20.7102 63.2558L24.785 66.1106L27.654 62.0156ZM55.121 22.394L57.1919 17.843L53.391 16.1134L51.0118 19.5453L55.121 22.394ZM55.1213 22.3941L53.0504 26.9451L56.8513 28.6746L59.2305 25.2427L55.1213 22.3941ZM81.6827 40.8074C87.554 32.3379 85.4478 20.7124 76.9784 14.8411L71.2811 23.0595C75.2117 25.7843 76.1892 31.1796 73.4644 35.1101L81.6827 40.8074ZM81.6226 40.8935L81.6737 40.8204L73.4734 35.0971L73.4224 35.1702L81.6226 40.8935ZM54.2626 80.3608L81.6317 40.8805L73.4133 35.1832L46.0442 74.6635L54.2626 80.3608ZM46.0274 74.688C46.0173 74.7027 46.0073 74.7172 45.9974 74.7315L54.2156 80.429C54.2371 80.398 54.2584 80.3671 54.2794 80.3364L46.0274 74.688ZM45.9973 74.7316C43.2725 78.6622 37.8773 79.6397 33.9467 76.9149L28.2495 85.1332C36.7189 91.0045 48.3444 88.8983 54.2157 80.4289L45.9973 74.7316ZM33.9467 76.9149C30.0161 74.1901 29.0387 68.7949 31.7634 64.8643L23.545 59.1672C17.6738 67.6366 19.7801 79.2619 28.2494 85.1332L33.9467 76.9149ZM24.785 66.1106L24.7852 66.1107L30.5231 57.9207L30.5229 57.9206L24.785 66.1106ZM51.0118 19.5453L23.5448 59.167L31.7632 64.8642L59.2302 25.2426L51.0118 19.5453ZM57.1922 17.8431L57.1919 17.843L53.0502 26.945L53.0504 26.9451L57.1922 17.8431ZM76.9784 14.8411C68.5089 8.96981 56.8834 11.076 51.0121 19.5455L59.2305 25.2427C61.9553 21.3121 67.3505 20.3347 71.2811 23.0595L76.9784 14.8411Z"
                    fill={"#4E20E0"}
                    mask="url(#path-3-inside-2_1804_1416)"
                  />
                  <mask id="path-5-inside-3_1804_1416" fill="white">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M38.8789 56.1649H87.0899H87.0901C94.6341 56.165 100.75 62.2807 100.75 69.8247C100.75 77.3688 94.6341 83.4845 87.0901 83.4845H87.0899H38.9789C38.9457 83.4848 38.9125 83.4849 38.8792 83.4849C31.3351 83.4849 25.2194 77.3692 25.2194 69.8251C25.2194 62.2811 31.3349 56.1654 38.8789 56.1653V56.1649Z"
                    />
                  </mask>
                  <path
                    d="M38.8789 56.1649V51.1649H33.8789V56.1649H38.8789ZM87.0901 56.1649L87.0901 51.1649H87.0901V56.1649ZM87.0901 83.4845V88.4845H87.0901L87.0901 83.4845ZM38.9789 83.4845V78.4845H38.961L38.9431 78.4847L38.9789 83.4845ZM38.8789 56.1653L38.879 61.1653L43.8789 61.1652V56.1653H38.8789ZM87.0899 51.1649H38.8789V61.1649H87.0899V51.1649ZM87.0901 51.1649H87.0899V61.1649H87.0901V51.1649ZM105.75 69.8247C105.75 59.5193 97.3956 51.165 87.0901 51.1649L87.09 61.1649C91.8727 61.165 95.7498 65.0421 95.7498 69.8247H105.75ZM87.0901 88.4845C97.3956 88.4845 105.75 80.1302 105.75 69.8247H95.7498C95.7498 74.6074 91.8727 78.4845 87.09 78.4845L87.0901 88.4845ZM87.0899 88.4845H87.0901V78.4845H87.0899V88.4845ZM38.9789 88.4845H87.0899V78.4845H38.9789V88.4845ZM38.9431 78.4847C38.9219 78.4848 38.9006 78.4849 38.8792 78.4849V88.4849C38.9243 88.4849 38.9695 88.4847 39.0148 88.4844L38.9431 78.4847ZM38.8792 78.4849C34.0965 78.4849 30.2194 74.6078 30.2194 69.8251H20.2194C20.2194 80.1306 28.5736 88.4849 38.8792 88.4849V78.4849ZM30.2194 69.8251C30.2194 65.0425 34.0964 61.1654 38.879 61.1653L38.8789 51.1653C28.5735 51.1654 20.2194 59.5197 20.2194 69.8251H30.2194ZM33.8789 56.1649V56.1653H43.8789V56.1649H33.8789Z"
                    fill={"#4E20E0"}
                    mask="url(#path-5-inside-3_1804_1416)"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1804_1416">
                    <rect
                      width="100"
                      height="100"
                      fill="white"
                      transform="translate(0.75)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div className="flex flex-col mb-6">
              <h1 className="block mb-0 mt-0 m">
                <span className="block mt-4 mb-4 text-sm font-medium">
                  Nosso compromisso da comunidade
                </span>
                <span className="text-2xl font-bold mt-4 mb-6 leading-8">
                  A Cenarioz é uma comunidade onde todos podem ser livres e
                  criativos, em qualquer lugar
                </span>
              </h1>

              <h2 className="mt-6 mb-6">
                Para garantir isso, pedimos que você se comprometa com o
                seguinte:
              </h2>
              <p>
                Concordo em tratar todas as pessoas da comunidade da Cenarioz
                com respeito e sem julgamentos ou preconceitos,
                independentemente de sua raça, religião, nacionalidade, etnia,
                cor da pele, deficiência, sexo, identidade de gênero, orientação
                sexual ou idade.
              </p>

              <p className="mt-6 mb-6 underline">Saiba mais </p>
              <ButtonFull
                onClick={() => handleAcceptTermsAndSignupSubmit()}
                isLoading={isLoading}
                value="Concordar e Continuar"
              ></ButtonFull>

              <button
                onClick={() => setSignupModalSteps(3)}
                className="bg-transparent border border-gray-900 text-gray-900 hover:bg-gray-100 py-3 rounded-md px-12 mb-4"
              >
                Recusar
              </button>
            </div>
          </Modal>
        </>
      );
    }
    if (signupModalSteps === 5) {
      return (
        <>
          <Modal
            isOpen={signupModalIsOpen}
            onClose={() => setSignupModalIsOpen(false)}
            title="Cadastrar-se"
            size={"sm"}
            hiddenHeader
          >
            <div className="mt-8 mb-4 text-center flex justify-center">
              <svg
                width="70"
                height="70"
                viewBox="0 0 101 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_1804_1416)">
                  <mask id="path-1-inside-1_1804_1416" fill="white">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M18.0438 16.7927H66.1987H66.1988C73.7429 16.7927 79.8586 22.9084 79.8586 30.4525C79.8586 37.9966 73.7429 44.1123 66.1988 44.1123H66.1987H17.9876V44.1122C10.4435 44.1122 4.32788 37.9965 4.32788 30.4524C4.32788 22.9083 10.4436 16.7926 17.9877 16.7926C18.0064 16.7926 18.0251 16.7926 18.0438 16.7927Z"
                    />
                  </mask>
                  <path
                    d="M18.0438 16.7927L18.0237 21.7927L18.0337 21.7927H18.0438V16.7927ZM17.9876 44.1123H12.9876V49.1123H17.9876V44.1123ZM17.9876 44.1122H22.9876V39.1123L17.9876 39.1122L17.9876 44.1122ZM66.1987 11.7927H18.0438V21.7927H66.1987V11.7927ZM66.1988 11.7927H66.1987V21.7927H66.1988V11.7927ZM84.8586 30.4525C84.8586 20.147 76.5043 11.7927 66.1988 11.7927V21.7927C70.9815 21.7927 74.8586 25.6698 74.8586 30.4525H84.8586ZM66.1988 49.1123C76.5043 49.1123 84.8586 40.7581 84.8586 30.4525H74.8586C74.8586 35.2352 70.9815 39.1123 66.1988 39.1123V49.1123ZM66.1987 49.1123H66.1988V39.1123H66.1987V49.1123ZM17.9876 49.1123H66.1987V39.1123H17.9876V49.1123ZM12.9876 44.1122V44.1123H22.9876V44.1122H12.9876ZM17.9876 39.1122C13.205 39.1122 9.32788 35.2351 9.32788 30.4524H-0.672119C-0.672119 40.7579 7.68207 49.1121 17.9875 49.1122L17.9876 39.1122ZM9.32788 30.4524C9.32788 25.6697 13.205 21.7926 17.9877 21.7926V11.7926C7.68216 11.7926 -0.672119 20.1469 -0.672119 30.4524H9.32788ZM17.9877 21.7926C17.9997 21.7926 18.0117 21.7926 18.0237 21.7927L18.0639 11.7928C18.0385 11.7927 18.0131 11.7926 17.9877 11.7926V21.7926Z"
                    fill={"#4E20E0"}
                    mask="url(#path-1-inside-1_1804_1416)"
                  />
                  <mask id="path-3-inside-2_1804_1416" fill="white">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M74.1297 18.9503C80.3298 23.2484 81.8716 31.7587 77.5735 37.9588L77.5225 38.0319L50.1534 77.5122C50.1379 77.5349 50.1222 77.5576 50.1065 77.5802C45.8085 83.7803 37.2981 85.3221 31.0981 81.024C24.8981 76.726 23.3562 68.2157 27.6542 62.0157L27.654 62.0156L55.121 22.394L55.1213 22.3941C59.4194 16.1941 67.9297 14.6522 74.1297 18.9503Z"
                    />
                  </mask>
                  <path
                    d="M77.5735 37.9588L81.6737 40.8204L81.6782 40.8139L81.6827 40.8074L77.5735 37.9588ZM74.1297 18.9503L71.2811 23.0595L71.2811 23.0595L74.1297 18.9503ZM77.5225 38.0319L73.4224 35.1702L73.4179 35.1767L73.4133 35.1832L77.5225 38.0319ZM50.1534 77.5122L46.0442 74.6635L46.0358 74.6757L46.0274 74.688L50.1534 77.5122ZM50.1065 77.5802L45.9974 74.7315L45.9973 74.7316L50.1065 77.5802ZM31.0981 81.024L28.2494 85.1332H28.2495L31.0981 81.024ZM27.6542 62.0157L31.7634 64.8643L34.5979 60.7754L30.5231 57.9207L27.6542 62.0157ZM27.654 62.0156L23.5448 59.167L20.7102 63.2558L24.785 66.1106L27.654 62.0156ZM55.121 22.394L57.1919 17.843L53.391 16.1134L51.0118 19.5453L55.121 22.394ZM55.1213 22.3941L53.0504 26.9451L56.8513 28.6746L59.2305 25.2427L55.1213 22.3941ZM81.6827 40.8074C87.554 32.3379 85.4478 20.7124 76.9784 14.8411L71.2811 23.0595C75.2117 25.7843 76.1892 31.1796 73.4644 35.1101L81.6827 40.8074ZM81.6226 40.8935L81.6737 40.8204L73.4734 35.0971L73.4224 35.1702L81.6226 40.8935ZM54.2626 80.3608L81.6317 40.8805L73.4133 35.1832L46.0442 74.6635L54.2626 80.3608ZM46.0274 74.688C46.0173 74.7027 46.0073 74.7172 45.9974 74.7315L54.2156 80.429C54.2371 80.398 54.2584 80.3671 54.2794 80.3364L46.0274 74.688ZM45.9973 74.7316C43.2725 78.6622 37.8773 79.6397 33.9467 76.9149L28.2495 85.1332C36.7189 91.0045 48.3444 88.8983 54.2157 80.4289L45.9973 74.7316ZM33.9467 76.9149C30.0161 74.1901 29.0387 68.7949 31.7634 64.8643L23.545 59.1672C17.6738 67.6366 19.7801 79.2619 28.2494 85.1332L33.9467 76.9149ZM24.785 66.1106L24.7852 66.1107L30.5231 57.9207L30.5229 57.9206L24.785 66.1106ZM51.0118 19.5453L23.5448 59.167L31.7632 64.8642L59.2302 25.2426L51.0118 19.5453ZM57.1922 17.8431L57.1919 17.843L53.0502 26.945L53.0504 26.9451L57.1922 17.8431ZM76.9784 14.8411C68.5089 8.96981 56.8834 11.076 51.0121 19.5455L59.2305 25.2427C61.9553 21.3121 67.3505 20.3347 71.2811 23.0595L76.9784 14.8411Z"
                    fill={"#4E20E0"}
                    mask="url(#path-3-inside-2_1804_1416)"
                  />
                  <mask id="path-5-inside-3_1804_1416" fill="white">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M38.8789 56.1649H87.0899H87.0901C94.6341 56.165 100.75 62.2807 100.75 69.8247C100.75 77.3688 94.6341 83.4845 87.0901 83.4845H87.0899H38.9789C38.9457 83.4848 38.9125 83.4849 38.8792 83.4849C31.3351 83.4849 25.2194 77.3692 25.2194 69.8251C25.2194 62.2811 31.3349 56.1654 38.8789 56.1653V56.1649Z"
                    />
                  </mask>
                  <path
                    d="M38.8789 56.1649V51.1649H33.8789V56.1649H38.8789ZM87.0901 56.1649L87.0901 51.1649H87.0901V56.1649ZM87.0901 83.4845V88.4845H87.0901L87.0901 83.4845ZM38.9789 83.4845V78.4845H38.961L38.9431 78.4847L38.9789 83.4845ZM38.8789 56.1653L38.879 61.1653L43.8789 61.1652V56.1653H38.8789ZM87.0899 51.1649H38.8789V61.1649H87.0899V51.1649ZM87.0901 51.1649H87.0899V61.1649H87.0901V51.1649ZM105.75 69.8247C105.75 59.5193 97.3956 51.165 87.0901 51.1649L87.09 61.1649C91.8727 61.165 95.7498 65.0421 95.7498 69.8247H105.75ZM87.0901 88.4845C97.3956 88.4845 105.75 80.1302 105.75 69.8247H95.7498C95.7498 74.6074 91.8727 78.4845 87.09 78.4845L87.0901 88.4845ZM87.0899 88.4845H87.0901V78.4845H87.0899V88.4845ZM38.9789 88.4845H87.0899V78.4845H38.9789V88.4845ZM38.9431 78.4847C38.9219 78.4848 38.9006 78.4849 38.8792 78.4849V88.4849C38.9243 88.4849 38.9695 88.4847 39.0148 88.4844L38.9431 78.4847ZM38.8792 78.4849C34.0965 78.4849 30.2194 74.6078 30.2194 69.8251H20.2194C20.2194 80.1306 28.5736 88.4849 38.8792 88.4849V78.4849ZM30.2194 69.8251C30.2194 65.0425 34.0964 61.1654 38.879 61.1653L38.8789 51.1653C28.5735 51.1654 20.2194 59.5197 20.2194 69.8251H30.2194ZM33.8789 56.1649V56.1653H43.8789V56.1649H33.8789Z"
                    fill={"#4E20E0"}
                    mask="url(#path-5-inside-3_1804_1416)"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1804_1416">
                    <rect
                      width="100"
                      height="100"
                      fill="white"
                      transform="translate(0.75)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div className="flex flex-col mb-6 justify-center text-center">
              <h1 className="block mb-0 mt-0 m">
                <span className="text-2xl font-bold mt-4 mb-6 leading-8">
                  Bem-vindo ao Cenarioz
                </span>
              </h1>

              <h2 className="mt-6 mb-6 mx-12">
                Descubra lugares para ficar e experiências únicas pelo mundo.
              </h2>

              <ButtonFull
                onClick={() => {
                  setSignupModalIsOpen(false), setSignupModalSteps(0);
                }}
                isLoading={isLoading}
                value="Continuar"
              ></ButtonFull>
            </div>
          </Modal>
        </>
      );
    }
    if (signupModalSteps === 3) {
      return (
        <>
          <Modal
            isOpen={signupModalIsOpen}
            onClose={() => setSignupModalSteps(2)}
            title=""
            size={"sm"}
            buttonLeft={
              <IoChevronBack size={24} fill="#222222"></IoChevronBack>
            }
            hiddenHeaderBorder
          >
            <div className="flex flex-col mb-6">
              <h1 className="block mb-0 mt-0">
                <span className="text-2xl font-bold mt-4 mb-6 leading-8">
                  Você tem certeza?
                </span>
              </h1>

              <h2 className="mt-6 mb-6">
                Se você recusar os Termos de Serviço e o compromisso da
                Cenarioz, não poderá criar uma conta. Você ainda poderá navegar
                no site, mas não conseguirá fazer reservas.
              </h2>

              <h3 className="font-bold mb-3">Por que isso é obrigatório</h3>
              <p>
                Nossos Termos de Serviço e compromisso têm o intuito de ajudar a
                todos na comunidade da Cenarioz a compreenderem melhor o que
                esperar de nós, e o que esperamos deles. Saiba mais sobre nosso
                Compromisso da Comunidade e Termos de Serviço.
              </p>
              <h3 className="font-bold mb-3 mt-6">
                Caso você deseje se cadastrar novamente
              </h3>
              <p className="mb-6">
                Caso você mude de ideia, pode aceitar nossos termos de serviço e
                compromisso quando quiser e completar o cadastro para ter uma
                conta na Cenarioz.
              </p>

              <button
                onClick={() => setSignupModalSteps(2)}
                className="bg-gray-900 text-white py-3 rounded-md px-12 mb-4"
              >
                Voltar
              </button>
              <button
                onClick={() => {
                  setSignupModalIsOpen(false), setSignupModalSteps(0);
                }}
                className="bg-transparent border border-gray-900 text-gray-900 hover:bg-gray-100 py-3 rounded-md px-12 mb-4"
              >
                Cancelar Cadastramento
              </button>
            </div>
          </Modal>
        </>
      );
    }
    if (signupModalSteps === 4)
      return (
        <>
          <Modal
            isOpen={signupModalIsOpen}
            onClose={() => setSignupModalSteps(0)}
            title="Entrar"
            size={"sm"}
            buttonLeft={
              <IoChevronBack size={24} fill="#222222"></IoChevronBack>
            }
          >
            <Formik
              key={"loginFrom"}
              initialValues={loginWithPassDefaultValue}
              onSubmit={handleLoginSubmit}
              validate={validateloginWithPassForm}
            >
              <Form>
                <div className="flex flex-col gap-4 mt-6">
                  <Field
                    key={"password"}
                    label="Senha"
                    type="password"
                    name="password"
                    component={CustomInput}
                  />
                </div>
                <div className="flex flex-col mt-6 mb-6">
                  <ButtonFull isLoading={isLoading} value="Entrar"></ButtonFull>

                  <p className="underline">Esqueceu sua senha ?</p>
                </div>
              </Form>
            </Formik>
          </Modal>
        </>
      );
  };

  return (
    <>
      {handleSignupModal()}

      <nav
        className={`${
          fill ? `text-gray-900` : "text-white"
        } bg-transparent relative z-10 w-full`}
      >
        <div className="px-4 mx-auto container py-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <Link
                href="/"
                className={`font-medium text-xl flex items-center gap-3`}
              >
                <svg
                  width="50"
                  height="100"
                  viewBox="0 0 101 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_1804_1416)">
                    <mask id="path-1-inside-1_1804_1416" fill="white">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M18.0438 16.7927H66.1987H66.1988C73.7429 16.7927 79.8586 22.9084 79.8586 30.4525C79.8586 37.9966 73.7429 44.1123 66.1988 44.1123H66.1987H17.9876V44.1122C10.4435 44.1122 4.32788 37.9965 4.32788 30.4524C4.32788 22.9083 10.4436 16.7926 17.9877 16.7926C18.0064 16.7926 18.0251 16.7926 18.0438 16.7927Z"
                      />
                    </mask>
                    <path
                      d="M18.0438 16.7927L18.0237 21.7927L18.0337 21.7927H18.0438V16.7927ZM17.9876 44.1123H12.9876V49.1123H17.9876V44.1123ZM17.9876 44.1122H22.9876V39.1123L17.9876 39.1122L17.9876 44.1122ZM66.1987 11.7927H18.0438V21.7927H66.1987V11.7927ZM66.1988 11.7927H66.1987V21.7927H66.1988V11.7927ZM84.8586 30.4525C84.8586 20.147 76.5043 11.7927 66.1988 11.7927V21.7927C70.9815 21.7927 74.8586 25.6698 74.8586 30.4525H84.8586ZM66.1988 49.1123C76.5043 49.1123 84.8586 40.7581 84.8586 30.4525H74.8586C74.8586 35.2352 70.9815 39.1123 66.1988 39.1123V49.1123ZM66.1987 49.1123H66.1988V39.1123H66.1987V49.1123ZM17.9876 49.1123H66.1987V39.1123H17.9876V49.1123ZM12.9876 44.1122V44.1123H22.9876V44.1122H12.9876ZM17.9876 39.1122C13.205 39.1122 9.32788 35.2351 9.32788 30.4524H-0.672119C-0.672119 40.7579 7.68207 49.1121 17.9875 49.1122L17.9876 39.1122ZM9.32788 30.4524C9.32788 25.6697 13.205 21.7926 17.9877 21.7926V11.7926C7.68216 11.7926 -0.672119 20.1469 -0.672119 30.4524H9.32788ZM17.9877 21.7926C17.9997 21.7926 18.0117 21.7926 18.0237 21.7927L18.0639 11.7928C18.0385 11.7927 18.0131 11.7926 17.9877 11.7926V21.7926Z"
                      fill={fill ?? "white"}
                      mask="url(#path-1-inside-1_1804_1416)"
                    />
                    <mask id="path-3-inside-2_1804_1416" fill="white">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M74.1297 18.9503C80.3298 23.2484 81.8716 31.7587 77.5735 37.9588L77.5225 38.0319L50.1534 77.5122C50.1379 77.5349 50.1222 77.5576 50.1065 77.5802C45.8085 83.7803 37.2981 85.3221 31.0981 81.024C24.8981 76.726 23.3562 68.2157 27.6542 62.0157L27.654 62.0156L55.121 22.394L55.1213 22.3941C59.4194 16.1941 67.9297 14.6522 74.1297 18.9503Z"
                      />
                    </mask>
                    <path
                      d="M77.5735 37.9588L81.6737 40.8204L81.6782 40.8139L81.6827 40.8074L77.5735 37.9588ZM74.1297 18.9503L71.2811 23.0595L71.2811 23.0595L74.1297 18.9503ZM77.5225 38.0319L73.4224 35.1702L73.4179 35.1767L73.4133 35.1832L77.5225 38.0319ZM50.1534 77.5122L46.0442 74.6635L46.0358 74.6757L46.0274 74.688L50.1534 77.5122ZM50.1065 77.5802L45.9974 74.7315L45.9973 74.7316L50.1065 77.5802ZM31.0981 81.024L28.2494 85.1332H28.2495L31.0981 81.024ZM27.6542 62.0157L31.7634 64.8643L34.5979 60.7754L30.5231 57.9207L27.6542 62.0157ZM27.654 62.0156L23.5448 59.167L20.7102 63.2558L24.785 66.1106L27.654 62.0156ZM55.121 22.394L57.1919 17.843L53.391 16.1134L51.0118 19.5453L55.121 22.394ZM55.1213 22.3941L53.0504 26.9451L56.8513 28.6746L59.2305 25.2427L55.1213 22.3941ZM81.6827 40.8074C87.554 32.3379 85.4478 20.7124 76.9784 14.8411L71.2811 23.0595C75.2117 25.7843 76.1892 31.1796 73.4644 35.1101L81.6827 40.8074ZM81.6226 40.8935L81.6737 40.8204L73.4734 35.0971L73.4224 35.1702L81.6226 40.8935ZM54.2626 80.3608L81.6317 40.8805L73.4133 35.1832L46.0442 74.6635L54.2626 80.3608ZM46.0274 74.688C46.0173 74.7027 46.0073 74.7172 45.9974 74.7315L54.2156 80.429C54.2371 80.398 54.2584 80.3671 54.2794 80.3364L46.0274 74.688ZM45.9973 74.7316C43.2725 78.6622 37.8773 79.6397 33.9467 76.9149L28.2495 85.1332C36.7189 91.0045 48.3444 88.8983 54.2157 80.4289L45.9973 74.7316ZM33.9467 76.9149C30.0161 74.1901 29.0387 68.7949 31.7634 64.8643L23.545 59.1672C17.6738 67.6366 19.7801 79.2619 28.2494 85.1332L33.9467 76.9149ZM24.785 66.1106L24.7852 66.1107L30.5231 57.9207L30.5229 57.9206L24.785 66.1106ZM51.0118 19.5453L23.5448 59.167L31.7632 64.8642L59.2302 25.2426L51.0118 19.5453ZM57.1922 17.8431L57.1919 17.843L53.0502 26.945L53.0504 26.9451L57.1922 17.8431ZM76.9784 14.8411C68.5089 8.96981 56.8834 11.076 51.0121 19.5455L59.2305 25.2427C61.9553 21.3121 67.3505 20.3347 71.2811 23.0595L76.9784 14.8411Z"
                      fill={fill ?? "white"}
                      mask="url(#path-3-inside-2_1804_1416)"
                    />
                    <mask id="path-5-inside-3_1804_1416" fill="white">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M38.8789 56.1649H87.0899H87.0901C94.6341 56.165 100.75 62.2807 100.75 69.8247C100.75 77.3688 94.6341 83.4845 87.0901 83.4845H87.0899H38.9789C38.9457 83.4848 38.9125 83.4849 38.8792 83.4849C31.3351 83.4849 25.2194 77.3692 25.2194 69.8251C25.2194 62.2811 31.3349 56.1654 38.8789 56.1653V56.1649Z"
                      />
                    </mask>
                    <path
                      d="M38.8789 56.1649V51.1649H33.8789V56.1649H38.8789ZM87.0901 56.1649L87.0901 51.1649H87.0901V56.1649ZM87.0901 83.4845V88.4845H87.0901L87.0901 83.4845ZM38.9789 83.4845V78.4845H38.961L38.9431 78.4847L38.9789 83.4845ZM38.8789 56.1653L38.879 61.1653L43.8789 61.1652V56.1653H38.8789ZM87.0899 51.1649H38.8789V61.1649H87.0899V51.1649ZM87.0901 51.1649H87.0899V61.1649H87.0901V51.1649ZM105.75 69.8247C105.75 59.5193 97.3956 51.165 87.0901 51.1649L87.09 61.1649C91.8727 61.165 95.7498 65.0421 95.7498 69.8247H105.75ZM87.0901 88.4845C97.3956 88.4845 105.75 80.1302 105.75 69.8247H95.7498C95.7498 74.6074 91.8727 78.4845 87.09 78.4845L87.0901 88.4845ZM87.0899 88.4845H87.0901V78.4845H87.0899V88.4845ZM38.9789 88.4845H87.0899V78.4845H38.9789V88.4845ZM38.9431 78.4847C38.9219 78.4848 38.9006 78.4849 38.8792 78.4849V88.4849C38.9243 88.4849 38.9695 88.4847 39.0148 88.4844L38.9431 78.4847ZM38.8792 78.4849C34.0965 78.4849 30.2194 74.6078 30.2194 69.8251H20.2194C20.2194 80.1306 28.5736 88.4849 38.8792 88.4849V78.4849ZM30.2194 69.8251C30.2194 65.0425 34.0964 61.1654 38.879 61.1653L38.8789 51.1653C28.5735 51.1654 20.2194 59.5197 20.2194 69.8251H30.2194ZM33.8789 56.1649V56.1653H43.8789V56.1649H33.8789Z"
                      fill={fill ?? "white"}
                      mask="url(#path-5-inside-3_1804_1416)"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1804_1416">
                      <rect
                        width="100"
                        height="100"
                        fill="white"
                        transform="translate(0.75)"
                      />
                    </clipPath>
                  </defs>
                </svg>
                Cenárioz
              </Link>
            </div>
            <div className="hidden w-full md:flex flex-row justify-end">
              {search && <Search size={searchSize} />}
              <div className="ml-10 flex items-center space-x-5">
                {menuItems.map((item) => {
                  return item.value;
                })}
              </div>
            </div>
            <div className="-mr-2 flex z-10 items-center md:hidden">
              <button
                onClick={handleToggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:opacity-50 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
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
