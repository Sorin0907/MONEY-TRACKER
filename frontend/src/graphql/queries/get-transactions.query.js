import { gql } from '@apollo/client';

export const GET_TRANSACTIONS = gql`
  query GetTransactions {
    GetTransactions {
      id
      amount
      description
      paymentType
      category
      location
      date
    }
  }
`;