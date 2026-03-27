var express = require('express');
var router = express.Router();
const AddToCart = require("../model/cart.model")
const User = require("../model/user.model")
const Product = require("../model/product.model")

router.get("/", (req, res) => {
    res.send("Add to Cart ...")
})

// add item into add to cart
router.post("/addtocart", async (req, res, next) => {
    try {
        const userId = req.body.userId;
        const productId = req.body.productId;

        if (!userId) {
            return res.status(404).json({
                satus: 400,
                success:false,
                message: "Can not found userId."
            })
        }
        if (!productId) {
            return res.status(404).json({
                status: 400,
                success:false,
                message: "Can not found productId."
            })
        }
        // Here We try Product Id is valid Or not
        try {
            // Check if user is exist or not
            const addToCart = await AddToCart.findOne({ "user.user_id": userId })
            // if not exist create new user
            if (!addToCart) {
                const dataOfAddToCart = await AddToCart.create({
                    user: {
                        user_id: userId,
                        product: [{
                            product_id: productId,
                        }]
                    }
                })
                return res.status(200).json({
                    status: 200,
                    message: "ok",
                success:true,
                    data: dataOfAddToCart
                })
            }
            // if exist
            if (addToCart) {
                const checklengthofproduct = addToCart.user.product.length
                // then check product is exist or not
                for (let i = 0; i < checklengthofproduct; i++) {
                    // if product exist quantity + 1
                    if (addToCart.user.product[i].product_id == productId) {
                        addToCart.user.product[i].quantity = addToCart.user.product[i].quantity + 1
                        await addToCart.save({ validateBeforeSave: false })
                        return res.status(200).json({
                            status: 200,
                success:true,
                            message: "Data Added Successfully."
                        })
                    }
                }
                // if product not exist add new product in same User.
                try {
                    // make object of new product
                    const addtocartdata = {
                        product_id: productId,
                        quantity: 1
                    }
                    // and push into addrocart.user.product
                    addToCart.user.product.push(addtocartdata)
                    await addToCart.save({ validateBeforeSave: false })
                    return res.status(200).json({
                        status: 200,
                        success:true,
                        message: "Data Added Successfully."
                    })
                } catch (error) {
                    return res.status(500).json({
                        status: 500,
                        success:false,
                        message: "Somnething went wrong in add data into database.",
                        error: error.message
                    })
                }
            }

        }
        // this catch is for addtocart 
        catch (error) {
            return res.status(500).json({
                status: 500,
                success:false,
                message: "Something went wrong in find Data or delete Data",
                error: error.message
            })
        }
    }
    // this catch is for productId,UserId and so on
    catch (error) {
        return res.status(400).json({
            status: 400,success:false,
            message: "something went wrong",
            error: error.message
        })
    }
})

// Get All Product By UserId
router.get("/getalldataofcart/:id", async (req, res) => {
    try {
        const userId = req.params.id
        console.log(userId)
        if (!userId) {
            return res.status(404).json({
                status: 404,
                success:false,
                message: "Can not Found UserId"
            })
        }
        const addToCartData = await AddToCart.findOne({"user.user_id": userId })
        console.log('addToCartData',addToCartData)
        if (!addToCartData) {
            return res.status(404).json({
                status: 404,
                success:false,
                message: "Can not Found Add to cart Data"
            })
        }

        
        if(addToCartData.user.product.length==0)
            {
                return res.status(404).json({
                    success:false,
                    message: "Please Add product"
                })
            }

        productArray = [];

        addToCartData.user.product.forEach(async element => {
            // console.log(element);
            // console.log("..");
            const product = await Product.findById(element.product_id)
            // console.log(product);
            // var cartProduct = {
            //     productId : element.product_id,
            //     productImage : product.image,
            //     productTitle : product.title,
            //     productPrice : product.price,
            //     productDiscount : product.discount,
            //     productQty : element.quantity,
            //     _id: element._id
            // }

            console.log("product",product);
            await productArray.push({
                productId: element.product_id,
                productImage: product.image,
                productTitle: product.title,
                productPrice: product.price,
                productDiscount: product.discount,
                productQty: element.quantity,
                _id: element._id
            });

            // console.log(productArray);
            cartData = {
                cartId: addToCartData._id,
                user: {
                    product: productArray,
                    userId: addToCartData.user.user_id
                }
            }
            console.log('cartData',cartData);
        });

        // console.log(cartData.user.product.length);


        // if (addToCartData.user.product.length === cartData.user.product.length) {
            console.log(cartData);
            return res.status(200).json({
                status: 200,
                success:true,
                addtocartdata: cartData
            })
        // }else{
            
        // }
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            status: 400,
            success:false,
            message: "Somethibng went wrong in find data",
            error: error.message
        })
    }



})

// Delete item of add to cart
router.delete("/delete-cart-item/:id", async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            return res.status(404).json({
                status: 404,
                message: "Can't found ID."
            })
        }
        const checkData = await AddToCart.findById(id)
        // console.log(id);
        // if (!checkData) {
        //     return res.status(404).json({
        //         status: 404,
        //         message: "Can't found AddtoCart Data"
        //     })
        // }
        // Delete data From DataBase
        try {
            const deleteData = await AddToCart.deleteOne({ "_id": id })
            if (!deleteData) {
                return res.status(400).json({
                    status: 400,
                    message: "Can't delete Data."
                })
            }
            return res.status(200).json({
                status: 200,
                mesasage: "ok",
                Data: deleteData
            })
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: "Can not delete data from database.",
                error: error.message
            })
        }
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Something went wrong in Id or Get Adtocart Item form DataBase",
            error: error.message
        })
    }
})

// Remove item from cart
router.delete("/remove-cart-item", async (req, res) => {
    try {
        const userId = req.query.user_id
        const productId = req.query.product_id
        console.log(userId+"...."+productId);
        if (!userId) {
            return res.status(404).json({
                status: 404,
                success:false,
                message: "userId is not found."
            })
        }
        if (!productId) {
            return res.status(404).json({
                status: 404,
                success:false,
                message: "productId is not found."
            })
        }
        const cartData = await AddToCart.find({ "user.user_id": userId })
        if (!cartData) {
            return res.status(404).json({
                status: 404,
                success:false,
                message: "Can't found Cart Data By ID"
            })
        }
        // const lenCheck = cartData.user.product.length
        // Remove Item From cart
        try {
            if (cartData) {
                for (let i = 0; i < cartData[0].user.product.length; i++) {
                    if (cartData[0].user.product[i].product_id == productId) {
                        console.log("Aavi gyu")
                        if (cartData[0].user.product[i].quantity > 1) {
                            cartData[0].user.product[i].quantity = cartData[0].user.product[i].quantity - 1
                            await cartData[0].save({ validateBeforeSave: false })
                            return res.status(200).json({
                                status: 200,
                                success:true,
                                message: "ok Removed.",
                                data: cartData
                            })
                        }
                        try {
                            if (cartData[0].user.product[i].quantity == 1) {
                                const deleteData = cartData[0].user.product.remove(cartData[0].user.product[i])
                                await cartData[0].save({ validateBeforeSave: false })
                                return res.status(200).json({
                                    status: 200,
                                    success:true,
                                    message: "ok Removed.",
                                    data: deleteData
                                })
                            }
                        } catch (error) {
                            return res.status(400).json({
                                status: 400,
                                success:false,
                                message: "Can not removed item from dataBase.",
                                error: error.message
                            })
                        }
                    }
                }
            }
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                status: 500,
                success:false,
                message: "Can't remove Item from Data Base",
                error: error.message
            })
        }
    } catch (error) {
        console.log(error)

        return res.status(400).json({
            status: 400,
            success:false,
            message: "Can't found id or item of cart",
            error: error.message
        })
    }
})

// get all product from database
router.get("/getalladdtocart", async (req, res) => {
    try {
        const data = await AddToCart.find()
        if (!data) {
            return res.status(404).json({
                status: 404,
                message: "can't found Data"
            })
        }
        return res.status(200).json({
            status: 200,
            message: 'ok',
            data: data
        })
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "can't found Data",
            error: error.message
        })
    }

})
module.exports = router