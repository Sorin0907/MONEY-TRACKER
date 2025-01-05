import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation Login($input: UserLoginInput!) {
    LoginUser(input: $input) {
      id
      username
    }
  }
`;
