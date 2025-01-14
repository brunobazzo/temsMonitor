"use client";

import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface AutomationProps {
  instancia: string;
  name: string;
  fechamentos1h: number;
  aberturas1h: number;
  fechamentos2h: number;
  aberturas2h: number;
  fechamentos3h: number;
  aberturas3h: number;
  fechamentos4h: number;
  aberturas4h: number;
  fechamentos5h: number;
  aberturas5h: number;
  fechamentos6h: number;
  aberturas6h: number;
  fechamentos7h: number;
  aberturas7h: number;
  fechamentos8h: number;
  aberturas8h: number;
  fechamentos9h: number;
  aberturas9h: number;
  fechamentos10h: number;
  aberturas10h: number;
}

export default function Home() {
  const [data, setData] = useState<AutomationProps[]>([]);
  const [filter, setFilter] = useState<"horas" | "dias" | "meses" | "anos">("horas");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:4000/users');
      const result = await response.json();
      setData(result);
    };

    fetchData();
  }, []);

  const prepareChartData = (automation: AutomationProps) => {
    const chartData = [];
    for (let i = 1; i <= 10; i++) {
      chartData.push({
        name: `${i}${filter === "horas" ? "h" : filter === "dias" ? "d" : filter === "meses" ? "m" : "a"}`,
        aberturas: automation[`aberturas${i}h` as keyof AutomationProps] as number * 
          (filter === "horas" ? 1 : filter === "dias" ? 24 : filter === "meses" ? 31 : 365),
        fechamentos: automation[`fechamentos${i}h` as keyof AutomationProps] as number *
          (filter === "horas" ? 1 : filter === "dias" ? 24 : filter === "meses" ? 31 : 365),
      });
    }
    return chartData;
  };

  const renderTableHeaderForYears = () => {
    const currentYear = new Date().getFullYear();
    const numberOfYears = 10;
  
    let years = [];
    for (let i = 0; i < numberOfYears; i++) {
      years.push(
        <th key={i} className="border border-gray-300 px-2 py-2 text-center">
          {currentYear - i}
        </th>
      );
    }
    return years;
  };

  const renderTableHeaderForMonths = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const numberOfMonths = 10;

    let months = [];
    for (let i = 0; i < numberOfMonths; i++) {
      const monthIndex = (currentMonth - i + 12) % 12;
      const teste = Math.floor((currentMonth - i) / 12);
      const year = currentYear + teste;
      const monthName = new Date(year, monthIndex).toLocaleString('default', { month: 'long' });

      months.push(
        <th key={i} className="border border-gray-300 px-2 py-2 text-center">
          {monthName} {year}
        </th>
      );
    }
    return months;
  };

  const renderTableHeaderForDays = () => {
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const numberOfDays = 10;

    let days = [];
    for (let i = 0; i < numberOfDays; i++) {
      const day = new Date(currentYear, currentMonth, currentDay - i);
      const monthName = day.toLocaleString('default', { month: 'long' });
      const year = day.getFullYear();
      const dayOfMonth = day.getDate();

      days.push(
        <th key={i} className="border border-gray-300 px-2 py-2 text-center">
          {dayOfMonth} {monthName} {year}
        </th>
      );
    }
    return days;
  };

  const renderTimeColumns = (automation: AutomationProps) => {
    switch (filter) {
      case "horas":
        return (
          <>
            <td className="border border-gray-300 px-2 py-2 text-center">{automation.aberturas1h}</td>
            <td className="border border-gray-300 px-2 py-2 text-center">{automation.aberturas2h}</td>
            <td className="border border-gray-300 px-2 py-2 text-center">{automation.aberturas3h}</td>
            <td className="border border-gray-300 px-2 py-2 text-center">{automation.aberturas4h}</td>
            <td className="border border-gray-300 px-2 py-2 text-center">{automation.aberturas5h}</td>
            <td className="border border-gray-300 px-2 py-2 text-center">{automation.aberturas6h}</td>
            <td className="border border-gray-300 px-2 py-2 text-center">{automation.aberturas7h}</td>
            <td className="border border-gray-300 px-2 py-2 text-center">{automation.aberturas8h}</td>
            <td className="border border-gray-300 px-2 py-2 text-center">{automation.aberturas9h}</td>
            <td className="border border-gray-300 px-2 py-2 text-center">{automation.aberturas10h}</td>
          </>
        );
      case "dias":
        return (
          <>
            <td className="border border-gray-300 px-2 py-2 text-center">{automation.aberturas1h * 24}</td>
            <td className="border border-gray-300 px-2 py-2 text-center">{automation.aberturas2h * 25}</td>
            <td className="border border-gray-300 px-2 py-2 text-center">{automation.aberturas3h * 26}</td>
            <td className="border border-gray-300 px-2 py-2 text-center">{automation.aberturas4h * 27}</td>
            <td className="border border-gray-300 px-2 py-2 text-center">{automation.aberturas5h * 28}</td>
            <td className="border border-gray-300 px-2 py-2 text-center">{automation.aberturas6h * 29}</td>
            <td className="border border-gray-300 px-2 py-2 text-center">{automation.aberturas7h * 20}</td>
            <td className="border border-gray-300 px-2 py-2 text-center">{automation.aberturas8h * 21}</td>
            <td className="border border-gray-300 px-2 py-2 text-center">{automation.aberturas9h * 22}</td>
            <td className="border border-gray-300 px-2 py-2 text-center">{automation.aberturas10h * 24}</td>
          </>
        );
      case "meses":
        return (
          <>
            <td className="border border-gray-300 px-2 py-2 text-center">{automation.aberturas1h * 31}</td>
            <td className="border border-gray-300 px-2 py-2 text-center">{automation.aberturas2h * 32}</td>
            <td className="border border-gray-300 px-2 py-2 text-center">{automation.aberturas3h * 33}</td>
            <td className="border border-gray-300 px-2 py-2 text-center">{automation.aberturas4h * 34}</td>
            <td className="border border-gray-300 px-2 py-2 text-center">{automation.aberturas5h * 35}</td>
            <td className="border border-gray-300 px-2 py-2 text-center">{automation.aberturas6h * 36}</td>
            <td className="border border-gray-300 px-2 py-2 text-center">{automation.aberturas7h * 37}</td>
            <td className="border border-gray-300 px-2 py-2 text-center">{automation.aberturas8h * 38}</td>
            <td className="border border-gray-300 px-2 py-2 text-center">{automation.aberturas9h * 30}</td>
            <td className="border border-gray-300 px-2 py-2 text-center">{automation.aberturas10h * 32}</td>
          </>
        );
      case "anos":
        return (
          <>
            <td className="border border-gray-300 px-2 py-2 text-center">{automation.aberturas1h * 360}</td>
            <td className="border border-gray-300 px-2 py-2 text-center">{automation.aberturas2h * 365}</td>
            <td className="border border-gray-300 px-2 py-2 text-center">{automation.aberturas3h * 361}</td>
            <td className="border border-gray-300 px-2 py-2 text-center">{automation.aberturas4h * 365}</td>
            <td className="border border-gray-300 px-2 py-2 text-center">{automation.aberturas5h * 363}</td>
            <td className="border border-gray-300 px-2 py-2 text-center">{automation.aberturas6h * 364}</td>
            <td className="border border-gray-300 px-2 py-2 text-center">{automation.aberturas7h * 365}</td>
            <td className="border border-gray-300 px-2 py-2 text-center">{automation.aberturas8h * 365}</td>
            <td className="border border-gray-300 px-2 py-2 text-center">{automation.aberturas9h * 360}</td>
            <td className="border border-gray-300 px-2 py-2 text-center">{automation.aberturas10h * 361}</td>
          </>
        );
      default:
        return null;
    }
  };

  const renderHeaderColumns = (automation: AutomationProps) => {
    switch (filter) {
      case "horas":
        return (
          <>
            <td className="border border-gray-300 px-2 py-2 text-center">1h</td>
            <td className="border border-gray-300 px-2 py-2 text-center">2h</td>
            <td className="border border-gray-300 px-2 py-2 text-center">3h</td>
            <td className="border border-gray-300 px-2 py-2 text-center">4h</td>
            <td className="border border-gray-300 px-2 py-2 text-center">5h</td>
            <td className="border border-gray-300 px-2 py-2 text-center">6h</td>
            <td className="border border-gray-300 px-2 py-2 text-center">7h</td>
            <td className="border border-gray-300 px-2 py-2 text-center">8h</td>
            <td className="border border-gray-300 px-2 py-2 text-center">9h</td>
            <td className="border border-gray-300 px-2 py-2 text-center">10h</td>
          </>
        );
      case "dias":
        return renderTableHeaderForDays();
      case "meses":
        return renderTableHeaderForMonths();
      case "anos":
        return renderTableHeaderForYears();
      default:
        return null;
    }
  };

  return (
    <div>
      <h1 className="text-center mt-5 mb-4 font-bold text-3xl text-[#000000]">Automações</h1>
      
      <div className="flex justify-center gap-4 mb-4">
        {["horas", "dias", "meses", "anos"].map((option) => (
          <button
            key={option}
            onClick={() => setFilter(option as "horas" | "dias" | "meses" | "anos")}
            className={`px-4 py-2 rounded ${
              filter === option ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
            } hover:bg-blue-500 hover:text-white`}
          >
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-6 mx-4">
        {data.length > 0 ? (
          data.map((automation) => (
            <div
              key={automation.name}
              className="border rounded-lg shadow-md p-4 bg-white hover:shadow-lg transition-shadow duration-300"
            >
              <h2 className="font-bold text-xl text-gray-800 mb-3">{automation.name}</h2>
              <p className="text-left mt-2 mb-3 font-medium text-sm text-gray-600">
                Instância da cardinal: {automation.instancia}
              </p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="overflow-x-auto">
                  <table className="min-w-full border-collapse border border-gray-300 rounded-lg bg-gray-100 overflow-hidden">
                    <thead>
                      <tr className="bg-gray-500 text-white">
                        <th className="border border-gray-300 px-2 py-2 text-center">Indicador</th>
                        {renderHeaderColumns(automation)}
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-gray-200 transition-colors">
                        <td className="border border-gray-300 px-2 py-2 text-center font-medium">Aberturas</td>
                        {renderTimeColumns(automation)}
                      </tr>
                      <tr className="hover:bg-gray-200 transition-colors">
                        <td className="border border-gray-300 px-2 py-2 text-center font-medium">Fechamentos</td>
                        {renderTimeColumns(automation)}
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="h-[200px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={prepareChartData(automation)}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 20,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="aberturas"
                        stroke="#4CAF50"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        name="Aberturas"
                      />
                      <Line
                        type="monotone"
                        dataKey="fechamentos"
                        stroke="#F44336"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        name="Fechamentos"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">Nenhum dado encontrado.</p>
        )}
      </div>
    </div>
  );
}