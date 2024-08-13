
import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    id: {
        type: Number,
        require: true
    },
    title: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    sold: {
        type: Boolean,
        require: true
    },
    dateOfSale: {
        type: Date
    }

})

const Product = mongoose.model("product", ProductSchema)

export default Product