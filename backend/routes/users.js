var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const User = require("../model/user.model")

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

// -------------- Get All User --------------
router.get("/get-all-user", async (req, res, next) => {
  try {
    const userData = await User.find()
    if(!userData) return res.status(404).send("Can't get Data.")
    return res.status(200).json({
      status:200,
      message:"Data Get successfully.",
      userData
    })
  } catch (error) {
    return res.status(500).json({
      status:500,
      error:error.message
    })
  }
})

// ------------- Login ------------------
router.post("/login", async (req, res) => {
  try {
    // check email isin body or not
    if (!req.body.email) {
      return res.status(404).json({
        status: 404,
        message: "can not found Email"
      })
    }
    // check password is in body or not
    if (!req.body.password) {
      return res.status(404).json({
        status: 404,
        message: "can not found Password"
      })
    }
    const checkUser = await User.findOne({ email: req.body.email })
    // check user is valid or Not
    if (!checkUser) {
      return res.status(404).json({
        status: 404,
        message: "Can not found user || Enter Valid Email."
      })
    }
    // try to Login
    try {
      const data = await bcrypt.compare(req.body.password, checkUser.password)
      if (!data) {
        return res.status(400).json({
          status: 400,
          message: "Password is Wrong."
        })
      }
      if (checkUser.email === req.body.email) {
        return res.status(200).json({
          status: 200,
          message: "Loged In",
          data: {
            userId: checkUser._id,
            userName: checkUser.email
          }
        })
      }
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "Can not Loged In",
        error: error.message
      })
    }
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: "Something Went Wrong in Login",
      error: error.message
    })
  }
})

// -------------------- Add new User ------------------------
router.post("/sign-up", async (req, res) => {
  // Check if user Already Exist Or not
  try {
    const checkdataisexistornot = await User.findOne({ email: req.body.email, number: req.body.number })
    // console.log(checkdataisexistornot);
    if (checkdataisexistornot) {
      return res.status(400).json({
        status: 400,
        message: "User Already Exist ",
      })
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      mwssage: "smething went frong in get data from Database",
      error: error.message
    })
  }
  // Add new User
  try {
    bcrypt.hash(req.body.password, 10, async function (err, hash) {
      if (err) {
        console.log("Password is not bcrypt")
        return res.status(401).json({
          status: 401,
          message: "password can not be bcrypt",
          error: err
        })
      }
      const userData = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash,
        number: req.body.number
      })
      return res.status(200).json(userData)
    })
  } catch (error) {
    console.log("Please Enter Valid Data")
    return res.status(400).json({
      status: 400,
      message: "Please Enter valid Data",
      errors: error.message
    })
  }
})

//----------------- Update Password --------------------
router.patch("/changecurrentpassword/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.json({
        status: 400,
        message: "Can not get ID"
      })
    }
    const user = await User.findById(id);
    if (!user) {
      return res.json({
        status: 404,
        message: "User Does Not Found"
      })
    }
    try {
      if (!req.body.password) {
        return res.status(404).json({
          status: 404,
          message: "Can not found password in body"
        })
      }
      if (req.body.password == "") {
        return res.status(400).json({
          status: 400,
          message: "Please Enter Password || passsword is Empty..."
        })
      }
      bcrypt.hash(req.body.password, 10, async (error, password) => {
        if (error) {
          return res.status(500).json({
            status: 500,
            message: "Something went wrong in password Bcrypt",
            error: error.message
          })
        }
        if (password) {
          user.password = password
          user.save({ validateBeforeSave: false })
          res.status(200).json({
            status: 200,
            message: "password Update Successfully !!!"
          })
        }
      })
    } catch (error) {
      return res.status(400).json({
        status: 400,
        message: "Something went wrong in password BCRYPT",
        error: error.message
      })
    }
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: "Something went Wrong in Password Change",
      error: error.message
    })
  }
})

// ----------------- Update User Data -------------------------
router.patch("/updateuserdata/:id", async (req, res, next) => {
  try {
    const id = req.params.id
    // check Id is valid or not
    if (!id) {
      return res.status(400).json({
        status: 400,
        message: "can not get Id"
      })
    }
    // User
    const user = await User.findById(id)
    // Check user is Valid or not
    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "can not get User"
      })
    }
    if (req.body.firstname || req.body.lastname || req.body.email || req.body.number) {
      // Update FirstName
      if (req.body.firstname) {
        if (user.firstName != req.body.firstname) {
          try {
            user.firstName = req.body.firstname
            await user.save({ validateBeforeSave: false })
          } catch (error) {
            return res.status(400).json({
              status: 400,
              message: "Something went Wrong in firstname Change",
              error: error
            })
          }
        }

      }

      // Update Last Name
      if (req.body.lastname) {
        if (user.lastName != req.body.lastname) {
        } try {
          user.lastName = req.body.lastname
          await user.save({ validateBeforeSave: false })
        } catch (error) {
          return res.status(400).json({
            status: 400,
            message: "Something went Wrong in Lastname Change",
            error: error
          })
        }

      }
      // Update Email
      if (req.body.email) {
        if (user.email != req.body.email) {
          try {
            user.email = req.body.email
            await user.save({ validateBeforeSave: false })
          } catch (error) {
            res.status(400).json({
              status: 400,
              message: "Something went Wrong in Email Change",
              error: error
            })
          }
        }
      }

      // Update Number
      if (req.body.number) {
        if (user.number != req.body.number) {

        } try {
          user.number = req.body.number
          await user.save({ validateBeforeSave: false })
        } catch (error) {
          return res.status(400).json({
            status: 400,
            message: "Something went Wrong in Number Change",
            error: error
          })
        }
      }
    }
    return res.status(200).json({
      satus: 200,
      message: "update Data Successfully"
    })
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: "Something went wrong in Update User Data",
      error: error.message
    })
  }
})

//---------------- Delete Single User -----------------------
router.delete("/deletesingleuser/:id", async (req, res, next) => {
  try {
    const id = req.params.id
    if (!id) {
      return res.json({
        status: 404,
        message: "Id not Found"
      })
    }
    const userData = await User.deleteOne({ "_id": id })
    return res.status(200).json({
      status: 200,
      message: "User Delete Successfully !!!",
      data: userData
    })
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: "Can not Delete User",
      error: error.message
    })
  }
})

// ----------------- get single User ----------------
router.get("/getsingleuser/:id", async (req, res) => {
  try {
    const id = req.params.id
    if (!id) {
      return res.status(404).json({
        status: 404,
        message: "Can not found ID."
      })
    }
    const user = await User.findById(id)
    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "can not found User"
      })
    }
    return res.status(200).json({
      status: 200,
      message: "OK",
      Userdata: user
    })
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: "Something went wrong in getsingle User",
      error: error.message
    })
  }
})

module.exports = router;