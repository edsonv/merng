import { gql } from '@apollo/client';
import { DocumentNode } from 'graphql';

export const DELETE_POST: DocumentNode = gql`
  mutation deletePost( $postId: ID! ){
    deletePost(postId: $postId)
  }
`;