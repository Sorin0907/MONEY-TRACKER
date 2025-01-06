import { useQuery } from "@apollo/client";
import Card from "./Card";
import { GET_TRANSACTIONS } from "../../graphql/queries/get-transactions.query";

const Cards = () => {
  const { data, loading } = useQuery(GET_TRANSACTIONS);
  const transactions = data?.GetTransactions;

	return (
		<div className='w-full px-10 min-h-[40vh]'>
			<p className='text-5xl font-bold text-center my-10'>History</p>
			<div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-start mb-20'>
				{!loading && transactions?.map((transaction) => (
          <Card key={transaction.id} transaction={transaction} />
        ))}
			</div>
		</div>
	);
};
export default Cards;