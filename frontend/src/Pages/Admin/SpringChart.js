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
import FeedbackService from "../../Services/FeedBackService";

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
  const [revenueChartType, setRevenueChartType] = useState("byMonth");

  const [salesData, setSalesData] = useState({ labels: [], datasets: [] });
  const [salesChartType, setSalesChartType] = useState("byMonth");

  const [feedbackData, setFeedbackData] = useState({
    labels: [],
    datasets: [],
  }); 
  const [feedbacksChartType, setFeedbacksChartType] = useState("byRating");

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
        const revenueByTour = {};
        const revenueByType = {};
        const selectedYearInt = parseInt(selectedYear);

        if (Array.isArray(data)) {
          data.forEach((item) => {
            const bookingDate = new Date(item.bookingDate);
            const year = bookingDate.getFullYear();
            const month = bookingDate.getMonth() + 1;
            const amount = item.totalAmount;
            const tourName = item.tourDetails.tourName || "Unknown Tour";
            const tourType = item.tourDetails.tourType || "Unknown Type";

          if (
            year === selectedYearInt &&
            item.paymentStatus === "PAYMENT_SUCCESSFUL"
          ) {
            revenueByMonth[month] = (revenueByMonth[month] || 0) + amount;
            revenueByTour[tourName] = (revenueByTour[tourName] || 0) + amount;
            revenueByType[tourType] = (revenueByType[tourType] || 0) + amount;
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

          if (revenueChartType === "byMonth") {
            const labels = Object.keys(revenueByMonth).map(
              (month) => monthNames[month - 1]
            );
            const amounts = Object.values(revenueByMonth);

            const backgroundColors = [
              "rgba(75, 192, 192, 0.6)",
              "rgba(255, 99, 132, 0.6)",
              "rgba(255, 206, 86, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(153, 102, 255, 0.6)",
              "rgba(255, 159, 64, 0.6)",
              "rgba(255, 99, 132, 0.6)",
              "rgba(75, 192, 192, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(255, 206, 86, 0.6)",
              "rgba(153, 102, 255, 0.6)",
              "rgba(255, 159, 64, 0.6)",
            ];

            setRevenueData({
              labels: labels,
              datasets: [
                {
                  label: `Revenue by month (${selectedYear})`,
                  data: amounts,
                  backgroundColor: backgroundColors.slice(0, labels.length),
                  borderWidth: 1,
                },
              ],
            });
          }

          if (revenueChartType === "byTourName") {
            const tourLabels = Object.keys(revenueByTour);
            const tourAmounts = Object.values(revenueByTour);
            setRevenueData({
              labels: tourLabels.length > 0 ? tourLabels : ["No Data"],
              datasets: [
                {
                  label: `Revenue by tour Name (${selectedYear})`,
                  data: tourAmounts.length > 0 ? tourAmounts : [0],
                  backgroundColor: "rgba(75, 192, 192, 0.6)",
                  borderColor: "rgba(54, 162, 235, 1)",
                  borderWidth: 1,
                },
              ],
            });
          }

          if (revenueChartType === "byTourType") {
            const typeLabels = Object.keys(revenueByType);
            const typeAmounts = Object.values(revenueByType);
            setRevenueData({
              labels: typeLabels.length > 0 ? typeLabels : ["No Data"],
              datasets: [
                {
                  label: `Revenue by tour Type (${selectedYear})`,
                  data: typeAmounts.length > 0 ? typeAmounts : [0],
                  backgroundColor: [
                    "rgba(255, 99, 132, 0.6)",
                    "rgba(54, 162, 235, 0.6)",
                  ],
                  borderWidth: 2,
                },
              ],
            });
          }
        }
      } catch (error) {
        console.error("Error fetching revenue data:", error);
      }
    };

    fetchRevenueData();
  }, [selectedYear, revenueChartType]);

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

            const tourName = item.tourDetails.tourName || "Unknown Tour";
            const tourType = item.tourDetails.tourType || "Unknown Type";
            const seatCount = item.seatCount || 0;

            if (
              year === selectedYearInt &&
              item.paymentStatus === "PAYMENT_SUCCESSFUL"
            ) {
              salesByMonth[month] = (salesByMonth[month] || 0) + seatCount;
              salesByTour[tourName] = (salesByTour[tourName] || 0) + seatCount;
              salesByType[tourType] = (salesByType[tourType] || 0) + seatCount;
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

            const backgroundColors = [
              "rgba(75, 192, 192, 0.6)",
              "rgba(255, 99, 132, 0.6)",
              "rgba(255, 206, 86, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(153, 102, 255, 0.6)",
              "rgba(255, 159, 64, 0.6)",
              "rgba(255, 99, 132, 0.6)",
              "rgba(75, 192, 192, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(255, 206, 86, 0.6)",
              "rgba(153, 102, 255, 0.6)",
              "rgba(255, 159, 64, 0.6)",
            ];

            setSalesData({
              labels: monthLabels,
              datasets: [
                {
                  label: `Tickets sold by month (${selectedYear})`,
                  data: monthAmounts,
                  backgroundColor: backgroundColors.slice(
                    0,
                    monthLabels.length
                  ),
                  borderWidth: 1,
                },
              ],
            });
          }

          if (salesChartType === "byTourName") {
            const tourLabels = Object.keys(salesByTour);
            const tourAmounts = Object.values(salesByTour);
            setSalesData({
              labels: tourLabels.length > 0 ? tourLabels : ["No Data"],
              datasets: [
                {
                  label: `Tickets sold by tour name (${selectedYear})`,
                  data: tourAmounts.length > 0 ? tourAmounts : [0],
                  backgroundColor: "rgba(75, 192, 192, 0.6)",
                  borderColor: "rgba(54, 162, 235, 1)",
                  borderWidth: 1,
                },
              ],
            });
          }

          if (salesChartType === "byTourType") {
            const typeLabels = Object.keys(salesByType);
            const typeAmounts = Object.values(salesByType);
            setSalesData({
              labels: typeLabels.length > 0 ? typeLabels : ["No Data"],
              datasets: [
                {
                  label: `Tickets sold by tour type (${selectedYear})`,
                  data: typeAmounts.length > 0 ? typeAmounts : [0],
                  backgroundColor: [
                    "rgba(255, 99, 132, 0.6)",
                    "rgba(54, 162, 235, 0.6)",
                  ],
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

  useEffect(() => {
    const fetchFeedbackData = async () => {
      try {
        const response = await FeedbackService.getAllFeedBacks();
        const data = response.data;
        const selectedYearInt = parseInt(selectedYear);

        const feedbackCounts = {};
        if (Array.isArray(data)) {
          data.forEach((item) => {
            const rating = item.rating || "No Rating";
           
            feedbackCounts[rating] = (feedbackCounts[rating] || 0) + 1;
          });

          const labels = Object.keys(feedbackCounts);
          const counts = Object.values(feedbackCounts);

          setFeedbackData({
            labels: labels.length > 0 ? labels : ["No Data"],
            datasets: [
              {
                label: `Feedbacks by rating (${selectedYear})`,
                data: counts.length > 0 ? counts : [0],
                backgroundColor: [
                  "rgba(255, 99, 132, 0.6)",
                  "rgba(54, 162, 235, 0.6)",
                ],
                borderWidth: 1,
              },
            ],
          });
        }
      } catch (error) {
        console.error("Error fetching feedback data:", error);
      }
    };

    fetchFeedbackData();
  }, [feedbacksChartType, selectedYear]);

  const handleChangeChart = (event) => {
    setSelectedChart(event.target.value);
  };

  const handleChangeYear = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleChangeSalesChartType = (event) => {
    setSalesChartType(event.target.value);
  };

  const handleChangeRevenueChartType = (event) => {
    setRevenueChartType(event.target.value);
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
          <option value="feedbacks">Feedbacks Chart</option>
        </select>
        {selectedChart !== "feedbacks" && (
          <select
            onChange={handleChangeYear}
            value={selectedYear}
            style={Styles.select}
          >
            <option value="2024">2024</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
          </select>
        )}
      </div>

      {selectedChart === "revenue" && (
        <div>
          <select
            onChange={handleChangeRevenueChartType}
            value={revenueChartType}
            style={Styles.select}
          >
            <option value="byMonth">Month</option>
            <option value="byTourName">Tour Name</option>
            <option value="byTourType">Tour Type</option>
          </select>
          {revenueChartType !== "byTourType" && (
            <div style={Styles.chartContainer}>
              {revenueChartType === "byMonth" && (
                <Bar
                  data={revenueData}
                  options={options}
                  width={300}
                  height={100}
                />
              )}
              {revenueChartType === "byTourName" && (
                <Line
                  data={revenueData}
                  options={options}
                  width={300}
                  height={100}
                />
              )}
            </div>
          )}
          {revenueChartType === "byTourType" && (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div style={Styles.pieContainer}>
                <Pie data={revenueData} options={options} />
              </div>
            </div>
          )}
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
          {salesChartType !== "byTourType" && (
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
                <Line
                  data={salesData}
                  options={options}
                  width={300}
                  height={100}
                />
              )}
            </div>
          )}
          {salesChartType === "byTourType" && (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div style={Styles.pieContainer}>
                <Pie data={salesData} options={options} />
              </div>
            </div>
          )}
        </div>
      )}

      {selectedChart === "feedbacks" && (
        <div>
          <div style={Styles.chartContainer}>
            <Bar
              data={feedbackData}
              options={{
                ...options,
                title: {
                  display: true,
                  text: "Feedbacks by Rating",
                },
              }}
              width={300}
              height={100}
            />
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
