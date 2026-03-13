const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    user: {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        checkoutIDs: [{
            checkOutid: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "CheckOut"
            }
        }],
        productId: [{
            product_id:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Product"
            }
        }],
        paymentdetail: [{
            razorpay_order_id: {
                type: String,
                required: true
            },
            razorpay_payment_id: {
                type: String,
                required: true
            },
            razorpay_signature: {
                type: String,
                required: true
            }
        }]
    }
}, { timestamps: true })

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;