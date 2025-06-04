// server/src/schemas/resolvers.ts
import { AuthenticationError } from 'apollo-server-express';
import bcrypt from 'bcrypt';
import { Profile } from '../models/Profile';
import { signToken } from '../utils/auth';

interface Context {
  user: {
    _id: string;
    name: string;
    email: string;
  } | null;
}

export const resolvers = {
  Query: {
    // Get all profiles
    profiles: async () => {
      return await Profile.find().populate('followers').populate('following');
    },

    // Get a single profile by ID
    profile: async (_parent: any, { profileId }: { profileId: string }) => {
      return await Profile.findById(profileId).populate('followers').populate('following');
    },

    // Get the current logged-in user
    me: async (_parent: any, _args: any, context: Context) => {
      if (!context.user) {
        throw new AuthenticationError('Not logged in');
      }
      return await Profile.findById(context.user._id).populate('followers').populate('following');
    },

    // Search by name or email
    searchProfile: async (_parent: any, { searchTerm }: { searchTerm: string }) => {
      const regex = new RegExp(searchTerm, 'i');
      return await Profile.find({
        $or: [{ name: regex }, { email: regex }],
      }).limit(10);
    },
  },

  Mutation: {
    // Signup: create a new profile, return Auth payload
    addProfile: async (
      _parent: any,
      { name, email, password }: { name: string; email: string; password: string }
    ) => {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const newProfile = await Profile.create({
        name,
        email,
        password: hashedPassword,
      });

      // Convert ObjectId to string for JWT
      const token = signToken(newProfile.name, newProfile.email, newProfile._id.toString());
      return { token, profile: newProfile };
    },

    // Login: validate credentials, return Auth payload
    login: async (_parent: any, { email, password }: { email: string; password: string }) => {
      const profile = await Profile.findOne({ email });
      if (!profile) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const validPw = await bcrypt.compare(password, profile.password);
      if (!validPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(profile.name, profile.email, profile._id.toString());
      return { token, profile };
    },

    // Delete the current logged-in user
    removeProfile: async (_parent: any, _args: any, context: Context) => {
      if (!context.user) {
        throw new AuthenticationError('Not logged in');
      }
      return await Profile.findByIdAndDelete(context.user._id);
    },

    // Follow another profile
    followProfile: async (_parent: any, { profileId }: { profileId: string }, context: Context) => {
      if (!context.user) {
        throw new AuthenticationError('You must be logged in to follow');
      }
      const userId = context.user._id;
      if (userId === profileId) {
        throw new Error("You can't follow yourself");
      }
      // Add to “following” array of current user
      await Profile.findByIdAndUpdate(userId, {
        $addToSet: { following: profileId },
      });
      // Add to “followers” array of the target profile
      const updatedTarget = await Profile.findByIdAndUpdate(
        profileId,
        { $addToSet: { followers: userId } },
        { new: true }
      )
        .populate('followers')
        .populate('following');
      return updatedTarget;
    },

    // Unfollow another profile
    unfollowProfile: async (_parent: any, { profileId }: { profileId: string }, context: Context) => {
      if (!context.user) {
        throw new AuthenticationError('You must be logged in to unfollow');
      }
      const userId = context.user._id;
      // Pull from “following” array of current user
      await Profile.findByIdAndUpdate(userId, { $pull: { following: profileId } });
      // Pull from “followers” array of the target profile
      const updatedTarget = await Profile.findByIdAndUpdate(
        profileId,
        { $pull: { followers: userId } },
        { new: true }
      )
        .populate('followers')
        .populate('following');
      return updatedTarget;
    },
  },
};
