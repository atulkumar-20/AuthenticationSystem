import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {});
    console.log('Database connected');
  } catch (error) {
    console.error('Error connecting to DB', error);
    process.exit(1);
  }
};
export default connectDB;
