import { GraphQLError } from 'graphql';
import { Post } from '../../models/Post.js';
import { checkAuth } from '../../util/check-auth.js';

export default {
  Mutation: {
    createComment: async (_, { postId, body }, context) => {
      const { username } = checkAuth(context);

      if (body.trim() === '') {
        throw new GraphQLError('Comment must not be empty');
      }

      const post = await Post.findById(postId);

      if (post) {
        post.comments.unshift({
          body,
          username,
          createdAt: new Date().toISOString(),
        });

        await post.save();

        return post;
      } else {
        throw new GraphQLError('Post not found');
      }
    },
    deleteComment: async (_, { postId, commentId }, context) => {
      const { username } = checkAuth(context);
      const post = await Post.findById(postId);

      if (post) {
        const commentIndex = post.comments.findIndex((c) => c.id === commentId);

        if (post.comments[commentIndex].username === username) {
          post.comments.splice(commentIndex, 1);

          await post.save();

          return post;
        } else {
          throw new GraphQLError('Action not allowed');
        }
      } else {
        throw new GraphQLError('Post not found');
      }
    },
  },
};
