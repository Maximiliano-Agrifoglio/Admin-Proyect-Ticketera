import mongoose from "mongoose";
import colors from 'colors';
import { exit } from 'node:process';

const connectDB = async () => {

    try {
        const {connection} = await mongoose.connect(process.env.DATABASE_URL);
        const url = `${connection.host} : ${connection.port}`
        console.log(colors.cyan(`App conectada a mongoDB en : ${url}`));
    } catch (error) {
        console.log(colors.red(error.message));
        exit(1);
    }
}

export default connectDB;

