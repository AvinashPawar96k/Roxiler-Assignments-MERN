
import mongoose from 'mongoose';

import { keys } from './keys.js';

export const connectDb = async () => {

    try {

        const url = keys.DB_URI
        const connect = await mongoose.connect(url);

        console.log("Mongo Db connected successfully......");


    } catch (error) {

        console.log("error is ", error);


    }

}