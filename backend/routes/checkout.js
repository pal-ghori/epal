var express = require('express');
var router = express.Router();
const checkOut = require("../model/checkOut.model")
const User = require('../model/user.model')
const Product = require("../model/product.model")
const Order = require("../model/order.model")
const AddToCart = require("../model/cart.model")
const Razorpay = require('razorpay');
const crypto = require("crypto");
const CheckOut = require('../model/checkOut.model');

// const instance = new Razorpay({
//     key_id: 'rzp_test_OdnQ1ZHhkpl4fG',
//     key_secret: '2tGnYqDaan6fEwlok0KPe8Ak',
// });


router.get("/", (req, res) => {
    return res.send("Check Out...")
})


// ----------------- Create checkOut -----------------
router.post("/add-detail-of-checkout", async (req, res, next) => {
    try {
        const userId = req.query.userId
        const cartId = req.query.cartId
        // Check id is valid or not
        if (!userId) {
            return res.status(404).json({
                status: 404,
                message: "Can not Found userId"
            })
        }
        if (!cartId) {
            return res.status(404).json({
                status: 404,
                message: "Can not Found addToCartId"
            })
        }
        try {
            const user = await User.findById(userId)
            if (!user) {
                return res.status(404).json({
                    status: 404,
                    message: "Can not Get User"
                })
            }
            // add data into database
            userCheck = await CheckOut.findOne({ "user.user_id": userId });
            console.log(userCheck);
            if(userCheck){
                userCheck.user.cart_id = cartId
                await userCheck.save({validateBeforeSave: false})
            }
            try {
                const checkOutData = await checkOut.create({
                    user: {
                        user_id: userId,
                        cart_id: cartId,
                        detail: [{
                            name: req.body.name,
                            addressOne: req.body.addressone,
                            addressTwo: req.body.addresstwo,
                            pinCode: req.body.pincode,
                            city: req.body.city,
                            state: req.body.state,
                            mobile: req.body.mobile,
                            place: req.body.place,
                            deliveryMethod: req.body.typeofdelivery
                        }]
                    }
                })
                if (checkOutData.user.detail[0].deliveryMethod == "cash on delivery") {
                    checkOutData.user.detail[0].isPlaced = true
                    await checkOutData.save({ validateBeforeSave: false })
                }
                if (checkOutData) {
                    return res.status(200).json({
                        status: 200,
                        message: "Ok",
                        data: checkOutData
                    })
                }
                // check if data add or not
                if (!checkOutData) {
                    return res.status(404).json({
                        status: 404,
                        message: "Can not Upload data in DataBase"
                    })
                }
                return res.status(201).json({
                    status: 201,
                    message: "Create Checkout Successfully !!!",
                    data: checkOutData
                })

            } catch (error) {
                return res.status(500).json({
                    status: 500,
                    message: "can not send Data into DataBase",
                    error: error.message
                })
            }
        } catch (error) {
            return res.status(400).json({
                status: 400,
                message: "Can not get User",
                error: error.message
            })
        }
    } catch (error) {
        return res.status(400).json({
            status: 400,
            message: "Somne thing went wrong in checkout Data Get",
            error: error.message
        })
    }
})

// ----------------- Get all checkOut Data -----------------
router.get("/getallcheckout", async (req, res) => {
    const data = await checkOut.find()

    if (!data) {
        return res.status(404).json({
            status: 404,
            message: "Can not Foundn data"
        })
    }
    return res.status(200).json({
        status: 200,
        data: data
    })
})

// ----------------- Single Checkout Detail -----------------

router.get("/getcheckout/:id", async (req, res) => {
    const user_id = req.params.id;
    if (user_id) {
        const user = await CheckOut.findOne({ "user.user_id": user_id });
        console.log(user);
        return res.status(200).json({
            status: 200,
            data: user
        })
    } else {
        return res.status(404).json({
            status: 404,
            message: "Can not Foundn data"
        })
    }
})

// ----------------- Update Checkout Detail -----------------
router.patch("/updatecheckoutdetail/:id", async (req, res) => {
    try {
        const id = req.params.id
        // Checlk id is valid or not
        if (!id) {
            return res.status(404).json({
                status: 404,
                message: "Can not get Id"
            })
        }
        const checkoutdata = await checkOut.findById(id)
        // check Data or not
        if (!checkoutdata) {
            return res.status(404).json({
                status: 404,
                message: "Can not get CheckOut Data"
            })
        }
        // this is for name
        try {
            if (req.body.name) {
                checkoutdata.name = req.body.name
                await checkoutdata.save({ validateBeforeSave: false })
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
                checkoutdata.addressOne = req.body.addressone
                await checkoutdata.save({ validateBeforeSave: false })
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
                checkoutdata.addressTwo = req.body.addresstwo
                await checkoutdata.save({ validateBeforeSave: false })
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
                checkoutdata.city = req.body.city
                await checkoutdata.save({ validateBeforeSave: false })
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
                checkoutdata.pinCode = req.body.pincode
                await checkoutdata.save({ validateBeforeSave: false })
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
                checkoutdata.state = req.body.state
                await checkoutdata.save({ validateBeforeSave: false })
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
                checkoutdata.mobile = req.body.mobile
                await checkoutdata.save({ validateBeforeSave: false })
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
                checkoutdata.place = req.body.place
                await checkoutdata.save({ validateBeforeSave: false })
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
                    checkoutdata.deliveryMethod = req.body.deliveryMethod
                    checkoutdata.isPlaced = true
                    await checkoutdata.save({ validateBeforeSave: false })
                }
                if (req.body.deliveryMethod == "online") {
                    checkoutdata.deliveryMethod = req.body.deliveryMethod
                    checkoutdata.isPlaced = false
                    await checkoutdata.save({ validateBeforeSave: false })
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


// ----------------- delete Checkout items -----------------
router.delete("/deletecheckoutitem/:id", async (req, res) => {
    try {
        const id = req.params.id
        // check id is valid or not
        if (!id) {
            return res.status(404).json({
                status: 404,
                message: "can not Found Id"
            })
        }
        // check data is found or not
        try {
            const checkOutData = await checkOut.findById(id)
            if (!checkOutData) {
                return res.status(404).json({
                    status: 404,
                    message: "Can not Foud Any CheckOut Item"
                })
            }
            // this is for delete data from database
            try {
                const deletedata = await checkOut.deleteOne({ "_id": id })
                if (!deletedata) {
                    return res.status(404).json({
                        status: 404,
                        message: "can not Found Data of Delete Checkout Item"
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
            return res.status(404).json({
                status: 404,
                message: "Can't get ProductID."
            })
        }
        if (productId) {
            const dataOfProduct = await Product.findById(productId)
            if (!dataOfProduct) {
                return res.status(404).json({
                    status: 404,
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
                            key_id: `rzp_test_5ez4Vyrl60o1D4`,
                            key_secret: `CtjH2CuJilYLSr217iLnWeSb`,
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
                            key_id: `rzp_test_NVuwCXHaH3Ax8T`,
                            key_secret: `KLWGXywP4TnerJGrDMSsUSUM`,
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
            return res.status(404).json({
                status: 404,
                message: "Cart Id not Found.",
            })
        }

        const DataOfCart = await AddToCart.findById(addToCartId)
        if (!DataOfCart) {
            return res.status(404).json({
                status: 404,
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
                        return res.status(404).json({
                            status: 404,
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
                        key_id: `rzp_test_5ez4Vyrl60o1D4`,
                        key_secret: `CtjH2CuJilYLSr217iLnWeSb`,
                    });

                    const options = {
                        amount: Number(totalAmount * 100),
                        currency: "INR",
                    };
                    const order = await instance.orders.create(options);

                    return res.status(200).json({
                        success: true,
                        order: order,
                        arrayofproduct: productId
                    });
                } catch (error) {
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
        const { razorpayOrderId, razorpayPaymentId, razorpaySignature, userId, arrayofproduct, checkoutId } =
            req.body;
        if (!razorpayOrderId) {
            return res.status(404).json({
                status: 404,
                message: "Can't get razorpayOrderId."
            })
        }
        if (!razorpayPaymentId) {
            return res.status(404).json({
                status: 404,
                message: "Can't get razorpayPaymentId."
            })
        }
        if (!razorpaySignature) {
            return res.status(404).json({
                status: 404,
                message: "Can't get razorpaySignature."
            })
        }
        if (!userId) {
            return res.status(404).json({
                status: 404,
                message: "Can't get userId."
            })
        }
        if (!arrayofproduct) {
            return res.status(404).json({
                status: 404,
                message: "Can't get arrayOfProductId."
            })
        }
        if (!checkoutId) {
            return res.status(404).json({
                status: 404,
                message: "Can't get checkoutId."
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
                    const dataOfCheckOut = await checkOut.findById(checkoutId)
                    if (!dataOfCheckOut) {
                        return res.status(404).json({
                            status: 404,
                            message: "Can't get data By checkOut Id."
                        })
                    }
                    if (dataOfCheckOut) {
                        dataOfCheckOut.user.detail[0].isPlaced = true
                        await dataOfCheckOut.save({ validateBeforeSave: false })
                        const deleteItemfromCart = await AddToCart.deleteOne({ "_id": dataOfCheckOut.user.cart_id })
                        if (!deleteItemfromCart) {
                            return res.status(500).json({
                                status: 500,
                                message: "Can't delete cart Item By Id.",
                            })
                        }
                        const getcheckoutdata = await checkOut.findById(checkoutId)

                        getcheckoutdata.user.cart_id = null
                        await getcheckoutdata.save({ validateBeforeSave: false })
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
                                checkOutid: checkoutId
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
                                DataofOrder.user.checkoutIDs.push(chekoutid)
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

                                    checkoutIDs: [{
                                        checkOutid: checkoutId
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