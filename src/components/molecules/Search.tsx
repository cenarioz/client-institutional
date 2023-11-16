import { fetcher } from "@/utils/place.api";
import { useAppDispatch } from "@/utils/redux/hooks";
import {
  cleanFilterForm,
  submittedFilterForm,
} from "@/utils/redux/slices/filterSlice";
import { cleanForm, submited } from "@/utils/redux/slices/searchSlice";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import { gql } from "graphql-request";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import * as querystring from "querystring";
import React, { HTMLProps, useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { TbAdjustmentsHorizontal } from "react-icons/tb";
import { useSelector } from "react-redux";
import useSWR from "swr";
import Button from "../atoms/Button";
import ButtonFull from "../atoms/ButtonFull";
import CustomInput from "../atoms/InputCustom";
import { CustomSelectComponent } from "../atoms/SelectCustom";
import Slider from "../atoms/Slider";
import Modal from "./Modal";

interface SearchProps {
  size?: "xs" | "sm" | "md" | "lg";
  className?: HTMLProps<HTMLElement>["className"];
}

export default function Search({ size = "sm", className }: SearchProps) {
  const [searchVisible, setSearchVisible] = React.useState(false);
  const [filterVisible, setFilterVisible] = React.useState(false);

  const searchParams = useSearchParams();

  const longitude = searchParams.get("longitude");
  const latitude = searchParams.get("latitude");
  const location = searchParams.get("location");
  const howManyPeople = searchParams.get("howManyPeople");
  const placeId = searchParams.get("placeId");
  const type = searchParams.get("type");
  const keyword = searchParams.get("keyword");

  const query = {
    ...(latitude && { latitude }),
    ...(longitude && { longitude }),
    ...(longitude && longitude && { radius: 200 }),
    ...(type && { type }),
    ...(howManyPeople && { howManyPeople }),
    ...(keyword && { keyword }),
  };

  const queryString = Object.keys(query)
    //@ts-ignore
    .map((key) => `${key}: ${key === "type" || key === "keyword" ? `"${query[key]}"` : query[key]}`)
    .join(", ");

  const graphQuery = `${queryString ? `(${queryString})` : ""}`;

  const { data, error } = useSWR(
    gql`
      {
        dynamicFilters ${graphQuery} {
          minValue
          maxValue
          mediumValue
        }
      }
    `,
    fetcher
  );

  const searchDefaultValue = useSelector((state: any) => state.persistedSearch);
  const filtersDefaultValue = useSelector(
    (state: any) => state.persistedFilter
  );

  const router = useRouter();

  const handler = () => setSearchVisible(true);
  const handlerFilter = () => {
    setFilterVisible(true);
  };
  const t = useTranslations();
  const closeSearchHandler = () => {
    setSearchVisible(false);
  };
  const closeFilterHandler = () => {
    setFilterVisible(false);
  };

  const fontSize = () => {
    switch (size) {
      case "sm":
        return "0.875rem";
      case "xs":
        return "0.75rem";
      case "md":
        return "1rem";

      default:
        break;
    }
  };
  const dispatch = useAppDispatch();

  const handleSearch = async (values: any, actions: any) => {
    dispatch(submited(values));
    let latitude = null;
    let longitude = null;
    let location = null;
    setSearchVisible(false);
    if (values.location?.value) {
      const response = await axios.get("/api/google", {
        params: {
          placeId: values.location?.value,
        },
      });

      latitude = response.data.data.result.geometry.location.lat;
      longitude = response.data.data.result.geometry.location.lng;
      location = response.data.data.result.vicinity;
    }
    const queryParams = querystring.stringify({
      type: values.event?.type,
      latitude,
      longitude,
      location,
      howManyPeople: values.howManyPeople,
    });

    router.push(`/explore?${queryParams}`);
  };

  const handleFilter = (values: any) => {
    dispatch(submittedFilterForm(values));
    const queryParams = querystring.stringify({
      minValue: values.price[0],
      maxValue: values.price[1],
      keyword: values.keyword,
      type,
      latitude,
      longitude,
      location,
    });

    router.push(`/explore?${queryParams}`);
  };

  const handleReset = () => {
    dispatch(cleanForm());
    setSearchVisible(false);
    router.push(`/explore`);
  };
  const handleResetFilter = () => {
    dispatch(cleanFilterForm());
    dispatch(
      submittedFilterForm({
        price: [data?.dynamicFilters.minValue, data?.dynamicFilters.maxValue],
      })
    );
    setFilterVisible(false);
    router.push(`/explore`);
  };

  const options = [
    { value: 1, label: "cha de bebe", type: "event" },
    { value: 2, label: "festa de 18 anos", type: "event" },
    { value: 3, label: "1º aniversário", type: "event" },
    { value: 4, label: "21º aniversário", type: "event" },
    { value: 5, label: "30º aniversário", type: "event" },
    { value: 6, label: "festa de 40 anos", type: "event" },
    { value: 7, label: "50º aniversário", type: "event" },
    { value: 8, label: "60º aniversário", type: "event" },
    { value: 9, label: "70º aniversário", type: "event" },
    { value: 10, label: "festa de aniversario adulto", type: "event" },
    { value: 11, label: "festa adulto", type: "event" },
    { value: 12, label: "Chá de bebê acessível", type: "event" },
    { value: 13, label: "Reunião Acessível", type: "event" },
    { value: 14, label: "festa acessível", type: "event" },
    { value: 15, label: "Casamento acessível", type: "event" },
    { value: 16, label: "casamento africano", type: "event" },
    { value: 17, label: "Depois da festa", type: "event" },
    { value: 18, label: "Chá da tarde", type: "event" },
    { value: 19, label: "Anfiteatro", type: "event" },
    { value: 20, label: "Aniversário", type: "event" },
    { value: 21, label: "Exibição de arte", type: "event" },
    { value: 22, label: "Show de arte", type: "event" },
    { value: 23, label: "casamento asiático", type: "event" },
    { value: 24, label: "Leilão", type: "event" },
    { value: 25, label: "Cerimônia de entrega de prêmios", type: "event" },
    { value: 26, label: "churrasco", type: "event" },
    { value: 27, label: "Chá de bebê", type: "event" },
    { value: 28, label: "despedida de solteiro", type: "event" },
    { value: 29, label: "Despedida de solteira", type: "event" },
    { value: 30, label: "casamento no quintal", type: "event" },
    { value: 31, label: "Bar e Bat Mitzvah", type: "event" },
    { value: 32, label: "casamento no celeiro", type: "event" },
    { value: 33, label: "Recepção de casamento no celeiro", type: "event" },
    { value: 34, label: "casamento na praia", type: "event" },
    { value: 35, label: "Recepção de casamento na praia", type: "event" },
    { value: 36, label: "Casamento com Café da Manhã", type: "event" },
    { value: 37, label: "Jantar de aniversário", type: "event" },
    { value: 38, label: "Festa de aniversário", type: "event" },
    { value: 39, label: "Festa no barco", type: "event" },
    { value: 40, label: "Lançamento de livro", type: "event" },
    { value: 41, label: "chuva de ideias", type: "event" },
    { value: 42, label: "Café da manhã", type: "event" },
    { value: 43, label: "casamento cervejeiro", type: "event" },
    { value: 44, label: "almoço nupcial", type: "event" },
    { value: 45, label: "chá de panela", type: "event" },
    { value: 46, label: "Brunch", type: "event" },
    { value: 47, label: "Reunião de negócios", type: "event" },
    { value: 48, label: "Cabaré", type: "event" },
    { value: 49, label: "Casamento Acampado", type: "event" },
    { value: 50, label: "Fundição", type: "event" },
    { value: 51, label: "casamento no castelo", type: "event" },
    { value: 52, label: "Celebração", type: "event" },
    { value: 53, label: "Cerimônia", type: "event" },
    { value: 54, label: "casamento na capela", type: "event" },
    { value: 55, label: "Evento de caridade", type: "event" },
    { value: 56, label: "Festa infantil", type: "event" },
    { value: 57, label: "festa de batizado", type: "event" },
    { value: 58, label: "recepção de batizado", type: "event" },
    { value: 59, label: "Ceia de Natal", type: "event" },
    { value: 60, label: "Festa de Natal", type: "event" },
    { value: 61, label: "Retiro da Igreja", type: "event" },
    { value: 62, label: "Cinema", type: "event" },
    { value: 63, label: "Cerimônia civil", type: "event" },
    { value: 64, label: "Aula", type: "event" },
    { value: 65, label: "Coaching", type: "event" },
    { value: 66, label: "Festa de cocktail", type: "event" },
    { value: 67, label: "Colaboração", type: "event" },
    { value: 68, label: "Parte da empresa", type: "event" },
    { value: 69, label: "Convenção", type: "event" },
    { value: 70, label: "Aula de culinária", type: "event" },
    { value: 71, label: "Jantar Corporativo", type: "event" },
    { value: 72, label: "Evento corporativo", type: "event" },
    { value: 73, label: "Reunião Corporativa", type: "event" },
    { value: 74, label: "festa corporativa", type: "event" },
    { value: 75, label: "Retiro Corporativo", type: "event" },
    { value: 76, label: "Casamento na Casa de Campo", type: "event" },
    { value: 77, label: "Casamento na Casa de Campo", type: "event" },
    { value: 78, label: "Retiro de Casais", type: "event" },
    { value: 79, label: "Reunião Criativa", type: "event" },
    { value: 80, label: "sessão de dança", type: "event" },
    { value: 81, label: "Jantar", type: "event" },
    { value: 82, label: "Discussão", type: "event" },
    { value: 83, label: "festa de divórcio", type: "event" },
    { value: 84, label: "casamento elegante", type: "event" },
    { value: 85, label: "Festa de noivado", type: "event" },
    { value: 86, label: "Sessão de fotos de noivado", type: "event" },
    { value: 87, label: "Evento", type: "event" },
    { value: 88, label: "exposição", type: "event" },
    { value: 89, label: "Festa de despedida", type: "event" },
    { value: 90, label: "Festa na Fazenda", type: "event" },
    { value: 91, label: "casamento na fazenda", type: "event" },
    { value: 92, label: "sessão de moda", type: "event" },
    { value: 93, label: "Desfile de moda", type: "event" },
    { value: 94, label: "Festival", type: "event" },
    { value: 95, label: "filmagem", type: "production" },
    { value: 96, label: "filmando", type: "production" },
    { value: 97, label: "Sessão de fotos fitness", type: "production" },
    { value: 98, label: "Amostra", type: "production" },
    { value: 99, label: "casamento na floresta", type: "event" },
    { value: 100, label: "Festa divertida", type: "event" },
    { value: 101, label: "Função", type: "event" },
    { value: 102, label: "arrecadação de fundos", type: "event" },
    { value: 103, label: "Funeral", type: "event" },
    { value: 104, label: "Gala", type: "event" },
    { value: 105, label: "Chá de bebê no jardim", type: "event" },
    { value: 106, label: "Jardim Chá de panela", type: "event" },
    { value: 107, label: "Evento Jardim", type: "event" },
    { value: 108, label: "Festa de Jardim", type: "event" },
    { value: 109, label: "Jardim Recepção", type: "event" },
    { value: 110, label: "casamento no jardim", type: "event" },
    { value: 111, label: "Recepção de casamento no jardim", type: "event" },
    { value: 112, label: "Reunião", type: "meeting" },
    { value: 113, label: "casamento gay", type: "event" },
    { value: 114, label: "Revelação de gênero", type: "event" },
    { value: 115, label: "Festa de brilho", type: "event" },
    { value: 116, label: "casamento gótico", type: "event" },
    { value: 117, label: "Cerimônia de formatura", type: "event" },
    { value: 118, label: "Festa de graduação", type: "event" },
    { value: 119, label: "Tela verde", type: "event" },
    { value: 120, label: "Trabalho em equipe", type: "meeting" },
    { value: 121, label: "Ginástica", type: "event" },
    { value: 122, label: "casamento fazenda", type: "event" },
    { value: 123, label: "Hackathon", type: "event" },
    { value: 124, label: "Festa de Halloween", type: "event" },
    { value: 125, label: "Hora feliz", type: "event" },
    { value: 126, label: "festa de despedida", type: "event" },
    { value: 127, label: "Reunião do ensino médio", type: "meeting" },
    { value: 128, label: "Festa de feriado", type: "event" },
    { value: 129, label: "Festa em casa", type: "event" },
    { value: 130, label: "Filmagem Hospitalar", type: "production" },
    { value: 131, label: "festa no hotel", type: "event" },
    { value: 132, label: "casamento em hotel", type: "event" },
    { value: 133, label: "estou apenas navegando", type: "event" },
    { value: 134, label: "improvisar", type: "event" },
    { value: 135, label: "festa indiana", type: "event" },
    { value: 136, label: "Festa de Aniversário Interior", type: "event" },
    { value: 137, label: "Festa interior", type: "event" },
    { value: 138, label: "Sessão de fotos interna", type: "event" },
    { value: 139, label: "casamento dentro de casa", type: "event" },
    { value: 140, label: "Evento Industrial", type: "event" },
    { value: 141, label: "casamento industrial", type: "event" },
    { value: 142, label: "influenciador", type: "event" },
    { value: 143, label: "Reunião Informal", type: "meeting" },
    { value: 144, label: "Entrevista", type: "meeting" },
    { value: 145, label: "casamento íntimo", type: "event" },
    { value: 146, label: "Recepção íntima de casamento", type: "event" },
    { value: 147, label: "Casamento na Itália", type: "event" },
    { value: 148, label: "festa de aniversario infantil", type: "event" },
    { value: 149, label: "Grande festa de aniversário", type: "event" },
    { value: 150, label: "Grande Reunião", type: "meeting" },
    { value: 151, label: "grande festa", type: "event" },
    { value: 152, label: "casamento grande", type: "event" },
    { value: 153, label: "Evento de lançamento", type: "event" },
    { value: 154, label: "Palestra", type: "meeting" },
    { value: 155, label: "Almoço", type: "event" },
    { value: 156, label: "casamento de luxo", type: "event" },
    { value: 157, label: "casamento marquise", type: "event" },
    { value: 158, label: "Meditação", type: "event" },
    { value: 159, label: "Reunião", type: "meeting" },
    { value: 160, label: "Encontro", type: "event" },
    { value: 161, label: "Memorial", type: "event" },
    { value: 162, label: "Micro Wedding", type: "event" },
    { value: 163, label: "Mixer", type: "event" },
    { value: 164, label: "ensaio fotográfico dia das mães", type: "event" },
    { value: 165, label: "mistério de assassinato", type: "event" },
    { value: 166, label: "Vídeo de música", type: "production" },
    { value: 167, label: "rede", type: "event" },
    { value: 168, label: "Festa de ano novo", type: "event" },
    { value: 169, label: "Fora do local", type: "event" },
    { value: 170, label: "festa de escritório", type: "event" },
    { value: 171, label: "Chá de bebê ao ar livre", type: "event" },
    { value: 172, label: "Festa de aniversário ao ar livre", type: "event" },
    { value: 173, label: "Chá de panela ao ar livre", type: "event" },
    { value: 174, label: "Evento corporativo ao ar livre", type: "event" },
    { value: 175, label: "Jantar ao ar livre", type: "event" },
    { value: 176, label: "Festa de noivado ao ar livre", type: "event" },
    { value: 177, label: "Evento ao ar livre", type: "event" },
    { value: 178, label: "Reunião ao ar livre", type: "event" },
    { value: 179, label: "festa ao ar livre", type: "event" },
    { value: 180, label: "Desempenho ao ar livre", type: "event" },
    { value: 181, label: "sessão de fotos ao ar livre", type: "event" },
    { value: 182, label: "Recepção externa", type: "event" },
    { value: 183, label: "casamento ao ar livre", type: "event" },
    { value: 184, label: "Recepção de casamento ao ar livre", type: "event" },
    { value: 185, label: "casamento no parque", type: "event" },
    { value: 186, label: "Festa", type: "event" },
    { value: 187, label: "Desempenho", type: "event" },
    { value: 188, label: "Sessão de fotos", type: "event" },
    { value: 189, label: "Poesia", type: "event" },
    { value: 190, label: "Festa de aniversário na piscina", type: "event" },
    { value: 191, label: "Aparecer", type: "event" },
    { value: 192, label: "Apresentação", type: "event" },
    { value: 193, label: "Evento de Imprensa", type: "event" },
    { value: 194, label: "Evento Privado", type: "event" },
    { value: 195, label: "Reunião Privada", type: "event" },
    { value: 196, label: "Festa privada", type: "event" },
    { value: 197, label: "Lançamento do produto", type: "event" },
    { value: 198, label: "Foto do produto", type: "event" },
    { value: 199, label: "Produção", type: "event" },
    { value: 200, label: "Baile de formatura", type: "event" },
    { value: 201, label: "casamento em bar", type: "event" },
    { value: 202, label: "Quinceanera", type: "event" },
    { value: 203, label: "festa no rancho", type: "event" },
    { value: 204, label: "casamento no rancho", type: "event" },
    { value: 205, label: "Recepção", type: "event" },
    { value: 206, label: "Jantar de ensaio", type: "event" },
    { value: 207, label: "Varejo", type: "event" },
    { value: 208, label: "festa de aposentadoria", type: "event" },
    { value: 209, label: "Retiro", type: "event" },
    { value: 210, label: "Centro de Retiros", type: "event" },
    { value: 211, label: "Reunião", type: "event" },
    { value: 212, label: "Chá de bebê na cobertura", type: "event" },
    { value: 213, label: "Festa de aniversário na cobertura", type: "event" },
    { value: 214, label: "Rooftop Party", type: "event" },
    { value: 215, label: "Recepção na cobertura", type: "event" },
    { value: 216, label: "casamento na cobertura", type: "event" },
    { value: 217, label: "Casamento Rústico", type: "event" },
    { value: 218, label: "Triagem", type: "event" },
    { value: 219, label: "Seminário", type: "event" },
    { value: 220, label: "Chá de bebê pequeno", type: "event" },
    { value: 221, label: "Festa de aniversário pequena", type: "event" },
    { value: 222, label: "Pequena Festa de Noivado", type: "event" },
    { value: 223, label: "festa pequena", type: "event" },
    { value: 224, label: "casamento pequeno", type: "event" },
    { value: 225, label: "Recepção de casamento pequeno", type: "event" },
    { value: 226, label: "Social", type: "event" },
    { value: 227, label: "Evento social", type: "event" },
    { value: 228, label: "Palco de Som", type: "event" },
    { value: 229, label: "Ocasião especial", type: "event" },
    { value: 230, label: "Festa de Verão", type: "event" },
    { value: 231, label: "Cume", type: "event" },
    { value: 232, label: "Doce 16", type: "event" },
    { value: 233, label: "Festa do Chá", type: "event" },
    { value: 234, label: "Chá de panela", type: "event" },
    { value: 235, label: "Consolidação de equipe", type: "event" },
    { value: 236, label: "Retiro da Equipe", type: "event" },
    { value: 237, label: "festa adolescente", type: "event" },
    { value: 238, label: "tenda de casamento", type: "event" },
    { value: 239, label: "Teatro", type: "event" },
    { value: 240, label: "Terapia", type: "event" },
    { value: 241, label: "Exposição comercial", type: "event" },
    { value: 242, label: "Treinamento", type: "event" },
    { value: 243, label: "Casamento Único", type: "event" },
    { value: 244, label: "Festa de aniversário incomum", type: "event" },
    { value: 245, label: "festa incomum", type: "event" },
    { value: 246, label: "casamento incomum", type: "event" },
    { value: 247, label: "Gravação de vídeo", type: "event" },
    { value: 248, label: "Casamento na Vinha", type: "event" },
    { value: 249, label: "Sessão de fotos vintage", type: "event" },
    { value: 250, label: "Sessão de fotos do armazém", type: "event" },
    { value: 251, label: "Casamento no Armazém", type: "event" },
    { value: 252, label: "Evento à beira-mar", type: "event" },
    { value: 253, label: "Casamento", type: "event" },
    { value: 254, label: "Casamento depois da festa", type: "event" },
    { value: 255, label: "Aniversário de casamento", type: "event" },
    { value: 256, label: "sessão de fotos de casamento", type: "event" },
    { value: 257, label: "Recepção de casamento", type: "event" },
    { value: 258, label: "Despedida de solteira", type: "event" },
    { value: 259, label: "festa da vinícola", type: "event" },
    { value: 260, label: "casamento na vinícola", type: "event" },
    { value: 261, label: "casamento de inverno", type: "event" },
    { value: 262, label: "grupo de trabalho", type: "event" },
    { value: 263, label: "Retiro de trabalho", type: "event" },
    { value: 264, label: "Casamento em Iate", type: "event" },
    { value: 265, label: "retiro de ioga", type: "event" },
  ];

  const [predictions, setPredictions] = useState([]);

  const fetchPredictions = async (input: any) => {
    try {
      const response = await axios.get("/api/google", {
        params: {
          input: input,
        },
      });

      setPredictions(
        response.data.data.predictions.map(
          (locale: { description: any; place_id: any }) => {
            return { label: locale.description, value: locale.place_id };
          }
        )
      );
    } catch (error) {
      console.error("Error fetching predictions:", error);
    }
  };

  useEffect(() => {
    if (filtersDefaultValue.price.length == 0)
      dispatch(
        submittedFilterForm({
          price: [data?.dynamicFilters.minValue, data?.dynamicFilters.maxValue],
        })
      );
  }, [data]);

  return (
    <>
      <Modal
        isOpen={searchVisible}
        onClose={closeSearchHandler}
        title={t("search.modal.search")}
      >
        <Formik
          enableReinitialize={false}
          key={"searchDefaultValue"}
          initialValues={searchDefaultValue}
          onSubmit={handleSearch}
          onReset={handleReset}
        >
          <Form>
            <div className="flex flex-col gap-8 mt-6">
              <Field
                key={"event"}
                label={t("search.modal.whatAreYouPlanning")}
                name="event"
                options={options}
                isMulti={false}
                placeholder={null}
                component={CustomSelectComponent}
              />
              <Field
                key={"location"}
                label={t("search.modal.where")}
                name="location"
                options={predictions}
                placeholder={null}
                onInputChange={(e: any) => {
                  fetchPredictions(e);
                }}
                component={CustomSelectComponent}
              />

              <Field
                key={"howManyPeople"}
                label={t("search.modal.howManyPeople")}
                type="text"
                name="howManyPeople"
                component={CustomInput}
              />

              <div className="flex flex-row justify-between pt-6 mt-6 mb-6">
                <ButtonFull
                  textColor={"text-gray-900"}
                  bgColor="bg-transparent"
                  rounded
                  onClick={handleReset}
                  type="reset"
                  isLoading={false}
                  value={t("search.modal.clear")}
                ></ButtonFull>

                <ButtonFull
                  bgColor="bg-gray-900"
                  rounded
                  isLoading={false}
                  value={t("search.modal.search")}
                ></ButtonFull>
              </div>
            </div>
          </Form>
        </Formik>
      </Modal>

      <Modal
        isOpen={filterVisible}
        onClose={closeFilterHandler}
        title={t("filter.modal.title")}
      >
        <Formik
          key={"filterForm"}
          initialValues={filtersDefaultValue}
          onSubmit={handleFilter}
          onReset={handleResetFilter}
        >
          {({ resetForm }) => (
            <Form>
              <div className="flex flex-col gap-8 mt-8">
                <div className="container mx-auto flex flex-col">
                  <label className="text-gray-700 font-semibold">
                    {t("filter.modal.priceRange")}
                  </label>
                  <label className="text-gray-700 font-light mb-4 mt-2">
                    {t("filter.modal.priceRangeDescription", {
                      value: data?.dynamicFilters?.mediumValue,
                    })}
                  </label>
                  <Field
                    key={data.dynamicFilters.minValue}
                    name="price"
                    min={data.dynamicFilters.minValue}
                    max={data.dynamicFilters.maxValue}
                    component={Slider}
                  />
                </div>

                <Field
                  key={"keyword"}
                  label={t("filter.modal.keyword")}
                  type="text"
                  name="keyword"
                  component={CustomInput}
                />

                <div className="container mx-auto flex flex-col">
                  <label className="text-gray-700 font-semibold mb-4">
                    {t("filter.modal.minimumHours")}
                  </label>
                  <Field
                    min={0}
                    max={12}
                    name="minimumHours"
                    component={Slider}
                  />
                </div>
              </div>
              <Modal.footer>
                <div className="flex flex-row justify-between pt-6 mt-6 mb-8">
                  <ButtonFull
                    textColor={"text-gray-900"}
                    bgColor="bg-transparent"
                    rounded
                    onClick={resetForm}
                    type="reset"
                    isLoading={false}
                    value={t("search.modal.clear")}
                  ></ButtonFull>
                  <button className="bg-black text-white py-2 rounded-full px-12">
                    {t("filter.modal.show", { value: "123" })}
                  </button>
                </div>
              </Modal.footer>
            </Form>
          )}
        </Formik>
      </Modal>

      <div
        className={`bg-white w-1/2 min-w-[350px] rounded-full flex items-center border border-gray-300 justify-between ${
          size === "xs" ? "pl-4 pr-0.5 py-0.5" : "pl-6 pr-2 py-2"
        } cursor-pointer ${className}`}
      >
        <IoSearch color="black" className="pr-1" size={25} />
        <div onClick={handler} className="ml-2 flex-1">
          <p
            key={size}
            className={`font-medium text-gray-800`}
            style={{ fontSize: fontSize() }}
          >
            {t("search.whatAreYouPlanning")}
          </p>
          <p
            className={`font-ligth text-gray-500`}
            style={{ fontSize: fontSize() }}
          >
            {t("search.subTitle")}
          </p>
        </div>
        <Button onClick={handlerFilter} bordered>
          <TbAdjustmentsHorizontal
            size={20}
            color="black"
          ></TbAdjustmentsHorizontal>
        </Button>{" "}
      </div>
    </>
  );
}
