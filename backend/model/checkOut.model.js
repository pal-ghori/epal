const mongoose = require("mongoose");

const checkOutSchema = new mongoose.Schema({
    user: {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        cart_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Cart"
        },
        detail: [{
            name: {
                type: String,
                required: true
            },
            // name of house and bulding name
            addressOne: {
                type: String,
                required: true
            },
            // name of colony and near by
            addressTwo: {
                type: String,
            },
            pinCode: {
                type: Number,
                required: true
            },
            city: {
                type: String,
                required: true
            },
            state: {
                type: String,
                required: true
            },
            mobile: {
                type: Number,
                required: true
            },
            place: {
                type: String,
                required: true,
                enum: ["Home", "Office"],
                default: "Home"
            },
            deliveryMethod:{
                type:String,
                required:true,
                enum:["cash on delivery","online"]
            },
            isPlaced:{
                type:Boolean,
                default:false
            }
        }]
    }
},{timestamps:true})

const CheckOut = mongoose.model("CheckOut", checkOutSchema)

module.exports = CheckOut;