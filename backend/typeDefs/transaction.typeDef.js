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
    GetTransactionsStats: [TransactionsStats!]
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

  type TransactionsStats {
    category: String!
    amount: Float!
  }
`;

export default transactionTypeDef;
