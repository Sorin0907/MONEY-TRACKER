import { gql } from "@apollo/client";

export const DELETE_TRANSACTION = gql`
  mutation DeleteTransaction($id: ID!) {
    DeleteTransaction(id: $id) {
      id
    }
  }
`;