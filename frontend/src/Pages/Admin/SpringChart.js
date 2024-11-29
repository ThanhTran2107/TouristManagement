import React, { useState, useEffect } from "react";
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
import BookingService from "../../Services/BookingService";

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
  const [selectedYear, setSelectedYear] = useState("2024");
  const [revenueData, setRevenueData] = useState({ labels: [], datasets: [] });

  const [salesData, setSalesData] = useState({ labels: [], datasets: [] });
  const [salesChartType, setSalesChartType] = useState("byMonth");

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

  useEffect(() => {
    const fetchRevenueData = async () => {
      try {
        const response = await BookingService.getAllBookings();
        const data = response.data;

        const revenueByMonth = {};
        const selectedYearInt = parseInt(selectedYear);

        if (Array.isArray(data)) {
          data.forEach((item) => {
            const bookingDate = new Date(item.bookingDate);
            const year = bookingDate.getFullYear();
            const month = bookingDate.getMonth() + 1;
            const amount = item.totalAmount;

            if (year === selectedYearInt) {
              if (!revenueByMonth[month]) {
                revenueByMonth[month] = 0;
              }
              revenueByMonth[month] += amount;
            }
          });

          const monthNames = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ];

          const labels = Object.keys(revenueByMonth).map(
            (month) => monthNames[month - 1]
          );
          const amounts = Object.values(revenueByMonth);

          setRevenueData({
            labels: labels,
            datasets: [
              {
                label: `Revenue (${selectedYear})`,
                data: amounts,
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
              },
            ],
          });
        }
      } catch (error) {
        console.error("Error fetching revenue data:", error);
      }
    };

    fetchRevenueData();
  }, [selectedYear]);

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await BookingService.getAllBookings();
        const data = response.data;

        const salesByMonth = {};
        const salesByTour = {};
        const salesByType = {};
        const selectedYearInt = parseInt(selectedYear);

        if (Array.isArray(data)) {
          data.forEach((item) => {
            const bookingDate = new Date(item.bookingDate);
            const year = bookingDate.getFullYear();
            const month = bookingDate.getMonth() + 1;
            const tourName = item.tourName;
            const tourType = item.tourType;
            const seatCount = item.seatCount;

            if (year === selectedYearInt) {
              if (!salesByMonth[month]) {
                salesByMonth[month] = 0;
              }
              salesByMonth[month] += seatCount;

              if (!salesByTour[tourName]) {
                salesByTour[tourName] = 0;
              }
              salesByTour[tourName] += seatCount;

              if (!salesByType[tourType]) {
                salesByType[tourType] = 0;
              }
              salesByType[tourType] += seatCount;
            }
          });

          if (salesChartType === "byMonth") {
            const monthNames = [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ];
            const monthLabels = Object.keys(salesByMonth).map(
              (month) => monthNames[month - 1]
            );
            const monthAmounts = Object.values(salesByMonth);
            setSalesData({
              labels: monthLabels,
              datasets: [
                {
                  label: "Tickets sold by month",
                  data: monthAmounts,
                  backgroundColor: "rgba(255, 99, 132, 0.6)",
                  borderColor: "rgba(255, 99, 132, 1)",
                  borderWidth: 2,
                },
              ],
            });
          }

          if (salesChartType === "byTourName") {
            const tourLabels = Object.keys(salesByTour);
            const tourAmounts = Object.values(salesByTour);
            setSalesData({
              labels: tourLabels,
              datasets: [
                {
                  label: "Tickets sold by tour name",
                  data: tourAmounts,
                  backgroundColor: "rgba(54, 162, 235, 0.6)",
                  borderColor: "rgba(54, 162, 235, 1)",
                  borderWidth: 2,
                },
              ],
            });
          }

          if (salesChartType === "byTourType") {
            const typeLabels = Object.keys(salesByType);
            const typeAmounts = Object.values(salesByType);
            setSalesData({
              labels: typeLabels,
              datasets: [
                {
                  label: "Tickets sold by tour type",
                  data: typeAmounts,
                  backgroundColor: "rgba(75, 192, 192, 0.6)",
                  borderColor: "rgba(75, 192, 192, 1)",
                  borderWidth: 2,
                },
              ],
            });
          }
        }
      } catch (error) {
        console.error("Error fetching sales data:", error);
      }
    };

    fetchSalesData();
  }, [salesChartType, selectedYear]);


  const handleChangeChart = (event) => {
    setSelectedChart(event.target.value);
  };

  const handleChangeYear = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleChangeSalesChartType = (event) => {
    setSalesChartType(event.target.value);
  };

  return (
    <div style={Styles.container}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <select
          onChange={handleChangeChart}
          value={selectedChart}
          style={Styles.select}
        >
          <option value="revenue">Revenue Chart</option>
          <option value="sales">Sales Chart</option>
          <option value="customers">Customers Chart</option>
        </select>
        <select
          onChange={handleChangeYear}
          value={selectedYear}
          style={Styles.select}
        >
          <option value="2024">2024</option>
          <option value="2025">2025</option>
          <option value="2026">2026</option>
        </select>
      </div>

      {selectedChart === "revenue" && (
        <div style={Styles.chartContainer}>
          <Bar data={revenueData} options={options} width={300} height={100} />
        </div>
      )}

      {selectedChart === "sales" && (
        <div>
          <select
            onChange={handleChangeSalesChartType}
            value={salesChartType}
            style={Styles.select}
          >
            <option value="byMonth">Month</option>
            <option value="byTourName">Tour Name</option>
            <option value="byTourType">Tour Type</option>
          </select>

          <div style={Styles.chartContainer}>
            {salesChartType === "byMonth" && (
              <Bar
                data={salesData}
                options={options}
                width={300}
                height={100}
              />
            )}
            {salesChartType === "byTourName" && (
              <Bar
                data={salesData}
                options={options}
                width={300}
                height={100}
              />
            )}
            {salesChartType === "byTourType" && (
              <Bar
                data={salesData}
                options={options}
                width={300}
                height={100}
              />
            )}
          </div>
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
    outline: "none",
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