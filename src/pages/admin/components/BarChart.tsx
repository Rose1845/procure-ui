import React from "react";
import { Bar } from "react-chartjs-2";
//import { Chart as ChartJS } from "chart.js";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function BarChart({ chartData }: any) {
  return <Bar data={chartData} />;
}
