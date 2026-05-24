import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from '../models/User.model.js';

dotenv.config();

await mongoose.connect(process.env.MONGODB_URI);

// Delete existing admin if any
await User.deleteOne({ email: 'admin@alquresh.pk' });

const admin = await User.create({
  name: 'Admin',
  email: 'admin@alquresh.pk',
  password: 'Admin@123',
  phone: '03001234567',
  role: 'admin',
});

console.log('✅ Admin created successfully!');
console.log('   Email:    admin@alquresh.pk');
console.log('   Password: Admin@123');
console.log('   Role:     admin');

await mongoose.disconnect();
process.exit(0);
