// server/src/seeds/seed.ts
import _mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import db from '../config/connection';
import { Profile } from '../models/Profile';

dotenv.config();

const seedProfiles = async () => {
  try {
    await db();
    console.log('🗑 Deleting all profiles...');
    await Profile.deleteMany({});

    console.log('✨ Creating sample profiles...');
    const saltRounds = 10;

    const profilesData = [
      { name: 'Alice Johnson', email: 'alice@example.com', password: 'password123' },
      { name: 'Bob Smith', email: 'bob@example.com', password: 'password123' },
      { name: 'Carol Lee', email: 'carol@example.com', password: 'password123' },
    ];

    for (const profile of profilesData) {
      const hashedPw = await bcrypt.hash(profile.password, saltRounds);
      await Profile.create({
        name: profile.name,
        email: profile.email,
        password: hashedPw,
      });
    }

    console.log('✅ Seeding complete!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedProfiles();
