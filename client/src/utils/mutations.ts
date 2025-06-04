// client/src/utils/mutations.ts
import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        name
        email
      }
    }
  }
`;

export const ADD_PROFILE = gql`
  mutation AddProfile($name: String!, $email: String!, $password: String!) {
    addProfile(name: $name, email: $email, password: $password) {
      token
      user {
        _id
        name
        email
      }
    }
  }
`;

export const FOLLOW_PROFILE = gql`
  mutation FollowProfile($profileId: ID!) {
    followProfile(profileId: $profileId) {
      _id
      name
      email
      followers {
        _id
        name
      }
      following {
        _id
        name
      }
    }
  }
`;

export const UNFOLLOW_PROFILE = gql`
  mutation UnfollowProfile($profileId: ID!) {
    unfollowProfile(profileId: $profileId) {
      _id
      name
      email
      followers {
        _id
        name
      }
      following {
        _id
        name
      }
    }
  }
`;
