const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    image: {
        type: Array,
        required: true
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: String,
        required: true
    },
    discount: {
        type: Number,
        default: 0
    },
    discription: {
        type: String,
        reuired: true
    },
    productType: {
        type: String,
        enum: ["hot item", "new arrival", "on sale"],
        default: "new arrival"
    }
}, { timestamps: true })

const Product = mongoose.model("Product", productSchema);

module.exports = Product