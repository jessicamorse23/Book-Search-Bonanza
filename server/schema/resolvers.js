const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (_, args, context) => {
      if (context.user) {
        const userData = await User.findOne({_id: context.user._id}).select(
          "_v -password"
        );
        return userData;
      }
      throw new AuthenticationError("Please Login First");
    },
  },

  Mutation: {
    login: async (_, {email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("Incorrect Email and/or Password");
      }
      const token = signToken(user);
      return { token, user };
    },
    saveBook: async (_, { input }, context) => {
      if (context.user) {
        const updateUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBookes: input }},
          {new: true, runValidators: true}
        );
        return updateUser;
      }
      throw new AuthenticationError("Please Login!");
    },
    removeBook: async (_, {bookId}, context) => {
      if (context.user) {
        const updateUserAgain = await User.findOneAndUpdate(
          {_id: context.user._id}, 
          { $pull: { savedBooks: { bookId: bookId }}},
          {new: true}
        );
        return updateUserAgain;
      }
      throw new AuthenticationError("Please Login!");
    },
  },
};

module.exports = resolvers;