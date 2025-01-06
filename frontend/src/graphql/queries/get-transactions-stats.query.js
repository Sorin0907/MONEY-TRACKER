import { gql } from '@apollo/client';

export const GET_TRANSACTIONS_STATS = gql`
  query GetTransactionsStats {
    GetTransactionsStats {
      category
      amount
    }
  }
`;