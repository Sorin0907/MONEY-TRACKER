const userTypeDef = `#graphql
  type User {
    id: ID!
    username: String!
    name: String!
    password: String!
    profilePicture: String
    gender: String!
  }

  type Query {
    GetUser(id: ID!): User!
    AuthUser: User
  }

  type Mutation {
    CreateUser(input: UserInput!): User
    LoginUser(input: UserLoginInput!): User
    LogoutUser: LogoutResponse
  }

  input UserInput {
    username: String!
    name: String!
    password: String!
    gender: String!
  }

  input UserLoginInput {
    username: String!
    password: String!
  }

  type LogoutResponse {
    message: String!
  }
`;

export default userTypeDef;