// server/src/models/Profile.ts

import { Schema, model, Types } from 'mongoose';

export interface IProfile {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  followers: Types.ObjectId[];
  following: Types.ObjectId[];
}

const profileSchema = new Schema<IProfile>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Profile',
      },
    ],
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Profile',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

export const Profile = model<IProfile>('Profile', profileSchema);
