import { connect } from 'mongoose';
import { isProduction } from './appconfig.js';

const connectDB = async () => {
    const DBURL = isProduction
        ? process.env.MONGODB_URI
        : process.env.MONGODB_URI_DEV;
    try {
        console.log('MongoDB connection started . . .');
        await connect(DBURL);
        console.log('MongoDB connected');
    } catch (error) {
        console.error(error);
        throw new Error('Failed to connect to MongoDB');
    }
};
export default connectDB;
