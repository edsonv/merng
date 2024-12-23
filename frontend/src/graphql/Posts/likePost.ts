import { gql } from '@apollo/client';
import { DocumentNode } from 'graphql';

export const LIKE_POST: DocumentNode = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      body
      username
      comments {
        id
        body
        username
        createdAt
      }
      likes {
        id
        username
        createdAt
      }
    }
  }
`;
