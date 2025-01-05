import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation CreateUser($input: UserInput!) {
    CreateUser(input: $input) {
      id
    }
  }
`;
