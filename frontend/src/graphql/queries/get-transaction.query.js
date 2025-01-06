import { gql } from '@apollo/client';

export const GET_TRANSACTION = gql`
  query GetTransaction($id: ID!) {
    GetTransaction(id: $id) {
      id
      userId
      amount
      description
      paymentType
      location
      category
      date
    }
  }
`;
