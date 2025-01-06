import { gql } from '@apollo/client';

export const CREATE_TRANSACTION = gql`
  mutation CreateTransaction($input: CreateTransactionInput!) {
    CreateTransaction(input: $input) {
      id
      userId
      description
      paymentType
      category
      amount
      location
      date
    }
  }
`;
