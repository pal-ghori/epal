var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const uploadStorage = require("../middelware/uploadStorage")
const cloudinary = require('cloudinary').v2;
const Admin = require("../model/admin.model");
const Product = require("../model/product.model");

router.get("/", (req, res, next) => {
    res.send("Admin ....")
})

//------------------ Add Admin ------------------
router.post("/signup", async (req, res, next) => {
    try {
        const existAdmin = await Admin.findOne({ email: req.body.email })
        if (existAdmin) {
            return res.status(409).json({
                status: 409,
                message: "User Already Exist",
            })
        }
    } catch (error) {
        throw res.status(409).json({
            status: 409,
            message: "Something went Wrong",
            error: error
        })
    }
    // password bcypt
    try {
        bcrypt.hash(req.body.password, 10, async function (err, hash) {
            if (err) {
                console.log("Password is not bcrypt")
                return res.status(401)
            }
            const adminData = await Admin.create({
                adminName: req.body.name,
                email: req.body.email,
                password: hash
            })
            return res.status(200).json({
                status: 200,
                message: "Data Added Successfully !!!",
                data: adminData
            })
        })
    } catch (error) {
        console.log("Please Enter Valid Data")
        return res.status(400).json({
            status: 400,
            message: "Please Enter valid Data",
            error: error
        })
    }
})

//  ------------------- Login Admin -------------------
router.post("/login", async (req, res) => {
    try {
        if (!req.body.email) {
            return res.status(404).json({
                status: 404,
                message: "Can't found email || Please Enter Email."
            })
        }
        if (!req.body.password) {
            return res.status(404).json({
                status: 404,
                message: "Can't found password || please enter password."
            })
        }
        try {
            const admin = await Admin.findOne({ email: req.body.email })
            if (!admin) {
                return res.status(404).json({
                    status: 404,
                    message: "can not found data by email. please enter valid email"
                })
            }
            try {
                const checkPassword = await bcrypt.compare(req.body.password, admin.password)
                if (!checkPassword) {
                    return res.status(400).json({
                        status: 400,
                        message: "please enter valid password."
                    })
                }
                if (admin.email === req.body.email) {
                    console.log(admin);
                    return res.status(200).json({
                        status: 200,
                        message: "LogIn Successfully !!!",
                        data: {
                            userName: admin.adminName,
                            email: admin.email,
                            userId: admin._id
                        }
                    })
                }
            } catch (error) {
                return res.status(500).json({
                    status: 500,
                    message: "Can not bcrypt Password.",
                    error: error.message
                })
            }
        } catch (error) {
            return res.status(400).json({
                status: 400,
                message: "something went wrong in getdata or login",
                error: error.message
            })
        }
    } catch (error) {
        return res.status(400).json({
            status: 400,
            message: "Something went wrong in login.",
            error: error.message
        })
    }
})

// -------------- Update Admin Password -------------------
router.post("/changepassword/:id", async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            return res.status(404).json({
                status: 404,
                message: "Can't found ID."
            })
        }
        const admin = await Admin.findById(id)
        if (!admin) {
            return res.status(404).json({
                status: 404,
                message: "Can't found Data By Id || Please Enter Valid Id."
            })
        }
        if (!req.body.password) {
            return res.status(404).json({
                status: 404,
                message: "Can't found Password || Please Enter Password."
            })
        }
        try {
            const checkPasswordIsSameOrNot = await bcrypt.compare(req.body.password, admin.password)
            if (checkPasswordIsSameOrNot) {
                return res.status(400).json({
                    status: 400,
                    message: "Please Enter New password. This password is Same."
                })
            }
            await bcrypt.hash(req.body.password, 10, async (error, newPassword) => {
                if (error) {
                    return res.status(500).json({
                        status: 500,
                        message: "Something went Wrong in password Bcrypt.",
                        error: error
                    })
                }
                if (newPassword) {
                    admin.password = newPassword
                    await admin.save({ validateBeforeSave: false })
                    return res.status(200).json({
                        status: 200,
                        message: "Password Update Successfully."
                    })
                } else {
                    return res.status(500).json({
                        status: 500,
                        message: "Something went wrong in Bcrypt password."
                    })
                }
            })
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: "Something Went Wrong in BCRYPT password.",
                error: error.message
            })
        }
    } catch (error) {
        return res.status(400).json({
            status: 400,
            message: "Something went wrong in updatePassword",
            error: error.message
        })
    }
})

// ============================ Product Section =================================

// -------------- Get All Product ----------------
router.get("/getallproduct", async (req, res, next) => {
    try {
        const productData = await Product.find()
        if (!productData) return res.status(404).send("Can't get Data of Product.")
        return res.status(200).json({
            status: 200,
            message: "Data get successfully.",
            productData
        })
    } catch (error) {
        return res.status(500).json({
            status:500,
            error:error.message
        })
    }
})

// ------------- Get single Product ------------------------
router.get("/getsingleproduct/:id", async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            return res.status(404).json({
                status: 404,
                message: "Can't found Id"
            })
        }
        const product = await Product.findById(id)
        if (!product) {
            return res.status(404).json({
                status: 404,
                message: "can't found Product By Id || Enter Valid Id."
            })
        }
        return res.status(200).json({
            status: 200,
            message: "ok",
            data: product
        })
    } catch (error) {
        return res.status(400).json({
            status: 400,
            message: "Something went wrong in get single product",
            error: error.message
        })
    }
})

// -------------------- Add Product --------------------
router.post("/addproduct", uploadStorage.array("images", 10), async (req, res, next) => {
    try {
        const product = await Product.findOne({ "title": req.body.title });
        if (product) {
            return res.status(400).json({
                status: 400,
                message: "Enter Valid Title This Title is Already Exist"
            })
        }
    } catch (error) {
        return res.status(400).json({
            status: 400,
            message: "Something went wrong in Find Usibg title",
            error: error.message
        })
    }
    try {
        const options = {
            use_filename: true,
            unique_filename: false,
            overwrite: true,
        };

        const arrayOfProductImages = []
        for (let i = 0; i < req.files.length; i++) {
            try {
                const result = await cloudinary.uploader.upload(req.files[i].path, options);
                arrayOfProductImages.push(result.secure_url);
            } catch (error) {
                return res.status(400).json({
                    status: 400,
                    message: "Something went Wrong",
                    error: error.message
                })
            }
        }
        try {
            if (arrayOfProductImages == "") {
                return res.status(400).json({
                    status: 400,
                    message: "Array is Empty"
                })
            }
            await Product.create({
                image: arrayOfProductImages,
                title: req.body.title,
                price: req.body.price,
                discount: req.body.discount || 0,
                productType: req.body.productType,
                discription: req.body.discription,
            })
            return res.status(200).json({
                status: 200,
                message: "Enter Data Successfully"
            })
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: "Internal Server Error",
                error: error.message
            })
        }
    } catch (error) {
        return res.status(400).json({
            status: 400,
            message: "Something went wrong",
            error: error.message
        })
    }
})

// -------------------- Update Only Image ------------------
router.patch("/updateProductimages/:id", uploadStorage.array("images", 10), async (req, res, next) => {
    const id = req.params.id
    const product = await Product.findById(id)
    try {
        if (!id) {
            return res.status(400).json({
                status: 400,
                message: "Can not get ID"
            })
        }
        if (!product) {
            return res.status(400).json({
                status: 400,
                message: "Can not Get Product"
            })
        }
    } catch (error) {
        return res.status(400).json({
            status: 400,
            message: "Can Not get Id or Product",
            error: error.message
        })
    }
    // Delte Image From Cloudinary
    try {
        if (req.files.length > 0) {  //this condition is for check Admin send file or not if Admin not send file cloudinary image is not doing delete.
            for (let i = 0; i < product.image.length; i++) {
                const imageUrl = product.image[i];
                const urlArray = imageUrl.split('/');
                const image = urlArray[urlArray.length - 1]
                const imageName = image.split('.')[0]
                await cloudinary.uploader.destroy(imageName, { type: 'upload', resource_type: 'image' })
            }
        }
        // upload Updated Image into Cloudinary
        const options = {
            use_filename: true,
            unique_filename: false,
            overwrite: true,
        };

        let arrayOfUpdatedImage = [];
        for (let i = 0; i < req.files.length; i++) {
            try {
                const result = await cloudinary.uploader.upload(req.files[i].path, options);
                arrayOfUpdatedImage.push(result.secure_url);
            } catch (error) {
                return res.status(400).json({
                    status: 400,
                    message: "Something went Wrong",
                    error: error.message
                })
            }
        }
        // upload into DataBase
        try {
            if (arrayOfUpdatedImage == "") {
                return res.status(400).json({
                    status: 400,
                    message: "arrayOfUpdatedImage is Empty"
                })
            }
            product.image = arrayOfUpdatedImage
            await product.save({ validateBeforeSave: false })
            return res.status(200).json({
                status: 200,
                message: "Image Update Successfully"
            })
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: "something went wrong in save in DtaBase",
                error: error.message
            })
        }
    } catch (error) {
        return res.status(400).json({
            status: 400,
            message: "Something went Wrong in Cloudinary Image Delete",
            error: error.message
        })
    }
})


// -------------------- Update Product Data -----------------
router.patch("/updateproductdata/:id", async (req, res, next) => {
    console.log(req.body.price);
    try {
        const id = req.params.id
        if (!id) {
            return res.status(404).json({
                status: 404,
                message: "Can not Found Id"
            })
        }
        const product = await Product.findById(id)
        if (!product) {
            return res.status(404).json({
                status: 404,
                message: "Can not Found Product BY Id"
            })
        }
        // --------------- Update Code Start ----------------
        // this is for Title
        try {
            if (req.body.title != "") {
                const checkTitleIsValidOrNot = await Product.findOne({ "title": req.body.title })
                if (!checkTitleIsValidOrNot) {
                    return res.status(400).json({
                        status: 400,
                        message: "Enter Valid Title"
                    })
                }

                product.title = req.body.title
                await product.save({ validateBeforeSave: false })
            }
        } catch (error) {
            return res.status(500).json({
                staus: 500,
                message: "Cann not Update Title",
                error: error.message
            })
        }
        // This is for Price
        console.log(req.body.price);
        try {
            if (req.body.price != "") {
                product.price = req.body.price
                await product.save({ validateBeforeSave: false })
            }
        } catch (error) {
            return res.status(500).json({
                staus: 500,
                message: "Cann not Update price",
                error: error.message
            })
        }

        // this is For discount
        try {
            if (req.body.discount != "") {
                product.discount = req.body.discount
                await product.save({ validateBeforeSave: false })
            }
        } catch (error) {
            return res.status(500).json({
                staus: 500,
                message: "Cann not Update discount",
                error: error.message
            })
        }

        // This is For discription 
        try {
            if (req.body.discription != "") {
                product.discription = req.body.discription
                await product.save({ validateBeforeSave: false })
            }
        } catch (error) {
            return res.status(500).json({
                staus: 500,
                message: "Cann not Update discription",
                error: error.message
            })
        }

        // This is For Product Type
        try {
            if (req.body.producttype == "") {
                return res.status(400).json({
                    staus: 400,
                    message: "Enter Valid Product Type like [hot item, new arrival, on sale] This."
                })
            }
            product.productType = req.body.productType
            await product.save({ validateBeforeSave: false })
        } catch (error) {
            return res.status(500).json({
                staus: 500,
                message: "can not set Product Type.",
                error: error.message
            })
        }
        return res.status(200).json({
            staus: 200,
            message: "Data Update Successfully"
        })
    } catch (error) {
        return res.status(400).json({
            status: 400,
            message: "Something Went Wrong im Product Data Update",
            error: error.message
        })
    }
})


// ------------------- Delete Product -------------------
router.delete("/deleteproduct/:id", async (req, res, next) => {
    try {
        // Check Id is Valid Or not
        try {
            const id = req.params.id
            if (!id) {
                return res.status(404).json({
                    status: 404,
                    messsage: "can not foud id"
                })
            }
            // all Product Work Like image delete From Cloudinary && delete from DataBase 
            try {
                const product = await Product.findById(id)
                if (!product) {
                    return res.status(404).json({
                        status: 404,
                        messsage: "can not foud Product"
                    })
                }
                // delete Image From Cloudinary
                try {
                    for (let i = 0; i < product.image.length; i++) {
                        const imageUrl = product.image[i];
                        const urlArray = imageUrl.split('/');
                        const image = urlArray[urlArray.length - 1]
                        const imageName = image.split('.')[0]
                        await cloudinary.uploader.destroy(imageName, { type: 'upload', resource_type: 'image' })
                    }
                } catch (error) {
                    return res.status(400).json({
                        status: 400,
                        message: "Can not delete Image From Cloudinary",
                        error: error.message
                    })
                }
                // Delete Product From DataBase
                try {
                    await Product.deleteOne({ "_id": id })
                    return res.status(200).json({
                        status: 200,
                        message: "Product Deleted."
                    })
                } catch (error) {
                    return res.status(400).json({
                        status: 400,
                        message: "Something went wrong in Product Delete",
                        error: error.message
                    })
                }
            } catch (error) {
                return res.status(400).json({
                    status: 400,
                    message: "Something went wrong in get product",
                    error: error.message
                })
            }
        } catch (error) {
            return res.status(400).json({
                status: 400,
                message: "Some thing went wrong in ID.",
                error: error.message
            })
        }
    } catch (error) {
        return res.status(400).json({
            status: 400,
            message: "Something went Wrong in Product Delete",
            error: error.message
        })
    }
})

module.exports = router