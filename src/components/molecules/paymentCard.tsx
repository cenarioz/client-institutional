import { IBooking, IOpeningHour, IPlace } from "@/commons/@types/place";
import moment from "moment";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import {
  IoInformationCircleOutline
} from "react-icons/io5";
import Button from "../atoms/Button";
import DatePickerComponent from "../atoms/DatePicker";
import Select from "../atoms/Select";
import TimePickerComponent from "../atoms/TimePicker";
import ButtonFull from "../atoms/ButtonFull";


interface PaymentCardProps {
  openingHours: IOpeningHour[];
  bookings: IBooking[];
  place: IPlace;
  isLoading?: boolean;
}

function getFormattedDates(start: string, end: string): Date[] {
  const startDate = moment(start, "YYYY-MM-DD HH:mm:ss");
  const endDate = moment(end, "YYYY-MM-DD HH:mm:ss");
  const dates: Date[] = [];

  if (startDate.isSameOrBefore(endDate)) {
    let current = startDate.clone();

    while (current.isSameOrBefore(endDate)) {
      dates.push(current.toDate());
      current.add(1, "hour");
    }
  }

  return dates;
}

function getWeekday(date: Date): string {
  const weekdays = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ];
  const weekdayIndex = date.getDay();

  return weekdays[weekdayIndex];
}

function generateDate(date: string, hour: string): string {
  if (!hour) return "";
  const datePieces = date.split("-");
  const year = parseInt(datePieces[0]);
  const month = parseInt(datePieces[1]);
  const day = parseInt(datePieces[2]);
  const hourPieces = hour.split(":");
  const hours = parseInt(hourPieces[0]);
  const min = parseInt(hourPieces[1]);
  const sec = parseInt(hourPieces[2]);

  const data = new Date(year, month - 1, day, hours, min, sec);
  return moment(data).format("YYYY-MM-DD HH:mm:ss");
}

function blockWeekendDays(selectedDate: Date | null, blockedDayOfWeek: string) {
  if (!selectedDate) return [];
  var startDate = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth() - 1,
    1
  );
  var endDate = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth() + 2,
    0
  );

  var blockedDays = [];

  for (
    var date = startDate;
    date <= endDate;
    date.setDate(date.getDate() + 1)
  ) {
    var dayOfWeek = getWeekday(date);
    if (dayOfWeek === blockedDayOfWeek) {
      blockedDays.push(new Date(date));
    }
  }

  return blockedDays;
}

function monetary(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export default function PaymentCard({
  openingHours,
  bookings,
  place,
  isLoading,
}: PaymentCardProps) {
  return (
    <PaymentCardComponent
      openingHours={openingHours}
      bookings={bookings}
      place={place}
    />
  );
}

function PaymentCardComponent({
  openingHours,
  bookings,
  place,
}: PaymentCardProps) {
  const t = useTranslations();

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedParticipants, setSelectedParticipants] = useState<any>(null);
  const [selectedStartHour, setSelectedStartHour] = useState<Date | null>(null);
  const [selectedEndHour, setSelectedEndHour] = useState<Date | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<Date | null>(null);
  const [blockedDays, setblockedDays] = useState<Date[]>([]);
  const [totalSelectedHours, setTotalSelectedHours] = useState<number>(0);

  useEffect(() => {
    const diff =
      (selectedEndHour ? selectedEndHour.getTime() : 0) -
      (selectedStartHour ? selectedStartHour.getTime() : 0);
    const calcHours = Math.round(diff / (1000 * 60 * 60));
    setTotalSelectedHours(calcHours <= 0 ? 0 : calcHours);
  }, [selectedEndHour, selectedStartHour]);

  const datee = moment(selectedDate).format("YYYY-MM-DD");
  const locatedDates: string[] = [];

  const myDate = new Date();

  const weekday = getWeekday(myDate);
  const openTimeOfDay = openingHours.find((day) => day.day_of_week === weekday);

  const openingHoursTime = getFormattedDates(
    generateDate(datee, "00:00:00"),
    generateDate(datee, openTimeOfDay?.opening_time as any)
  );
  const closingHoursTime = getFormattedDates(
    generateDate(datee, openTimeOfDay?.closing_time as any),
    generateDate(datee, "23:00:00")
  );

  const endHoursTime = selectedStartHour
    ? getFormattedDates(
      generateDate(datee, "00:00:00"),
      generateDate(datee, moment(selectedStartHour).format("HH:mm:ss"))
    )
    : [];

  bookings.forEach((booking) => {
    locatedDates.push(booking.start_date, booking.end_date);
  });

  const targetDate = datee;
  const bookinsOfDay = locatedDates.filter((item) =>
    item.startsWith(targetDate)
  );
  const startOfStartHour = moment(bookinsOfDay[0]).subtract(1, "hour");
  const endOfStartHour = moment(bookinsOfDay[bookinsOfDay.length - 1]);

  const totalPrice = (selectedParticipants ?? place.details.price_pp_hourly_0) * totalSelectedHours;
  const managementFee = (9.5 / 100) * totalPrice;
  const totalWithTax = totalPrice + managementFee;

  const removeHoursFromStartHour = [
    ...openingHoursTime,
    ...getFormattedDates(
      startOfStartHour.toDate() as any,
      endOfStartHour.toDate() as any
    ),
    ...closingHoursTime,
  ];
  const removeHoursFromEndHour = [
    ...openingHoursTime,
    ...endHoursTime,
    ...closingHoursTime,
  ];

  const disableCrew =
    !place.details.price_pp_hourly_1 &&
    !place.details.price_pp_hourly_2 &&
    !place.details.price_pp_hourly_3 &&
    !place.details.price_pp_hourly_4 &&
    !place.details.price_pp_hourly_5;

  const disabledDayOfWeek = (date: Date | null) => {
    const rel: Date[] = [];

    openingHours.forEach((openHour) => {
      if (!openHour.active)
        rel.push(...blockWeekendDays(date, openHour.day_of_week));
    });

    return rel;
  };

  useEffect(() => {
    setblockedDays([...blockedDays, ...disabledDayOfWeek(new Date())]);
  }, []);

  const handleDateSelect = (date: Date | null) => {
    setSelectedDate(date);
    setSelectedStartHour(null);
    setSelectedEndHour(null);
  };
  const handleStartHourSelect = (date: Date | null) => {
    setSelectedStartHour(date);
    setSelectedEndHour(null);
  };
  const handleEndHourSelect = (date: Date | null) => {
    setSelectedEndHour(date);
  };
  const handleSelectParticipants = (data: any | null) => {
    setSelectedParticipants(data);
  };
  const handleSelectedMonth = (date: Date | null) => {
    setSelectedMonth(date);
    setblockedDays([...blockedDays, ...disabledDayOfWeek(date)]);
  };

  return (
    <>
      <div className="w-full h-fit bg-white rounded-lg border-gray-200 top-20 border md:sticky p-6 shadow-lg xs:hidden">
        <h1 className="text-lg text-center">
          {monetary(selectedParticipants ?? place.details.price_pp_hourly_0)}/{" "}
          {t(`enum.${place.value_type}`)}
        </h1>
        {place.minimum && (
          <h2 className="text-xs text-gray-500 mb-2 text-center">
            {place.minimum > 1
              ? `${place.minimum} ${t("place.minimums")}`
              : `${place.minimum} ${t("place.minimum")}`}
          </h2>
        )}

        <div className="mb-4">
          <DatePickerComponent
            bookings={bookings}
            openingHours={openingHours}
            selectedDate={selectedDate}
            onChange={handleDateSelect}
            label={t("place.date_hour")}
            onMonthChange={handleSelectedMonth}
            excludeDates={blockedDays}
          />
        </div>
        <div className="flex mb-2 gap-1">
          <TimePickerComponent
            bookings={bookings}
            selectedTime={selectedStartHour}
            excludedDays={removeHoursFromStartHour}
            openingHours={openingHours}
            placeholder={t("place.initial_hour")}
            onChange={handleStartHourSelect}
            disabled={!selectedDate}
          />
          <TimePickerComponent
            bookings={bookings}
            selectedTime={selectedEndHour}
            excludedDays={removeHoursFromEndHour}
            openingHours={openingHours}
            placeholder={t("place.final_hour")}
            onChange={handleEndHourSelect}
            disabled={!selectedStartHour}
          />
        </div>
        <div className="flex justify-end w-full text-xs text-gray-500">
          <p>
            {t("place.total_hours")}: {totalSelectedHours}
          </p>
        </div>

        {!disableCrew && (
          <div className="mb-4">
            <Select label={t("place.crew")} onChange={handleSelectParticipants} details={place.details} />
          </div>
        )}
        <div className="mt-4">
          <button type="submit" className="bg-violet-600 rounded-md w-full text-white py-3 px-12 relative">{t('place.continue')}</button>
        </div>
        {totalSelectedHours != 0 && (
          <div>
            <div className="mt-4 pt-2 flex justify-between">
              <p className="text-sm text-gray-800">
                {monetary(selectedParticipants ?? place.details.price_pp_hourly_0)} x{" "}
                {totalSelectedHours > 1
                  ? `${totalSelectedHours} ${t('place.hours')}`
                  : `${totalSelectedHours} ${t('place.hour')}`}
              </p>
              <p className="text-sm text-gray-800 text-right">
                {monetary(totalPrice)}
              </p>
            </div>
            <div className="mt-2 flex justify-between">
              <p className="text-sm w-full flex items-center gap-1 text-gray-800">{t('place.management_fee')} <IoInformationCircleOutline /></p>
              <p className="text-sm text-gray-800 text-right">
                {monetary(managementFee)}
              </p>
            </div>
          </div>
        )}

        <div className="mt-4 border-t border-gray-300 pt-2 flex justify-between">
          <p className="text-lg text-gray-900">{t('place.total_with_tax')}</p>
          <p className="text-lg font-bold text-gray-900 text-right">
            {monetary(totalWithTax)}
          </p>
        </div>
      </div>
      <div className="w-full fixed flex justify-between  items-center h-fit bg-white border-gray-200 bottom-0 border left-0 right-0  p-4 shadow-lg md:hidden">

        <h1 className="text-md text-center">
          {monetary(selectedParticipants ?? place.details.price_pp_hourly_0)}/{" "}
          <small>{t(`enum.${place.value_type}`)}</small>
        </h1>
        <button type="submit" className="bg-violet-600 rounded-md text-white py-3 px-12 relative">{t('place.check_availability')}</button>
      </div>
    </>

  );
}
