require("dotenv").config();
var express = require('express');
var router = express.Router();
const checkOut = require("../model/checkOut.model")
const User = require('../model/user.model')
const Product = require("../model/product.model")
const Order = require("../model/order.model")
const AddToCart = require("../model/cart.model")
const Razorpay = require('razorpay');
const crypto = require("crypto");

const instance = new Razorpay({
    key_id: `rzp_test_SXSYjqBhXWVqTb`,
    key_secret: `DksEJhYIkaV3gPr9AhboqtSH`,
});


router.get("/", (req, res) => {
    return res.send("Check Out...")
})


// ----------------- Create checkOut -----------------
router.post("/add-detail-of-checkOut", async (req, res) => {
    try {
        const { userId, cartId } = req.query;

        // ✅ Validate IDs
        if (!userId) {
            return res.status(400).json({
                status: 400,
                message: "UserId is required"
            });
        }

        if (!cartId) {
            return res.status(400).json({
                status: 400,
                message: "CartId is required"
            });
        }

        // ✅ Check user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({
                status: 400,
                message: "User not found"
            });
        }

        // ✅ Check cart exists
        const cartItems = await AddToCart.findById(cartId);

        if (!cartItems || !cartItems.user || !cartItems.user.product || cartItems.user.product.length === 0) {
            return res.status(400).json({
                status: 400,
                message: "Cart is empty"
            });
        }


        let checkOutData = await checkOut.findOne({ "user.user_id": userId });

        const checkOutDetails = {
            name: req.body.name,
            addressOne: req.body.addressone,
            addressTwo: req.body.addresstwo,
            pinCode: req.body.pincode,
            city: req.body.city,
            state: req.body.state,
            mobile: req.body.mobile,
            place: req.body.place,
            deliveryMethod: req.body.typeofdelivery
        };

        // ✅ Update existing checkOut
       if (checkOutData) {
    checkOutData = await checkOut.findOneAndUpdate(
        { "user.user_id": userId },
        {
            $set: {
                "user.cart_id": cartId,
                "user.detail": [checkOutDetails]
            }
        },
        { new: true }
    );
}
        // ✅ Create new checkOut
        else {
            checkOutData = await checkOut.create({
                user: {
                    user_id: userId,
                    cart_id: cartId,
                    detail: [checkOutDetails]
                }
            });
        }

        return res.status(200).json({
            status: 200,
            message: "checkOut saved successfully",
            data: checkOutData
        });

    } catch (error) {
        console.log("FULL ERROR:", error); // 🔥 important
        console.log("RESPONSE:", error.response);
        console.log("DATA:", error.response?.data);

        res.status(500).json({
            message: error.message
        });
    }
});

// ----------------- Get all checkOut Data -----------------
router.get("/getallcheckOut", async (req, res) => {
    const data = await checkOut.find()

    if (!data) {
        return res.status(400).json({
            status: 400,
            message: "Can not Foundn data"
        })
    }
    return res.status(200).json({
        status: 200,
        data: data
    })
})

// ----------------- Single checkOut Detail -----------------

router.get("/getcheckOut/:id", async (req, res) => {
    const user_id = req.params.id;
    if (user_id) {
        const user = await checkOut.findOne({ "user.user_id": user_id });
        console.log(user);
        return res.status(200).json({
            status: 200,
            data: user
        })
    } else {
        return res.status(400).json({
            status: 400,
            message: "Can not Foundn data"
        })
    }
})

// ----------------- Update checkOut Detail -----------------
router.patch("/updatecheckOutdetail/:id", async (req, res) => {
    try {
        const id = req.params.id
        // Checlk id is valid or not
        if (!id) {
            return res.status(400).json({
                status: 400,
                message: "Can not get Id"
            })
        }
        const checkOutdata = await checkOut.findById(id)
        // check Data or not
        if (!checkOutdata) {
            return res.status(400).json({
                status: 400,
                message: "Can not get checkOut Data"
            })
        }
        // this is for name
        try {
            if (req.body.name) {
                checkOutdata.name = req.body.name
                await checkOutdata.save({ validateBeforeSave: false })
            }
        } catch (error) {
            return res.status(400).json({
                status: 400,
                message: "something went wrong in name update",
                error: error.message
            })
        }
        // this is for addressone 
        try {
            if (req.body.addressone) {
                checkOutdata.addressOne = req.body.addressone
                await checkOutdata.save({ validateBeforeSave: false })
            }
        } catch (error) {
            return res.status(400).json({
                status: 400,
                message: "something went wrong in addressOne update",
                error: error.message
            })
        }
        // this is for AddressTwo
        try {
            if (req.body.addresstwo) {
                checkOutdata.addressTwo = req.body.addresstwo
                await checkOutdata.save({ validateBeforeSave: false })
            }
        } catch (error) {
            return res.status(400).json({
                status: 400,
                message: "something went wrong in addresstwo update",
                error: error.message
            })
        }
        // thi is for City
        try {
            if (req.body.city) {
                checkOutdata.city = req.body.city
                await checkOutdata.save({ validateBeforeSave: false })
            }
        } catch (error) {
            return res.status(400).json({
                status: 400,
                message: "something went wrong in city update",
                error: error.message
            })
        }
        // this is for pincode
        try {
            if (req.body.pincode) {
                checkOutdata.pinCode = req.body.pincode
                await checkOutdata.save({ validateBeforeSave: false })
            }
        } catch (error) {
            return res.status(400).json({
                status: 400,
                message: "something went wrong in pinCode update",
                error: error.message
            })
        }
        // this is for state
        try {
            if (req.body.state) {
                checkOutdata.state = req.body.state
                await checkOutdata.save({ validateBeforeSave: false })
            }
        } catch (error) {
            return res.status(400).json({
                status: 400,
                message: "something went wrong in state update",
                error: error.message
            })
        }
        // this is for mobile
        try {
            if (req.body.mobile) {
                checkOutdata.mobile = req.body.mobile
                await checkOutdata.save({ validateBeforeSave: false })
            }
        } catch (error) {
            return res.status(400).json({
                status: 400,
                message: "something went wrong in mobile update",
                error: error.message
            })
        }
        // this is for place
        try {
            if (req.body.place) {
                checkOutdata.place = req.body.place
                await checkOutdata.save({ validateBeforeSave: false })
            }
        } catch (error) {
            return res.status(400).json({
                status: 400,
                message: "something went wrong in place update",
                error: error.message
            })
        }
        // this is for deliveryMethod
        try {
            if (req.body.deliveryMethod) {
                if (req.body.deliveryMethod == "cash on delivery") {
                    checkOutdata.deliveryMethod = req.body.deliveryMethod
                    checkOutdata.isPlaced = true
                    await checkOutdata.save({ validateBeforeSave: false })
                }
                if (req.body.deliveryMethod == "online") {
                    checkOutdata.deliveryMethod = req.body.deliveryMethod
                    checkOutdata.isPlaced = false
                    await checkOutdata.save({ validateBeforeSave: false })
                }
            }
        } catch (error) {
            return res.status(400).json({
                status: 400,
                message: "something went wrong in deliveryMethod",
                error: error.message
            })
        }
        return res.status(200).json({
            status: 200,
            message: "Data update Successfully !!!"
        })
    } catch (error) {
        return res.status(400).json({
            status: 400,
            message: "something went wrong in update Data",
            error: error.message
        })
    }
})


// ----------------- delete checkOut items -----------------
router.delete("/deletecheckOutitem/:id", async (req, res) => {
    try {
        const id = req.params.id
        // check id is valid or not
        if (!id) {
            return res.status(400).json({
                status: 400,
                message: "can not Found Id"
            })
        }
        // check data is found or not
        try {
            const checkOutData = await checkOut.findById(id)
            if (!checkOutData) {
                return res.status(400).json({
                    status: 400,
                    message: "Can not Foud Any checkOut Item"
                })
            }
            // this is for delete data from database
            try {
                const deletedata = await checkOut.deleteOne({ "_id": id })
                if (!deletedata) {
                    return res.status(400).json({
                        status: 400,
                        message: "can not Found Data of Delete checkOut Item"
                    })
                }
                return res.status(200).json({
                    status: 200,
                    message: "Data Delete Successfully."
                })
            } catch (error) {
                return res.status(400).json({
                    status: 400,
                    message: "Can not delete checkOut item",
                    error: error.message
                })
            }
        } catch (error) {
            return res.status(400).json({
                status: 400,
                message: "something went in found Item",
                error: error.message
            })
        }
    } catch (error) {
        return res.status(400).json({
            status: 400,
            message: "something went wrong in delete item",
            error: error.message
        })
    }
})

// ----------------- create Single product instance ---------------
router.post("/createsingleproductorder/:id", async (req, res) => {
    try {
        const productId = req.params.id
        if (!productId) {
            return res.status(400).json({
                status: 400,
                message: "Can't get ProductID."
            })
        }
        if (productId) {
            const dataOfProduct = await Product.findById(productId)
            if (!dataOfProduct) {
                return res.status(400).json({
                    status: 400,
                    message: "Can't get Product By ID.."
                })
            }
            if (dataOfProduct) {
                const price = parseInt(dataOfProduct.price)
                const discount = parseInt(dataOfProduct.discount)
                // here we check if discount==0 or not 
                // if Zero
                if (discount != 0) {
                    const discountedAmount = ((price * discount) / 100)
                    const paymentPrice = (price - discountedAmount)
                    try {
                        // const { amount, userId, productDetails, userDetails } = req.body;
                        // totalAmount = Number(amount);
                        // userInfo = userId;
                        // productInfo = JSON.parse(productDetails);
                        // userData = JSON.parse(userDetails);
                        const instance = new Razorpay({
                            key_id:  `rzp_test_SXSYjqBhXWVqTb`,
                            key_secret:  `DksEJhYIkaV3gPr9AhboqtSH`,
                        });

                        const options = {
                            amount: Number(paymentPrice * 100),
                            currency: "INR",
                        };
                        const order = await instance.orders.create(options);

                        return res.status(200).json({
                            success: true,
                            data: order,
                        });
                    } catch (error) {
                        return res.status(500).json({
                            status: 500,
                            message: "Internal Server error || can't do payment",
                            error: error.message
                        })
                    }
                }
                // if Greater Then Zero
                else {
                    const paymentPrice = price
                    try {
                        // const { amount, userId, productDetails, userDetails } = req.body;
                        // totalAmount = Number(amount);
                        // userInfo = userId;
                        // productInfo = JSON.parse(productDetails);
                        // userData = JSON.parse(userDetails);

                        const instance = new Razorpay({
                            key_id: `rzp_test_SXSYjqBhXWVqTb`,
                            key_secret: `DksEJhYIkaV3gPr9AhboqtSH`,
                        });

                        const options = {
                            amount: Number(paymentPrice * 100),
                            currency: "INR",
                        };
                        const order = await instance.orders.create(options);

                        return res.status(200).json({
                            success: true,
                            order,
                        });
                    } catch (error) {
                        return res.status(500).json({
                            status: 500,
                            message: "Internal Server error || can't do payment",
                            error: error.message
                        })
                    }
                }
            }
        }
    } catch (error) {
        return res.status(400).json({
            status: 400,
            message: "something went wrong in payment",
            error: error.message
        })
    }
})

// ----------------- create instance for Addtocart -----------------
router.post("/createorderforallcart/:id", async (req, res) => {
    try {
        const addToCartId = req.params.id
        if (!addToCartId) {
            return res.status(400).json({
                status: 400,
                message: "Cart Id not Found.",
            })
        }

        const DataOfCart = await AddToCart.findById(addToCartId)
        if (!DataOfCart) {
            return res.status(400).json({
                status: 400,
                message: "can't found Data By CartId."
            })
        }
        if (DataOfCart) {
            // console.log(DataOfCart.user.user_id)
            // console.log(DataOfCart.user.product.length)
            // console.log(DataOfCart.user.product[0].product_id)
            // console.log(DataOfCart.user.product[0].quantity)
            const user_id = DataOfCart.user.user_id
            const productLength = DataOfCart.user.product.length
            let productId = [];
            let productQuantity = [];
            let totalAmount = 0;

            try {
                for (let i = 0; i < productLength; i++) {
                    productId.push(DataOfCart.user.product[i].product_id)
                    productQuantity.push(DataOfCart.user.product[i].quantity)

                    const dataOfProducts = await Product.findById(DataOfCart.user.product[i].product_id)
                    if (!dataOfProducts) {
                        return res.status(400).json({
                            status: 400,
                            message: "can't get Data By productId."
                        })
                    }
                    if (dataOfProducts) {
                        // console.log(dataOfProducts.price);
                        // console.log(dataOfProducts.discount);
                        if (dataOfProducts.discount > 0) {
                            let discountAmount = ((dataOfProducts.price * dataOfProducts.discount) / 100)
                            let payAmount = (dataOfProducts.price - discountAmount)
                            payAmount *= DataOfCart.user.product[i].quantity
                            totalAmount += payAmount
                            console.log("original Price : - " + dataOfProducts.price + " and Discount Is : " + dataOfProducts.discount)
                            console.log("Quantity is : " + DataOfCart.user.product[i].quantity)
                            // console.log(payAmount)
                            console.log("TotalAmount is : " + totalAmount)
                        } else if (dataOfProducts.discount == 0) {
                            payAmount = dataOfProducts.price * DataOfCart.user.product[i].quantity
                            totalAmount += payAmount
                            console.log("original Price : - " + dataOfProducts.price + " and Discount Is : " + dataOfProducts.discount)
                            console.log("Quantity is : " + DataOfCart.user.product[i].quantity)
                            // console.log(payAmount)
                            console.log("TotalAmount is : " + totalAmount)
                        }
                    }
                }
                // ------------ crearte Order Instance ------------
                try {
                    // const { amount, userId, productDetails, userDetails } = req.body;
                    // totalAmount = Number(amount);
                    // userInfo = userId;
                    // productInfo = JSON.parse(productDetails);
                    // userData = JSON.parse(userDetails);
                    const instance = new Razorpay({
                        key_id: `rzp_test_SXSYjqBhXWVqTb`,
                        key_secret: `DksEJhYIkaV3gPr9AhboqtSH`,
                    });

                    const options = {
                        amount: Math.round(totalAmount * 100),
                        currency: "INR",
                        receipt: "order_" + Date.now(),
                    };
                    const order = await instance.orders.create(options);

                    return res.status(200).json({
                        success: true,
                        order: order,
                        arrayofproduct: productId
                    });
                } catch (error) {
                    console.log("❌ RAZORPAY ERROR:", error);   // FULL ERROR
    console.log("❌ ERROR MESSAGE:", error.message);
    console.log("❌ ERROR DETAILS:", error.error); // Razorpay gives this
                    return res.status(500).json({
                        status: 500,
                        message: "Internal Server error || can't do payment",
                        error: error.message
                    })
                }
            } catch (error) {
                return res.status(500).json({
                    status: 500,
                    message: "can't get Data from Database || something went wrong in get Data from DataBase.",
                    error: error.message
                })
            }
            return res.status(200).json({
                status: 200,
                message: "ok",
                Data: DataOfCart
            })
        }
    } catch (error) {
        return res.status(400).json({
            status: 400,
            message: "Something went wrong in addtocart-payment.",
            error: error.message
        })
    }
})


// ----------------- Payment Verification ------------------------
router.post("/paymentvarification", async (req, res) => {
    try {
        const { razorpayOrderId, razorpayPaymentId, razorpaySignature, userId, arrayofproduct, checkOutId } =
            req.body;
        if (!razorpayOrderId) {
            return res.status(400).json({
                status: 400,
                message: "Can't get razorpayOrderId."
            })
        }
        if (!razorpayPaymentId) {
            return res.status(400).json({
                status: 400,
                message: "Can't get razorpayPaymentId."
            })
        }
        if (!razorpaySignature) {
            return res.status(400).json({
                status: 400,
                message: "Can't get razorpaySignature."
            })
        }
        if (!userId) {
            return res.status(400).json({
                status: 400,
                message: "Can't get userId."
            })
        }
        if (!arrayofproduct) {
            return res.status(400).json({
                status: 400,
                message: "Can't get arrayOfProductId."
            })
        }
        if (!checkOutId) {
            return res.status(400).json({
                status: 400,
                message: "Can't get checkOutId."
            })
        }
        const body = razorpayOrderId + "|" + razorpayPaymentId;
        const expectedSignature = crypto
            .createHmac("sha256", "CtjH2CuJilYLSr217iLnWeSb")
            .update(body.toString())
            .digest("hex");
        try {
            const isAuthentic = expectedSignature === razorpaySignature;
            console.log(isAuthentic);
            if (!isAuthentic) {
                return res.status(400).json({
                    status: 400,
                    message: "Something went wrong."
                })
            }
            if (isAuthentic) {
                // here We are changeing in checkOut model for Order Place beacause by default it is false after Successfull Payment wecan do it True
                try {
                    const dataOfcheckOut = await checkOut.findById(checkOutId)
                    if (!dataOfcheckOut) {
                        return res.status(400).json({
                            status: 400,
                            message: "Can't get data By checkOut Id."
                        })
                    }
                    if (dataOfcheckOut) {
                        dataOfcheckOut.user.detail[0].isPlaced = true
                        await dataOfcheckOut.save({ validateBeforeSave: false })
                        const deleteItemfromCart = await AddToCart.deleteOne({ "_id": dataOfcheckOut.user.cart_id })
                        if (!deleteItemfromCart) {
                            return res.status(500).json({
                                status: 500,
                                message: "Can't delete cart Item By Id.",
                            })
                        }
                        const getcheckOutdata = await checkOut.findById(checkOutId)

                        getcheckOutdata.user.cart_id = null
                        await getcheckOutdata.save({ validateBeforeSave: false })
                    }
                } catch (error) {
                    return res.status(500).json({
                        status: 500,
                        message: "Something went Wrong in Get Data From DataBase.",
                        error: error.message
                    })
                }
                try {
                    // here we check userId if userId exist in Data Base all DATA store in uns=der These userId.
                    try {
                        const DataofOrder = await Order.findOne({ "user.user_id": userId })
                        // return res.status(200).json({
                        //     DataofOrder
                        // })
                        if (DataofOrder) {
                            const chekoutid = {
                                checkOutid: checkOutId
                            }
                            const paymentdetails = {
                                razorpayOrderId: razorpayOrderId,
                                razorpayPaymentId: razorpayPaymentId,
                                razorpaySignature: razorpaySignature
                            }
                            // const productdata = {
                            //     product_id:arrayofproduct
                            // }
                            try {
                                DataofOrder.user.checkOutIDs.push(chekoutid)
                                DataofOrder.user.paymentdetail.push(paymentdetails)
                                DataofOrder.user.productId.push(arrayofproduct)
                                await DataofOrder.save({ validateBeforeSave: false })

                                return res.status(200).json({
                                    status: 200,
                                    message: "Ok",
                                    Data: DataofOrder
                                })
                            } catch (error) {
                                return res.status(500).json({
                                    status: 500,
                                    message: "Something went Wrong in Save data.",
                                    error: error.message
                                })
                            }
                        }
                        if (!DataofOrder) {
                            const Data = await Order.create({
                                user: {
                                    user_id: userId,

                                    checkOutIDs: [{
                                        checkOutid: checkOutId
                                    }],
                                    paymentdetail: [{
                                        razorpayOrderId: razorpayOrderId,
                                        razorpayPaymentId: razorpayPaymentId,
                                        razorpaySignature: razorpaySignature
                                    }]
                                }
                            })
                            if (!Data) {
                                return res.status(500).json({
                                    status: 500,
                                    message: "Somethinjg went wrong cant found Data || can't upload data into Database"
                                })
                            }
                            if (Data) {
                                return res.status(200).json({
                                    status: 200,
                                    message: "Data Added Successfully.",
                                    data: Data
                                })
                            }
                        }
                    } catch (error) {
                        return res.status(500).json({
                            status: 500,
                            message: "Something went wrong in get Data of Order.",
                            error: error.message
                        })
                    }

                } catch (error) {
                    return res.status(500).json({
                        status: 500,
                        message: "Something went wrong in add orderData in DataBase",
                        error: error.message
                    })
                }
            }
        } catch (error) {
            return res.status(401).json({
                status: 401,
                message: "Something went wrong in payment varification.",
                error: error.message
            })
        }
    } catch (error) {
        return res.status(400).json({
            status: 400,
            message: "Some thing went wrong in payment.",
            error: error.message
        })
    }
})
module.exports = router