// server/src/schemas/typeDefs.ts
import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  # ------------- TYPES -------------
  type Profile {
    _id: ID!
    name: String!
    email: String!
    password: String!
    createdAt: String
    followers: [Profile]
    following: [Profile]
  }

  type Auth {
    token: String!
    profile: Profile!
  }

  # ---------------- QUERIES ----------------
  type Query {
    profiles: [Profile]!
    profile(profileId: ID!): Profile
    me: Profile
    searchProfile(searchTerm: String!): [Profile]
  }

  # ---------------- MUTATIONS ----------------
  type Mutation {
    addProfile(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    removeProfile: Profile
    followProfile(profileId: ID!): Profile
    unfollowProfile(profileId: ID!): Profile
  }
`;
