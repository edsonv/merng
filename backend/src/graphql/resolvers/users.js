import { ApolloServerErrorCode } from '@apollo/server/errors';
import bcrypt from 'bcryptjs';
import { GraphQLError } from 'graphql';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../../../config.js';
import { User } from '../../models/Users.js';
import {
  validateLoginInput,
  validateRegisterInput,
} from '../../util/validators.js';

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    SECRET_KEY,
    { expiresIn: '1h' }
  );
}

export default {
  Mutation: {
    login: async (_, { username, password }) => {
      const { errors, valid } = validateLoginInput(username, password);

      if (!valid) {
        throw new GraphQLError('Errors', {
          extensions: {
            code: ApolloServerErrorCode.GRAPHQL_VALIDATION_FAILED,
            ...errors,
          },
        });
      }

      const user = await User.findOne({ username });

      if (!user) {
        errors.general = 'User not found';
        throw new GraphQLError('User not found', {
          extensions: {
            code: ApolloServerErrorCode.GRAPHQL_VALIDATION_FAILED.at,
            ...errors,
          },
        });
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        errors.general = 'Wrong credentials';
        throw new GraphQLError('Wrong credentials', {
          extensions: {
            code: ApolloServerErrorCode.GRAPHQL_VALIDATION_FAILED.at,
            ...errors,
          },
        });
      }

      const token = generateToken(user);

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
    register: async (
      _,
      { registerInput: { username, email, password, confirmPassword } }
    ) => {
      // TODO: Validate user data
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );

      if (!valid) {
        throw new GraphQLError('Errors', {
          extensions: {
            code: ApolloServerErrorCode.GRAPHQL_VALIDATION_FAILED,
            ...errors,
          },
        });
      }
      // TODO: Make sure user doesn't already exist
      const user = await User.findOne({ username });

      if (user) {
        throw new GraphQLError('Username is taken', {
          extensions: {
            code: ApolloServerErrorCode.BAD_USER_INPUT,
          },
        });
      }
      // TODO: Hash password and create an auth token
      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();

      const token = generateToken(res);

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};
