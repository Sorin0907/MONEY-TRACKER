import passport from "passport";
import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import { GraphQLLocalStrategy } from "graphql-passport";

export const passportConfig = async () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });

  passport.use(
    new GraphQLLocalStrategy(async (username, password, done) => {
      try {
        const user = await User.findOne({ username });
        if (!user) {
          throw new Error("Invalid username or password");
        }

        const passwordValid = await bcrypt.compare(password, user.password);
        if (!passwordValid) {
          throw new Error("Invalid username or password");
        }

        done(null, user);
      } catch (error) {
        done(error);
      }
    })
  );
};
