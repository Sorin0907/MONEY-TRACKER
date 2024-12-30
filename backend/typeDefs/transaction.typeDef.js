const transactionTypeDef = `#graphql
  type Transaction {
    id: ID!
    userId: ID!
    description: String!
    paymentType: String!
    category: String!
    amount: Float!
    location: String
    date: String!
  }

  type Query {
    GetTransactions: [Transaction!]
    GetTransaction(id: ID!): Transaction!
  }

  type Mutation {
    CreateTransaction(input: CreateTransactionInput!): Transaction!
    UpdateTransaction(input: UpdateTransactionInput!): Transaction!
    DeleteTransaction(id: ID!): Transaction!
  }

  input CreateTransactionInput {
    description: String!
    paymentType: String!
    category: String!
    amount: Float!
    location: String
    date: String!
  }

  input UpdateTransactionInput {
    id: ID!
    description: String
    paymentType: String
    category: String
    amount: Float
    location: String
    date: String
  }
`;

export default transactionTypeDef;
