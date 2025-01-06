import Transaction from "../models/transaction.model.js";

const transactionResolver = {
  Query: {
    GetTransactions: async (_, __, context) => {
      try {
        if (!context.getUser()) {
          throw new Error("Unauthorized");
        }
        const userId = await context.getUser().id;
        const transactions = await Transaction.find({ userId });
        return transactions;
      } catch (error) {
        console.error(error);
      }
    },
    GetTransaction: async (_, { id }) => {
      try {
        const transaction = await Transaction.findById(id);
        return transaction;
      } catch (error) {
        console.error(error);
      }
    },
    GetTransactionsStats: async (_, __, context) => {
      if (!context.getUser()) {
        throw new Error("Unauthorized");
      }
      const userId = await context.getUser().id;
      const transactions = await Transaction.find({ userId });
      const categoryMap = {};

      transactions.forEach((transaction) => {
        if (!categoryMap[transaction.category]) {
          categoryMap[transaction.category] = 0;
        }
        categoryMap[transaction.category] += transaction.amount;
      })
      return Object.entries(categoryMap).map(([category, amount]) => ({ category, amount }));
    },
  },
  Mutation: {
    CreateTransaction: async (_, { input }, context) => {
      try {
        const transaction = new Transaction({
          ...input,
          userId: context.getUser().id,
        });

        await transaction.save();
        return transaction;
      } catch (error) {
        console.error(error);
      }
    },
    UpdateTransaction: async (_, { input }) => {
      try {
        const transactionToUpdate = await Transaction.findByIdAndUpdate(
          input.id,
          input,
          { new: true }
        );
        return transactionToUpdate;
      } catch (error) {
        console.error(error);
      }
    },
    DeleteTransaction: async (_, { id }) => {
      try {
        const transactionToDelete = await Transaction.findByIdAndDelete(id);
        return transactionToDelete;
      } catch (error) {
        console.error(error);
      }
    },
  },
};

export default transactionResolver;
