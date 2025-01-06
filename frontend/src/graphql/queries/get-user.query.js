import { gql } from '@apollo/client';

export const GET_USER = gql`
  query GetUser($id: ID!) {
    GetUser(id: $id) {
      id
      username
      name
      profilePicture
      transactionsConnection {
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
  }
`;
