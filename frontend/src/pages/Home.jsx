import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import TransactionForm from "../components/UI/TransactionForm";
import Cards from "../components/UI/Cards";

import { useQuery } from "@apollo/client";
import { GET_TRANSACTIONS_STATS } from "../graphql/queries/get-transactions-stats.query";
import { useEffect, useState } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

/**
 * Home Component
 *
 * This component serves as the main dashboard for the application. It includes functionality for:
 * - Fetching and displaying transaction statistics using a doughnut chart.
 * - Allowing users to add transactions through a form.
 *
 * Dependencies:
 * - React and React hooks (useState, useEffect)
 * - Apollo Client (useQuery, useMutation)
 * - Chart.js and react-chartjs-2 for chart rendering
 * - React icons (MdLogout)
 */
const Home = () => {
  const [activeTab, setActiveTab] = useState("dashboard"); // "dashboard" or "history"

  const { data: stats, loading: statsLoading } = useQuery(
    GET_TRANSACTIONS_STATS
  );

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "$",
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
        borderRadius: 30,
        spacing: 10,
        cutout: 130,
      },
    ],
  });

  useEffect(() => {
    if (stats?.GetTransactionsStats) {
      const categories = stats?.GetTransactionsStats.map(
        (stat) => stat.category
      );
      const amounts = stats?.GetTransactionsStats.map((stat) => stat.amount);

      const colors = [];
      const borderColors = [];

      categories.forEach((category) => {
        if (category === "saving") {
          colors.push("#22c55e"); // Modern green
          borderColors.push("#166534"); // Darker green
        }
        if (category === "expense") {
          colors.push("#fbbf24"); // Amber
          borderColors.push("#b45309"); // Darker amber
        }
        if (category === "investment") {
          colors.push("#ef4444"); // Red
          borderColors.push("#b91c1c"); // Darker red
        }
      });

      setChartData((prev) => ({
        labels: categories,
        datasets: [
          {
            ...prev.datasets[0],
            data: amounts,
            backgroundColor: colors,
            borderColor: borderColors,
          },
        ],
      }));
    }
  }, [stats]);

  return (
    <div className="flex flex-col gap-8 items-center max-w-7xl mx-auto p-6 relative">
      {/* Transaction Form */}
      <div className="flex justify-center items-center w-full">
        <div className="w-full md:w-2/3 lg:w-1/2 bg-gray-800 p-6 rounded-lg shadow-md">
          <TransactionForm />
        </div>
      </div>

      {/* Tabbed Interface */}
      <div className="w-full flex flex-col items-center">
        {/* Tabs */}
        <div className="flex gap-6 mb-6">
          <button
            className={`px-6 py-2 rounded-lg font-semibold ${
              activeTab === "dashboard"
                ? "bg-teal-500 text-gray-100"
                : "bg-gray-700 text-gray-300"
            } hover:bg-teal-400 transition`}
            onClick={() => setActiveTab("dashboard")}
          >
            Dashboard
          </button>
          <button
            className={`px-6 py-2 rounded-lg font-semibold ${
              activeTab === "history"
                ? "bg-teal-500 text-gray-100"
                : "bg-gray-700 text-gray-300"
            } hover:bg-teal-400 transition`}
            onClick={() => setActiveTab("history")}
          >
            History
          </button>
        </div>

        {/* Tab Content */}
        <div className="w-full flex justify-center">
          {activeTab === "dashboard" && (
            <div className="flex flex-wrap justify-center items-center gap-8 w-full">
              {Boolean(stats?.GetTransactionsStats.length) && !statsLoading && (
                <div className="h-[330px] w-[330px] md:h-[360px] md:w-[360px] bg-gray-800 rounded-xl shadow-lg p-4">
                  <Doughnut data={chartData} />
                </div>
              )}
            </div>
          )}

          {activeTab === "history" && (
            <div className="w-full">
              {Boolean(stats?.GetTransactionsStats.length) && !statsLoading ? (
                <Cards />
              ) : (
                <p className="text-gray-400 text-center">
                  No transactions recorded yet.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
