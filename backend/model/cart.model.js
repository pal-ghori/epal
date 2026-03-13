const mongoose = require("mongoose");

const addToCartSchema = new mongoose.Schema({
    user: {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        product: [{
            product_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            },
            quantity: {
                type: Number,
                default: 1
            }
        }]
    }
}, { timestamps: true })

const Cart = mongoose.model("Cart", addToCartSchema)

module.exports = Cart