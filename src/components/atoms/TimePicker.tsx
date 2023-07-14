import { IBooking, IOpeningHour } from "@/commons/@types/place";
import ptBR from "date-fns/locale/pt-BR";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

registerLocale("pt-BR", ptBR);
setDefaultLocale("pt-BR");

interface DatePickerProps {
  label?: string;
  placeholder?: string;
  date?: Date | null;
  openingHours?: IOpeningHour[];
  bookings: IBooking[];
  excludedDays: Date[]
  selectedTime: Date | null
  onChange: (date: Date | null) => void;
  disabled?: boolean | any
}

export default function TimePickerComponent({
  label,
  placeholder,
  selectedTime,
  openingHours,
  bookings,
  onChange,
  disabled,
  excludedDays
}: DatePickerProps) { 
  const handleTimeChange = (date: any) => {
    onChange(date);
  };

  return (
    <>
      {label && <label className="text-gray-700 font-semibold">{label}</label>}

      <DatePicker
        selected={selectedTime}
        onChange={handleTimeChange}
        showTimeSelect
        showTimeSelectOnly
        excludeTimes={excludedDays}    
        timeIntervals={60}
        dateFormat="H:mm"
        placeholderText={placeholder ?? "Selecione um horário"}
        locale="pt-BR"
        disabled={disabled} 
        onKeyDown={(event) => {
          event.preventDefault();
        }}
        showTimeInput={false}
        className="px-4 py-2 mt-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </>
  );
}
