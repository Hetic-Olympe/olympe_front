import type { ChartData, ChartOptions, Tick } from "chart.js";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      grid: {
        display: false,
      },
      beginAtZero: true,
    },
    x: {
      type: "category", // Assurez-vous que le type est correct pour l'axe x
      ticks: {
        callback: function (
          value: string | number,
          index: number,
          values: Tick[]
        ) {
          // Afficher uniquement la première et la dernière étiquette
          return index === 0 || index === values.length - 1
            ? value.toString()
            : "";
        },
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
};

const getPastDate = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toLocaleDateString();
};

const labels = Array.from({ length: 6 }, (_, i) => getPastDate(5 - i));

const data: ChartData<"line"> = {
  labels,
  datasets: [
    {
      label: "Contributions",
      data: labels.map(
        () => Math.floor(Math.random() * 21) // Valeur aléatoire pour les contributions
      ),
      borderColor: "rgb(251, 146, 60)",
      backgroundColor: "rgba(251, 146, 60, 0.5)",
    },
  ],
};

export default function UserContributions() {
  return (
    <div style={{ height: "250px" }}>
      <Line options={options} data={data} />
    </div>
  );
}
