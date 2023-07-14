import { IDetails } from "@/commons/@types/place";
import { useTranslations } from "next-intl";
import SelectLib from "react-select";

interface SelectProps {
  label?: string;
  details: IDetails
}

const Select = ({ label, details }: SelectProps) => {
  const t = useTranslations();
  const handleChange = (selectedOption: any) => {
    console.log("Opção selecionada:", selectedOption);
  };

  const options = [
    { value: "1", label: `1 - 5 ${t('place.persons')}`, disabled: !details.price_pp_hourly_0 },
    { value: "2", label: `6 - 15 ${t('place.persons')}`, disabled: !details.price_pp_hourly_1},
    { value: "3", label: `16 - 30 ${t('place.persons')}`, disabled: !details.price_pp_hourly_2 },
    { value: "4", label: `31 - 45 ${t('place.persons')}`, disabled: !details.price_pp_hourly_3 },
    { value: "5", label: `46 - 60 ${t('place.persons')}`, disabled: !details.price_pp_hourly_4 },
    { value: "6", label: `60 + ${t('place.persons')}`, disabled: !details.price_pp_hourly_5 },
  ];

  return (
    <>
      <label className="text-gray-700 font-semibold">{label}</label>
      <SelectLib
        options={options}
        onChange={handleChange}
        placeholder={t('place.select_one_option')}
        isOptionDisabled={(option) => option.disabled}
      />
    </>
  );
};

export default Select;
