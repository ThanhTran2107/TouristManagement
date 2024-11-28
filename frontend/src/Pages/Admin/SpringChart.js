import React, { useState } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement
);

const SpringChart = () => {
  const [selectedChart, setSelectedChart] = useState("revenue");

  const revenueData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Revenue",
        data: [5000, 7000, 8000, 6000, 9000, 12000, 15000],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const salesData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Tours Sold",
        data: [50, 70, 80, 60, 90, 120, 150],
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  const customersData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Customers",
        data: [30, 50, 70, 40, 60, 90, 110],
        backgroundColor: [
          "rgba(255, 206, 86, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(255, 99, 132, 0.6)",
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Tour Statistics",
      },
    },
  };

  const handleChange = (event) => {
    setSelectedChart(event.target.value);
  };

  return (
    <div style={Styles.container}>
      <select
        onChange={handleChange}
        value={selectedChart}
        style={Styles.select}
      >
        <option value="revenue">Revenue Chart</option>
        <option value="sales">Sales Chart</option>
        <option value="customers">Customers Chart</option>
      </select>

      {selectedChart === "revenue" && (
        <div style={Styles.chartContainer}>
          <Bar data={revenueData} options={options} width={300} height={100} />
        </div>
      )}

      {selectedChart === "sales" && (
        <div style={Styles.chartContainer}>
          <Line data={salesData} options={options} width={300} height={100} />
        </div>
      )}

      {selectedChart === "customers" && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={Styles.pieContainer}>
            <Pie data={customersData} options={options} />
          </div>
        </div>
      )}
    </div>
  );
};

const Styles = {
  container: {
    marginTop: "11vh",
    padding: "20px",
    textAlign: "center",
    background: `linear-gradient(to right, #D2DAFF, #EFEFEF, #B1B2FF)`,
    minHeight: "100vh",
  },
  pieContainer: {
    width: "500px",
    height: "500px",
  },
  select: {
    padding: "10px ",
    fontSize: "20px",
    borderRadius: "5px",
    marginBottom: "20px",
    width: "500px",
    textAlign: "center",
    outline: "none"
  },
  chartContainer: {
    border: "1px solid",
    borderRadius: "10px",
    padding: "10px",
    marginBottom: "20px",
    backgroundColor: "white",
  },
};

export default SpringChart;