"use client"; // Necessário para usar hooks no Next.js

import { useEffect, useState } from "react";

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

  // UseEffect para buscar os dados da API
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:4000/users');
      const result = await response.json();
      setData(result);
    };

    fetchData();
  }, []); // O array vazio [] garante que o efeito será executado apenas uma vez

  const renderTableHeaderForYears = () => {
    const currentYear = new Date().getFullYear(); // Obtém o ano atual
    const numberOfYears = 10; // Número de anos que você quer mostrar
  
    let years = [];
    for (let i = 0; i < numberOfYears; i++) {
      years.push(
        <th key={i} className="border border-gray-300 px-2 py-2 text-center">
          {currentYear - i} {/* Exibe o ano atual e retrocede */}
        </th>
      );
    }
    return years;
  };

  // Função para renderizar os meses dinamicamente, começando pelo mês atual e retrocedendo
  const renderTableHeaderForMonths = () => {
    const currentDate = new Date(); // Obtém a data atual
    const currentMonth = currentDate.getMonth(); // Mês atual (0 - 11)
    const currentYear = currentDate.getFullYear(); // Ano atual
    const numberOfMonths = 10; // Número de meses que você quer mostrar

    let months = [];
    for (let i = 0; i < numberOfMonths; i++) {
      // Calcula o mês e o ano de forma correta
      const monthIndex = (currentMonth - i + 12) % 12; // Mês ajustado circularmente
      console.log("mes:" + monthIndex + " i:"+ i + " currentYear:" + currentYear);
      const teste = Math.floor((currentMonth - i) / 12);
      console.log("teste:" + teste);
      const year = currentYear + teste; // Ajusta o ano

      // Obtém o nome do mês (de acordo com o mês e ano calculados)
      const monthName = new Date(year, monthIndex).toLocaleString('default', { month: 'long' });

      months.push(
        <th key={i} className="border border-gray-300 px-2 py-2 text-center">
          {monthName} {year} {/* Exibe o nome do mês e o ano */}
        </th>
      );
    }
    return months;
  };

  // Função para renderizar os dias dinamicamente, começando do dia atual e retrocedendo
  const renderTableHeaderForDays = () => {
    const currentDate = new Date(); // Obtém a data atual
    const currentDay = currentDate.getDate(); // Dia atual
    const currentMonth = currentDate.getMonth(); // Mês atual (0 - 11)
    const currentYear = currentDate.getFullYear(); // Ano atual
    const numberOfDays = 10; // Número de dias que você quer mostrar

    let days = [];
    for (let i = 0; i < numberOfDays; i++) {
      // Cria uma nova data com o dia atual menos o número de dias que você quer retroceder
      const day = new Date(currentYear, currentMonth, currentDay - i);

      // Obtém o nome do mês (para exibir junto com o dia)
      const monthName = day.toLocaleString('default', { month: 'long' });

      // Obtém o ano
      const year = day.getFullYear();

      // Obtém o dia
      const dayOfMonth = day.getDate();

      days.push(
        <th key={i} className="border border-gray-300 px-2 py-2 text-center">
          {dayOfMonth} {monthName} {year} {/* Exibe o dia, nome do mês e o ano */}
        </th>
      );
    }
    return days;
  };

  // Função para renderizar as células com base no filtro de tempo
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
        return (
          <>
            {renderTableHeaderForDays()}
          </>
        );
      case "meses":
        return (
          <>
            {renderTableHeaderForMonths()}
          </>
        );
      case "anos":
        return (
          <>
            {renderTableHeaderForYears()}
          </>
        );
      default:
        return null;
    }
  };


  return (
    <div>
      <h1 className="text-center mt-5 mb-4 font-bold text-3xl text-[#000000]">Automações</h1>
      
      {/* Botões de filtro */}
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

      {/* Exibição dos dados */}
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
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">Nenhum dado encontrado.</p>
        )}
      </div>
    </div>
  );
}
