import Button from "../atoms/Button";
import DatePickerComponent from "../atoms/DatePicker";
import Select from "../atoms/Select";
import TimePickerComponent from "../atoms/TimePicker";


export default function PaymentCard() {
  return (
    <div className="w-full h-fit bg-white rounded-lg border-gray-200 top-20 border sticky p-4">
      <h1 className="text-lg text-center">R$ 150,00/ Hora</h1>
      <h2 className="text-xs text-gray-500 mb-2 text-center">
        4 horas de aluguel no mínimo
      </h2>
      <div className="mb-4">
        <DatePickerComponent label="Data / Hora"></DatePickerComponent>
      </div>
      <div className="flex mb-4 gap-1">
        <TimePickerComponent placeholder="Data Inicial"></TimePickerComponent>
        <TimePickerComponent placeholder="Data Final"></TimePickerComponent>
      </div>
      <div className="mb-4">
        <Select label="Participantes"></Select>
      </div>
      <Button onClick={() => {}} full rounded="md">
        Continuar
      </Button>
      <div className="mt-4 pt-2 flex justify-between">
        <p className="text-sm text-gray-800">R$ 150,00 x 4 horas</p>
        <p className="text-sm text-gray-800 text-right">R$ 600,00</p>
      </div>
      <div className="mt-2 flex justify-between">
        <p className="text-sm text-gray-800">Taxa de serviço do Cenarioz</p>
        <p className="text-sm text-gray-800 text-right">R$ 60,00</p>
      </div>
      <div className="mt-4 border-t border-gray-300 pt-2 flex justify-between">
        <p className="text-lg text-gray-900">Total (sem impostos)</p>
        <p className="text-lg font-bold text-gray-900 text-right">R$660,00</p>
      </div>
    </div>
  );
}
