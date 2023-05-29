import { useTranslations } from "next-intl";
import React from "react";
import { IoSearch } from "react-icons/io5";
import Button from "../atoms/Button";
import InputWithLabel from "../atoms/Input";
import Slider from "../atoms/Slider";
import Modal from "./Modal";

interface SearchProps {
  size: "xs" | "sm" | "md" | "lg";
}

export default function Search<SearchProps>({ size="sm" }) {
  const [searchVisible, setSearchVisible] = React.useState(false);
  const [filterVisible, setFilterVisible] = React.useState(false);
  const handler = () => setSearchVisible(true);
  const handlerFilter = () => setFilterVisible(true);
  const t = useTranslations();

  const closeSearchHandler = () => {
    setSearchVisible(false);
  };
  const closeFilterHandler = () => {
    setFilterVisible(false);
  };
  return (
    <>
      <Modal
        isOpen={searchVisible}
        onClose={closeSearchHandler}
        title={t("search.modal.search")}
      >
        <div className="flex flex-col gap-8">
          <InputWithLabel
            label={t("search.modal.whatAreYouPlanning")}
          ></InputWithLabel>
          <InputWithLabel label={t("search.modal.where")}></InputWithLabel>
          <InputWithLabel label={t("search.modal.when")}></InputWithLabel>
          <InputWithLabel
            label={t("search.modal.howManyPeople")}
          ></InputWithLabel>
        </div>
        <Modal.footer>
          <div className="flex flex-row justify-between pt-6 mt-6">
            <button className="bg-transparent text-black py-2 rounded-full px-12">
              {t("search.modal.clear")}
            </button>
            <button className="bg-black text-white py-2 rounded-full px-12">
              {t("search.modal.search")}
            </button>
          </div>
        </Modal.footer>
      </Modal>

      <Modal
        isOpen={filterVisible}
        onClose={closeFilterHandler}
        title={t("filter.modal.title")}
      >
        <div className="flex flex-col gap-8">
          <div className="container mx-auto flex flex-col">
            <label className="text-gray-700 font-semibold">
              {t("filter.modal.priceRange")}
            </label>
            <label className="text-gray-700 font-light mb-4 mt-2">
              {t("filter.modal.priceRangeDescription", { value: "123" })}
            </label>
            <Slider min={0} max={1000} monetary />
          </div>
          <InputWithLabel label={t("filter.modal.keyword")}></InputWithLabel>
          <div className="container mx-auto flex flex-col">
            <label className="text-gray-700 font-semibold mb-4">
              {t("filter.modal.minimumHours")}
            </label>
            <Slider min={0} max={12} />
          </div>
        </div>
        <Modal.footer>
          <div className="flex flex-row justify-between pt-6 mt-6">
            <button className="bg-transparent text-black py-2 rounded-full px-12">
              {t("filter.modal.clear")}
            </button>
            <button className="bg-black text-white py-2 rounded-full px-12">
              {t("filter.modal.show", { value: "123" })}
            </button>
          </div>
        </Modal.footer>
      </Modal>

      <div className={`bg-white w-1/2 min-w-[350px] rounded-full flex items-center border border-gray-300 justify-between ${size === 'xs'? 'pl-4 pr-0.5 py-0.5' : 'pl-6 pr-2 py-2' } cursor-pointer`}>
        <IoSearch color="black" className="pr-1" size={25} />
        <div onClick={handler} className="ml-2 flex-1">
          <p key={size} className={`text-${size} font-medium text-gray-800`}>
            {t("search.whatAreYouPlanning")}
          </p>
          <p className={`text-${size} font-light text-gray-500`}>
            {t("search.subTitle")}
          </p>
        </div>
        <Button onClick={handlerFilter}></Button>{" "}
      </div>
    </>
  );
}
