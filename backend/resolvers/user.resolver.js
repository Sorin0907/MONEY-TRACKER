import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

const userResolver = {
  Mutation: {
    CreateUser: async (_, { input }, context) => {
      try {
        const { username, name, password, gender } = input;
        if (!username || !name || !password || !gender) {
          throw new Error("All fields are required");
        }

        const userExists = await User.findOne({ username });
        if (userExists) {
          throw new Error("User already exists");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const avatarPic = `https://avatar.iran.liara.run/username?username=${username}&bold=false&length=1`;

        const newUser = new User({
          username,
          name,
          password: hashedPassword,
          profilePicture: avatarPic,
        });

        await newUser.save();
        await context.login(newUser);
        return newUser;
      } catch (error) {
        console.error(error);
      }
    },
    LoginUser: async (_, { input }, context) => {
      try {
        const { username, password } = input;
        if (!username || !password) {
          throw new Error("All fields are required");
        }
        const { user } = await context.authenticate("graphql-local", {
          username,
          password,
        });

        await context.login(user);
        return user;
      } catch (error) {
        console.error(error);
      }
    },
    LogoutUser: async (_, __, context) => {
      try {
        await context.logout();
        context.req.session.destroy((err) => {
          if (err) {
            console.error(err);
          }
        });
        context.res.clearCookie("connect.sid");

        return { message: "Logged out" };
      } catch (error) {
        console.error(error);
      }
    },
  },
  Query: {
    GetUser: async (_, { id }) => {
      try {
        const user = await User.findById(id);
        return user;
      } catch (error) {
        console.error(error);
      }
    },
    AuthUser: async (_, __, context) => {
      try {
        return await context.getUser();
      } catch (error) {
        console.error(error);
      }
    },
  },
};

export default userResolver;
