import { useQuery } from "@apollo/client";
import Card from "./Card";
import { GET_AUTH_USER } from "../../graphql/queries/get-auth-user.query";
import { GET_USER } from "../../graphql/queries/get-user.query";
import CardSkeleton from "../skeletons/CardSkeleton";

const Cards = () => {
  const { data: authUser, loading: loadingAuthUser } = useQuery(GET_AUTH_USER);
  const authUserId = authUser?.AuthUser.id;
  const { data: userTransactions, loading: loadingUserTransactions } = useQuery(GET_USER, {
    variables: { id: authUserId },
  });
  const transactions = userTransactions?.GetUser?.transactionsConnection;

  const isLoaded = !loadingAuthUser && !loadingUserTransactions;

  if (loadingAuthUser || loadingUserTransactions) return (
    <div className='w-full px-10 min-h-[40vh]'>
      <p className='text-5xl font-bold text-center my-10'>Loading...</p>
      <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-start mb-20'>
        {[...Array(6)].map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </div>
  );

  return (
    <div className="w-full px-10 min-h-[40vh]">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-start mb-20">
        {isLoaded && transactions?.map((transaction) => (
          <Card key={transaction.id} transaction={transaction} />
        ))}
      </div>
    </div>
  );
};

export default Cards;
