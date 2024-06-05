import { Line } from "react-chartjs-2";
import { User } from "../../admin/dashboard/AdminDashboard";

interface UserContributionsProps {
  user: User | null;
}

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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
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
      beginAtZero: true,
      ticks: {
        callback: function (value, index, values) {
          // Display only the first and last label
          return index === 0 || index === values.length - 1 ? value : "";
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

const getPastDate = (days) => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toLocaleDateString();
};

const labels = Array.from({ length: 6 }, (_, i) => getPastDate(5 - i));

const data = {
  labels,
  datasets: [
    {
      label: "Contributions",
      data: labels.map(
        () => Math.floor(Math.random() * 21) //TOBECHANGED
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
