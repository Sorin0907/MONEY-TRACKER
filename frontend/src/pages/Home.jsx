import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import Cards from "../components/UI/Cards";
import TransactionForm from "../components/UI/TransactionForm";

import { MdLogout } from "react-icons/md";
import { useMutation, useQuery } from "@apollo/client";
import { LOGOUT } from "../graphql/mutations/logout.mutation";
import { GET_TRANSACTIONS_STATS } from "../graphql/queries/get-transactions-stats.query";
import { useEffect, useState } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

/**
 * Home Component
 *
 * This component serves as the main dashboard for the application. It includes functionality for:
 * - Fetching and displaying transaction statistics using a doughnut chart.
 * - Allowing users to add transactions through a form.
 * - Providing a logout mechanism.
 *
 * Dependencies:
 * - React and React hooks (useState, useEffect)
 * - Apollo Client (useQuery, useMutation)
 * - Chart.js and react-chartjs-2 for chart rendering
 * - React icons (MdLogout)
 */
const Home = () => {
  const [logoutUser, { loading, client }] = useMutation(LOGOUT, {
    refetchQueries: ["GetAuthUser"],
  });

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
          colors.push("#00693E");
          borderColors.push("#004225");
        }
        if (category === "expense") {
          colors.push("#F59E0B");
          borderColors.push("#F59E0B");
        }
        if (category === "investment") {
          colors.push("#EF4444");
          borderColors.push("#EF4444");
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

  const handleLogout = async () => {
    try {
      await logoutUser();
      client.resetStore();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-6 items-center max-w-7xl mx-auto z-20 relative justify-center">
        <div className="flex items-center">
          <p className="md:text-4xl text-2xl lg:text-4xl font-bold text-center relative z-50 mb-4 mr-4 bg-gradient-to-r from-pink-600 via-indigo-500 to-pink-400 inline-block text-transparent bg-clip-text">
            Spend wisely, track wisely
          </p>
          <img
            src={"https://tecdn.b-cdn.net/img/new/avatars/2.webp"}
            className="w-11 h-11 rounded-full border cursor-pointer"
            alt="Avatar"
          />
          {!loading && (
            <MdLogout
              className="mx-2 w-5 h-5 cursor-pointer"
              onClick={handleLogout}
            />
          )}
          {/* loading spinner */}
          {loading && (
            <div className="w-6 h-6 border-t-2 border-b-2 mx-2 rounded-full animate-spin"></div>
          )}
        </div>
        <div className="flex flex-wrap w-full justify-center items-center gap-6">
          {Boolean(stats?.GetTransactionsStats.length) && !statsLoading && (
            <div className="h-[330px] w-[330px] md:h-[360px] md:w-[360px]  ">
              <Doughnut data={chartData} />
            </div>
          )}
          <TransactionForm />
        </div>
        {Boolean(stats?.GetTransactionsStats.length) && !statsLoading && (
          <Cards />
        )}
      </div>
    </>
  );
};
export default Home;
