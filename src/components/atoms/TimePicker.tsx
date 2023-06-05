import ptBR from "date-fns/locale/pt-BR";
import { useState } from "react";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

registerLocale("pt-BR", ptBR);
setDefaultLocale("pt-BR");

interface DatePickerProps {
  label?: string;
  placeholder?: string
}

export default function TimePickerComponent({ label, placeholder}: DatePickerProps) {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date: any) => {
    setSelectedDate(date);
  };

  const formatDate = (date: any) => {
    if (!date) return "";

    const options: any = { year: "numeric", month: "short", day: "numeric" };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };
  return (
    <>
      {label && <label className="text-gray-700 font-semibold">{label}</label>}

      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={15}
        dateFormat="h:mm aa"
        placeholderText={placeholder ?? "Selecione um horário"}
        locale="pt-BR"
        className="px-4 py-2 mt-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </>
  );
}
