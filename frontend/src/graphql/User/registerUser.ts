import { DocumentNode, gql } from '@apollo/client';

export const REGISTER_USER: DocumentNode = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ){
      id
      email
      createdAt
      token
    }
  }
`;
