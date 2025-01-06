import { gql } from '@apollo/client';

export const UPDATE_TRANSACTION = gql`
  mutation UpdateTransaction($input: UpdateTransactionInput!) {
    UpdateTransaction(input: $input) {
      id
      amount
      description
      category
      date
    }
  }
`;