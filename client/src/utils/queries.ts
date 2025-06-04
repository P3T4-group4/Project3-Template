// client/src/utils/queries.ts
import { gql } from '@apollo/client';

export const QUERY_PROFILES = gql`
  query GetProfiles {
    profiles {
      _id
      name
      email
      followers { _id name }
      following { _id name }
    }
  }
`;

export const QUERY_SINGLE_PROFILE = gql`
  query GetProfile($profileId: ID!) {
    profile(profileId: $profileId) {
      _id
      name
      email
      followers { _id name }
      following { _id name }
    }
  }
`;

export const QUERY_ME = gql`
  query Me {
    me {
      _id
      name
      email
      followers { _id name }
      following { _id name }
    }
  }
`;

export const QUERY_SEARCH_PROFILE = gql`
  query SearchProfile($searchTerm: String!) {
    searchProfile(searchTerm: $searchTerm) {
      _id
      name
      email
    }
  }
`;
