/* eslint-disable react/prop-types */
import { FaLocationDot } from "react-icons/fa6";
import { BsCardText } from "react-icons/bs";
import { MdOutlinePayments } from "react-icons/md";
import { FaSackDollar } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { HiPencilAlt } from "react-icons/hi";
import { Link } from "react-router-dom";
import { upperCase } from "../../utils/upper-case";
import { formatEuropeanDate } from "../../utils/format-date";
import { useMutation } from "@apollo/client";
import { DELETE_TRANSACTION } from "../../graphql/mutations/delete-transaction";
import toast from "react-hot-toast";

const categoryColorMap = {
  saving: "from-green-600 to-green-300",  // More neutral earthy green
  expense: "from-orange-600 to-yellow-400",  // Professional and bright orange
  investment: "from-teal-600 to-teal-400",  // Calm and secure teal gradient
};

const Card = ({ transaction }) => {
  const [deleteTransaction, { loading: deleting }] = useMutation(DELETE_TRANSACTION, {
    refetchQueries: ["GetTransactions"],
  });

  let { category, amount, location, date, paymentType, description } = transaction;

  const cardClass = categoryColorMap[category];

  description = upperCase(description);
  category = upperCase(category);

  const formattedDate = formatEuropeanDate(date);

  const handleDelete = async () => {
    try {
      await deleteTransaction({
        variables: {
          id: transaction?.id,
        },
      });
      toast.success("Transaction deleted successfully");
    } catch (error) {
      toast.error(`Failed to delete transaction: ${error.message}`);
    }
  };

  return (
    <div className={`rounded-xl shadow-lg p-6 bg-gradient-to-br ${cardClass}`}>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">{category}</h2>
          <div className="flex gap-4 items-center">
            {deleting ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <FaTrash className="cursor-pointer text-white hover:text-red-500" onClick={handleDelete} />
                <Link to={`/transaction/${transaction.id}`}>
                  <HiPencilAlt className="cursor-pointer text-white hover:text-teal-400" size={20} />
                </Link>
              </>
            )}
          </div>
        </div>
        <p className="text-white flex items-center gap-2">
          <BsCardText />
          Description: {description}
        </p>
        <p className="text-white flex items-center gap-2">
          <MdOutlinePayments />
          Payment Type: {paymentType}
        </p>
        <p className="text-white flex items-center gap-2">
          <FaSackDollar />
          Amount: ${amount}
        </p>
        <p className="text-white flex items-center gap-2">
          <FaLocationDot />
          Location: {location}
        </p>
        <div className="flex justify-between items-center mt-4">
          <p className="text-xs text-gray-100">{formattedDate}</p>
          <img
            src={"https://tecdn.b-cdn.net/img/new/avatars/2.webp"}
            className="h-8 w-8 border rounded-full"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
