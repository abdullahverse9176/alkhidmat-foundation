import mongoose, { Schema } from 'mongoose';

// STEP 2: User schema aur model definition
// Yeh model database me users ka data handle karne ke liye hai.
// isme name, email, password, aur role (admin/user) fields honge.

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    role: {
      type: String,
      enum: ['admin', 'user', 'volunteer'],
      default: 'user',
    },
  },
  {
    timestamps: true, // is se createdAt aur updatedAt automatically manage ho jayenge
  }
);

// Next.js hot reloading ki wajah se hum check karte hain ke model pehle se register to nahi hai.
// Agar pehle se hai to usay reuse karenge, warna naya model register karenge.
export const User = mongoose.models.User || mongoose.model('User', UserSchema);
