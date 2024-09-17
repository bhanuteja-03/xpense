import React, { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Box, CircularProgress, Typography } from "@mui/material";
import { format, parseISO, getDay } from "date-fns"; // For working with dates
import { useExpensesStore } from "../../../store/main/expenses/expenseStore";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register required components from Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ExpenseBarChart: React.FC = () => {
  const {
    calendarCountData,
    fetchCalendarCountLoading,
    fetchCalendarCount,
    totalAmountSpentPerMonth,
  } = useExpensesStore();

  useEffect(() => {
    // Fetch expenses for the month when the component loads
    fetchCalendarCount("202409"); // Example: Fetch data for September 2024
  }, [fetchCalendarCount]);

  // Function to determine the color based on the day of the week
  const getColorByDay = (dateString: string) => {
    const dayOfWeek = getDay(parseISO(dateString)); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const colors = [
      "rgba(255, 99, 132, 0.6)", // Sunday (Red)
      "rgba(54, 162, 235, 0.6)", // Monday (Blue)
      "rgba(255, 206, 86, 0.6)", // Tuesday (Yellow)
      "rgba(75, 192, 192, 0.6)", // Wednesday (Green)
      "rgba(153, 102, 255, 0.6)", // Thursday (Purple)
      "rgba(255, 159, 64, 0.6)", // Friday (Orange)
      "rgba(199, 199, 199, 0.6)", // Saturday (Gray)
    ];
    return colors[dayOfWeek];
  };

  // Prepare the data for the chart
  const chartData = {
    labels: calendarCountData.map((expense) =>
      format(parseISO(expense.date), "dd MMM")
    ),
    datasets: [
      {
        label: "Amount Spent (per day)",
        data: calendarCountData.map((expense) => expense.totalAmount),
        backgroundColor: calendarCountData.map((expense) =>
          getColorByDay(expense.date)
        ), // Assign color based on day of the week
        borderWidth: 1,
      },
    ],
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      height="100%"
      width={"100%"}
    >
      {fetchCalendarCountLoading ? (
        <CircularProgress />
      ) : calendarCountData.length > 0 ? (
        <>
          <Box width={"100%"}>
            <Bar
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "top",
                  },
                  title: {
                    display: true,
                    text: "Daily Expenses for the Month",
                  },
                },
                scales: {
                  x: {
                    title: {
                      display: true,
                      text: "Date",
                    },
                  },
                  y: {
                    title: {
                      display: true,
                      text: "Total Amount ($)",
                    },
                    beginAtZero: true, // Ensure the y-axis starts at 0
                  },
                },
              }}
              width={"90%"}
              height={400}
            />
          </Box>
          {/* Display total amount spent */}
          <Typography variant="h6" sx={{ mt: 2 }}>
            Total Amount Spent: {totalAmountSpentPerMonth.toFixed(2)}
          </Typography>
        </>
      ) : (
        <p>No data available</p>
      )}
    </Box>
  );
};

export default ExpenseBarChart;
