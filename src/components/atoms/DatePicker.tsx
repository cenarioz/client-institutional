import { IBooking, IOpeningHour } from "@/commons/@types/place";
import ptBR from "date-fns/locale/pt-BR";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

registerLocale("pt-BR", ptBR);
setDefaultLocale("pt-BR");

interface DatePickerProps {
  label?: string;
  selectedDate: Date | null;
  onChange: (date: Date | null) => void;
  openingHours?: IOpeningHour[];
  bookings: IBooking[];
  onMonthChange?: (date: Date | null) => void;
  excludeDates: Date[]
}

export default function DatePickerComponent({
  label,
  selectedDate,
  onChange,
  onMonthChange = () => {},
  openingHours,
  bookings,
  excludeDates
}: DatePickerProps) {
  const handleDateChange = (date: any) => {
    onChange(date);
  };

  const changeMonth = (date: any) => {
    onMonthChange(date);
  };
  return (
    <>
      {label && <label className="text-gray-700 font-semibold">{label}</label>}
      <DatePicker
        selected={selectedDate}
        onMonthChange={changeMonth}
        onChange={handleDateChange}
        excludeDates={excludeDates}
        dateFormat="MMM d, yyyy"
        locale="pt-BR"
        onKeyDown={(event) => {
          event.preventDefault();
        }}
        className="px-4 py-2 mt-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      ></DatePicker>
    </>
  );
}
