const { User } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError} = require('apollo-server-express')

const resolvers = {
    Query: {
      me: async (parent, args, context) => {
        if (context.user) {
            const foundUser = await User.findOne({ _id: context.user._id})
            .select('-__v-password')
             
            return foundUser;
          } 
          throw new AuthenticationError('Not logged in');
        }  
    },

    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args); 
            const token = signToken(user);
            
            return { token, user };
        },
        login: async (parent, args) => {
            const user = await User.findOne({ email: args.email });

            if (!user) { 
                throw new AuthenticationError('user not found')
            }
           
            const password = await user.isCorrectPassword(args.password);

            if (!password) {
                throw new AuthenticationError('wrong password')
            }
            const token = signToken(user);
            return { token, user };
        },
        saveBook: async (parent, args, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: args.bookInfo } },
                    { new: true, runValidators: true }
                  ); 

                  return updatedUser;
            }
                throw new AuthenticationError('Must be signed in');
        },
        removeBook: async (parent, args, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId: args.bookId } } },
                    { new: true }
                  );
                  return updatedUser; 
            }
            throw new AuthenticationError('Must be signed in')
        }
    }
}
