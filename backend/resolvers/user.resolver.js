import { users } from "../dummyData/data.js";

const userResolver = {
  Query: {
    GetUsers: (_, _, { req, res }) => {
      return users;
    },
    GetUser: (_, { id }) => {
      return users.find((user) => user.id === id);
    },
  },
  Mutation: {},
};

export default userResolver;
