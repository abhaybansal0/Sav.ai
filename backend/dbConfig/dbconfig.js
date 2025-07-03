import mongoose from 'mongoose'
import dotenv from 'dotenv'

export default async function dbConnect () {


    dotenv.config();
    const URI = process.env.MONGOURI;

    try {
        
        await mongoose.connect(URI);
        const connection = mongoose.connection;

        // console.log(connection);

        connection.on('connected', () => {
            console.log('Connected to DB');
        });

        connection.on('disconnected', () => {
            console.log('Disconnected from DB');
        })

        connection.on('error', () => {
            console.log('Error connecting to DB');
        })

    } catch (error) {
        console.log('Error in db', error);
        
    }
    

}

dbConnect();