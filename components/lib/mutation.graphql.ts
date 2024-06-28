import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation signIn($CreateUserInput: CreateUserInput!) {
    signIn(createUserInput: $CreateUserInput) {
      Email
      Password
      Name
    }
  }
`;
export const LOGIN_USER = gql`
  mutation Login($CreateUserInput: CreateUserInput!) {
    logIn(createUserInput: $CreateUserInput) {
      Email
      Password
      accessToken
      Name
    }
  }
`;
export const CREATE_POST = gql`
  mutation ($createPostInput: CreatePostInput!) {
    createPost(createPostInput: $createPostInput) {
      description
      dislikes
      likes
      video
      id
      image
      userId
    }
  }
`;