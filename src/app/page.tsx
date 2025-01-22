"use client"; // Necessário para usar hooks no Next.js
import * as XLSX from 'xlsx'; // Importando a biblioteca XLSX

import { useEffect, useState } from "react";

interface Valores {
  [key: string]: {
    aberturas: number;
    fechamentos: number;
  };
}

interface AutomationPropsV2 {
  script: string;
  valores: Valores;
  IP: string;
}

const mockData2: AutomationPropsV2[] = [
  {
    "script": "AutomacaoBazzo.groovy",
    "valores": {
      "2025-1-20 13": { "aberturas": 6, "fechamentos": 2 },
      "2025-1-20 14": { "aberturas": 5, "fechamentos": 4 },
      "2025-1-20 15": { "aberturas": 6, "fechamentos": 8 },
      "2025-1-20 16": { "aberturas": 11, "fechamentos": 13 },
      "2025-1-20 17": { "aberturas": 9, "fechamentos": 22 },
      "2025-1-20 18": { "aberturas": 10, "fechamentos": 7 },
      "2025-1-20 19": { "aberturas": 10, "fechamentos": 20 },
      "2025-1-20 20": { "aberturas": 20, "fechamentos": 29 },
      "2025-1-20 21": { "aberturas": 18, "fechamentos": 19 },
      "2025-1-20 22": { "aberturas": 22, "fechamentos": 10 },
    },
    "IP": "10.113.144.214",
  },
  {
    "script": "AutomacaoBruno.groovy",
    "valores": {
      "2025-1-20 13": { "aberturas": 5, "fechamentos": 6 },
      "2025-1-20 14": { "aberturas": 13, "fechamentos": 3 },
      "2025-1-20 15": { "aberturas": 10, "fechamentos": 12 },
      "2025-1-20 16": { "aberturas": 11, "fechamentos": 9 },
      "2025-1-20 17": { "aberturas": 13, "fechamentos": 3 },
      "2025-1-20 18": { "aberturas": 13, "fechamentos": 3 },
      "2025-1-20 19": { "aberturas": 10, "fechamentos": 12 },
      "2025-1-20 20": { "aberturas": 11, "fechamentos": 9 },
      "2025-1-20 21": { "aberturas": 18, "fechamentos": 13 },
      "2025-1-20 22": { "aberturas": 22, "fechamentos": 10 },
    },
    "IP": "10.113.144.213",
  },
  {
    "script": "AutomacaoAbellan.groovy",
    "valores": {
      "2025-1-20 13": { "aberturas": 20, "fechamentos": 50 },
      "2025-1-20 14": { "aberturas": 21, "fechamentos": 30 },
      "2025-1-20 15": { "aberturas": 19, "fechamentos": 11 },
      "2025-1-20 16": { "aberturas": 13, "fechamentos": 91 },
      "2025-1-20 17": { "aberturas": 10, "fechamentos": 36 },
      "2025-1-20 18": { "aberturas": 22, "fechamentos": 34 },
      "2025-1-20 19": { "aberturas": 9, "fechamentos": 55 },
      "2025-1-20 20": { "aberturas": 15, "fechamentos": 18 },
      "2025-1-20 21": { "aberturas": 18, "fechamentos": 13 },
      "2025-1-20 22": { "aberturas": 22, "fechamentos": 10 },
    },
    "IP": "10.113.222.222",
  }
];

export default function Home() {
  const [data, setData] = useState<AutomationPropsV2[]>([]);
  const [filter, setFilter] = useState<"horas" | "dias" | "meses" | "anos">("horas");

  // UseEffect para buscar os dados da API
  useEffect(() => {
    const fetchData = async () => {
      //const response = await fetch('http://localhost:2012/api/all/days');
      //const result = await response.json();
      //console.log(result);
      //setData(result);
      setData(mockData2);
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

  // Função para renderizar as horas dinamicamente, começando da hora atual e retrocedendo
const renderTableHeaderForHours = () => {
  const currentDate = new Date(); // Obtém a data e hora atual
  const currentHour = currentDate.getHours(); // Hora atual
  const numberOfHours = 10; // Número de horas que você quer mostrar

  let hours = [];
  for (let i = 0; i < numberOfHours; i++) {
    // Cria uma nova data com a hora atual menos o número de horas que você quer retroceder
    const hour = new Date(currentDate.getTime() - i * 60 * 60 * 1000);

    // Obtém a hora
    const hourOfDay = hour.getHours();

    // Obtém o dia
    const dayOfMonth = hour.getDate();

    // Obtém o nome do mês (para exibir junto com o dia)
    const monthName = hour.toLocaleString('default', { month: 'long' });

    // Obtém o ano
    const year = hour.getFullYear();

    hours.push(
      <th key={i} className="border border-gray-300 px-2 py-2 text-center">
        {hourOfDay}:00  {/* Exibe a hora, dia, nome do mês e o ano // - {dayOfMonth} {monthName} {year} */}
      </th>
    );
  }
  return hours;
};

  // Função para renderizar as células com base no filtro de tempo
  const renderColumnsAbertura = (automation: AutomationPropsV2) => {
    const timeKeys = Object.keys(automation.valores);
  
    switch (filter) {
      case "horas":
        return (
          <>
            {timeKeys.map((key) => (
              <td key={key} className="border border-gray-300 px-2 py-2 text-center">
                {automation.valores[key].aberturas}
              </td>
            ))}
          </>
        );
      case "dias":
        return (
          <>
            {timeKeys.map((key) => (
              <td key={key} className="border border-gray-300 px-2 py-2 text-center">
                {automation.valores[key].aberturas * 24}
              </td>
            ))}
          </>
        );
      case "meses":
        return (
          <>
            {timeKeys.map((key) => (
              <td key={key} className="border border-gray-300 px-2 py-2 text-center">
                {automation.valores[key].aberturas * 31}
              </td>
            ))}
          </>
        );
      case "anos":
        return (
          <>
            {timeKeys.map((key) => (
              <td key={key} className="border border-gray-300 px-2 py-2 text-center">
                {automation.valores[key].aberturas * 365}
              </td>
            ))}
          </>
        );
      default:
        return null;
    }
  };

  const renderColumnsFechamento = (automation: AutomationPropsV2) => {
    const timeKeys = Object.keys(automation.valores);
  
    switch (filter) {
      case "horas":
        return (
          <>
            {timeKeys.map((key) => (
              <td key={key} className="border border-gray-300 px-2 py-2 text-center">
                {automation.valores[key].fechamentos}
              </td>
            ))}
          </>
        );
      case "dias":
        return (
          <>
            {timeKeys.map((key) => (
              <td key={key} className="border border-gray-300 px-2 py-2 text-center">
                {automation.valores[key].fechamentos * 24}
              </td>
            ))}
          </>
        );
      case "meses":
        return (
          <>
            {timeKeys.map((key) => (
              <td key={key} className="border border-gray-300 px-2 py-2 text-center">
                {automation.valores[key].fechamentos * 31}
              </td>
            ))}
          </>
        );
      case "anos":
        return (
          <>
            {timeKeys.map((key) => (
              <td key={key} className="border border-gray-300 px-2 py-2 text-center">
                {automation.valores[key].fechamentos * 365}
              </td>
            ))}
          </>
        );
      default:
        return null;
    }
  };

  const renderHeaderColumns = () => {
    switch (filter) {
      case "horas":
        return (
          <>
          {renderTableHeaderForHours()}
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

  // Função para exportar os dados para Excel
  const exportToExcel = (automation: AutomationPropsV2) => {
    let tableData: any[][] = [];
    const timeKeys = Object.keys(automation.valores);
  
    switch (filter) {
      case "horas":
        tableData = [
          ["Indicador", ...timeKeys.map(key => `${key.split(' ')[1]}h`)], // Cabeçalho
          ["Aberturas", ...timeKeys.map(key => automation.valores[key].aberturas)],
          ["Fechamentos", ...timeKeys.map(key => automation.valores[key].fechamentos)],
        ];
        break;
      case "dias":
        tableData = [
          ["Indicador", ...timeKeys.map(key => `${key.split(' ')[0]}`)], // Cabeçalho
          ["Aberturas", ...timeKeys.map(key => automation.valores[key].aberturas * 24)],
          ["Fechamentos", ...timeKeys.map(key => automation.valores[key].fechamentos * 24)],
        ];
        break;
      case "meses":
        tableData = [
          ["Indicador", ...timeKeys.map(key => `${key.split(' ')[0]}`)], // Cabeçalho
          ["Aberturas", ...timeKeys.map(key => automation.valores[key].aberturas * 31)],
          ["Fechamentos", ...timeKeys.map(key => automation.valores[key].fechamentos * 31)],
        ];
        break;
      case "anos":
        tableData = [
          ["Indicador", ...timeKeys.map(key => `${key.split(' ')[0]}`)], // Cabeçalho
          ["Aberturas", ...timeKeys.map(key => automation.valores[key].aberturas * 365)],
          ["Fechamentos", ...timeKeys.map(key => automation.valores[key].fechamentos * 365)],
        ];
        break;
      default:
        return;
    }
  
    // Converter os dados em uma planilha
    const ws = XLSX.utils.aoa_to_sheet(tableData); // Usa aoa_to_sheet para uma matriz de arrays
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Dados");
  
    // Gera o arquivo Excel e inicia o download
    XLSX.writeFile(wb, `${automation.script}_dados.xlsx`);
  };
  

  return (
    <div>
      <div className="flex justify-between items-center mt-5 mb-4 mx-4">
        <h1 className="font-bold text-3xl text-[#000000]">Automações TEMS</h1>
      </div>
  
      {/* Botões de filtro */}
      <div className="flex justify-center gap-4 mb-4">
        {["horas", "dias", "meses", "anos"].map((option) => (
          <button
            key={option}
            onClick={() => setFilter(option as "horas" | "dias" | "meses" | "anos")}
            className={`px-4 py-2 rounded ${filter === option ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"} hover:bg-blue-500 hover:text-white`}
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
              key={automation.script}
              className="border rounded-lg shadow-md p-4 bg-white hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex justify-between items-center">
                <h2 className="font-bold text-xl text-gray-800 mb-3">{automation.script}</h2>
                <button
                  onClick={() => exportToExcel(automation)}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Exportar Dados
                </button>
              </div>
              <p className="text-left mt-2 mb-3 font-medium text-sm text-gray-600">
                Instância da cardinal: {automation.IP}
              </p>
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-300 rounded-lg bg-gray-100 overflow-hidden">
                  <thead>
                    <tr className="bg-gray-500 text-white">
                      <th className="border border-gray-300 px-2 py-2 text-center">Indicador</th>
                      {renderHeaderColumns()}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-gray-200 transition-colors">
                      <td className="border border-gray-300 px-2 py-2 text-center font-medium">Aberturas</td>
                      {renderColumnsAbertura(automation)}
                    </tr>
                    <tr className="hover:bg-gray-200 transition-colors">
                      <td className="border border-gray-300 px-2 py-2 text-center font-medium">Fechamentos</td>
                      {renderColumnsFechamento(automation)}
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
