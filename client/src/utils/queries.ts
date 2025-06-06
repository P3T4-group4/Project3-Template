import { gql } from '@apollo/client';

export const QUERY_PROFILES = gql`
  query allProfiles {
    profiles {
      _id
      name
    }
  }
`;

export const QUERY_SINGLE_PROFILE = gql`
  query singleProfile($profileId: ID!) {
    profile(profileId: $profileId) {
      _id
      name
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

export const QUERY_ME = gql`
  query me {
    me {
      _id
      name
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

export const SEARCH_PROFILE = gql`
  query searchProfile($name: String!) {
    searchProfile(name: $name) {
      _id
      name
    }
  }
`;
