import axios from "axios"
import Product from "../model/product.schema.js";


export const seedController = async (req, res) => {

    try {

        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        const products = response.data;


        console.log("Product is ", response.data);

        const { data } = response


        await Product.deleteMany({});

        await Product.insertMany(data);

        res.status(200).send('Database initialized with seed data');

    } catch (error) {
        console.error(error);
        res.status(500).send('Error initializing the database');
    }

}