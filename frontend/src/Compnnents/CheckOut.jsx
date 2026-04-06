// import { Container, Nav, Navbar } from "react-bootstrap";
// import { IoBagHandleOutline, IoSearch, IoLogOutOutline } from "react-icons/io5";
// import { Link, useNavigate } from "react-router-dom";
// import Footer from "./Footer";
// import Subscribe from "./Subscribe";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Bounce, ToastContainer, toast } from "react-toastify";

// const CheckOut = () => {
  // const [data, setData] = useState([]);
  // const [name, setName] = useState("");
  // const [addressone, setAddressOne] = useState("");
  // const [addresstwo, setAddressTwo] = useState("");
  // const [pincode, setPincode] = useState("");
  // const [city, setCity] = useState("");
  // const [state, setState] = useState("");
  // const [mobile, setMobile] = useState("");
  // const [place, setPlace] = useState("");
  // const [cartId, setCartId] = useState();
  // // const [gtotal,setGtotal] = useState('');
  // let userid = sessionStorage.getItem("userId");
  // const navigate = useNavigate();
  // const total = data.reduce((sum, item) => {
  //   return sum + item.productPrice * (item.quantity || 1);
  // }, 0);

  // let shippingCharge = 50;
  // console.log("userid:", userid);
  // console.log("cartId:", cartId);
  // console.log("SENDING DATA:", {
  //   name,
  //   addressone,
  //   addresstwo,
  //   pincode,
  //   city,
  //   state,
  //   mobile,
  //   place,
  //   cartId,
  //   userid,
  // });

  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:5000/cart/getalldataofcart/${userid}`)
  //     .then((res) => {
  //       console.log("FULL RESPONSE:", res.data);

  //       // 🔥 IMPORTANT FIX
  //       const cartData = res.data.addtocartdata;

  //       if (!cartData) {
  //         console.log("❌ cartData not found");
  //         return;
  //       }

  //       console.log("✅ cartData:", cartData);

  //       setCartId(cartData.cartId); // ✅ THIS IS YOUR cartId
  //       setData(cartData.user?.product || []);
  //     })
  //     .catch((err) => {
  //       console.log("ERROR FETCHING CART:", err);
  //     });
  // }, []);

  // const [isLogged, setIsLogged] = useState(sessionStorage.getItem("isLogged"));

  // useEffect(() => {
  //   setIsLogged(sessionStorage.getItem("isLogged"));
  // }, []);

  // const handlerLogOut = async () => {
  //   sessionStorage.removeItem("isLogged");
  //   sessionStorage.removeItem("userId");
  //   setIsLogged(null);
  // };

  // const postdata = async (e) => {
  //   e.preventDefault();

  //   console.log("PLACE ORDER CLICKED");

  //   if (!name || !addressone || !pincode || !city || !mobile) {
  //     alert("Please fill all required fields");
  //     return;
  //   }

  //   try {
  //     const response = await axios.post(
  //   `http://localhost:5000/checkout/add-detail-of-checkOut?userId=${userid}&cartId=${cartId}`,
  //       {
  //         name,
  //         addressone,
  //         addresstwo,
  //         pincode,
  //         city,
  //         state,
  //         mobile,
  //         place,
  //         typeofdelivery: "online",
  //       },
  //     );

  //     console.log("SUCCESS:", response);
  //     console.log("FINAL AMOUNT (PAISE):", total);

  //     alert("Order Placed Successfully ✅");
  //     console.log(process.env.RAZORPAY_KEY_ID);
  //     navigate("/VerifyUserData");
    
  //   } catch (error) {
  //     console.log( error);

  //     alert("Backend Error: " + JSON.stringify(error?.response?.data));
  //   }
  // };

  // const FlateRate = () => {
  //   shippingCharge = 50;
  // };
//   return (
//     <>
//       <ToastContainer />

//       <Navbar expand="lg" className="bg-body-success my-2 bg-dark padding-12 ">
//         <Container>
//           <Navbar.Brand href="#home" className="logo">
//             <Link to="/">
//               <img
//                 src={require("../Compnnents/Routs/img/asset 0.png")}
//                 alt=""
//               />
//             </Link>
//           </Navbar.Brand>
//           <Navbar.Toggle aria-controls="basic-navbar-nav" />
//           <Navbar.Collapse id="basic-navbar-nav">
//             <Nav className="navbar m-auto">
//               <Nav.Link className="navitems" to="/">
//                 <Link to="/" className="page for-blackcolor">
//                   Home
//                 </Link>
//               </Nav.Link>
//               <Nav.Link className="navitems" to="/Shop">
//                 <Link to="/Shop" className="page for-blackcolor">
//                   Shop
//                 </Link>
//               </Nav.Link>
//               <Nav.Link className="navitems" to="/About">
//                 <Link to="/About" className="page for-blackcolor">
//                   About
//                 </Link>
//               </Nav.Link>
//               <Nav.Link className="navitems" to="/Contact">
//                 <Link to="/Contact" className="page for-blackcolor">
//                   Contact
//                 </Link>
//               </Nav.Link>
//               {!isLogged ? (
//                 <Nav.Link className="navitems" to="/UserLogin">
//                   <Link to="/UserLogin" className="page">
//                     Login
//                   </Link>
//                 </Nav.Link>
//               ) : null}
//             </Nav>
//             <div className="all-icons text-center d-flex justify-content-center align-items-center">
//               <Link to="AddToCart">
//                 <IoBagHandleOutline className="icon" />
//               </Link>
//               {isLogged ? (
//                 <IoLogOutOutline
//                   onClick={handlerLogOut}
//                   className="iconLogOut"
//                 ></IoLogOutOutline>
//               ) : null}
//             </div>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>
//       <div className="container">
//         <div className="row">
//           <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 billing-details">
//             <h3>Billing Details</h3>
//             <form className="checkoutfrom">
//               <label htmlFor="name">Name</label>
//               <br />
//               <input
//                 type="text"
//                 value={name}
//                 id="name"
//                 autoComplete="off"
//                 onChange={(e) => {
//                   setName(e.target.value);
//                 }}
//               />
//               <br />
//               <label htmlFor="addressone">address one</label>
//               <br />
//               <input
//                 type="text"
//                 id="addressone"
//                 onChange={(e) => {
//                   setAddressOne(e.target.value);
//                 }}
//               />
//               <br />
//               <label htmlFor="addresstwo">addresstwo</label>
//               <br />
//               <input
//                 type="text"
//                 id="addresstwo"
//                 onChange={(e) => {
//                   setAddressTwo(e.target.value);
//                 }}
//               />
//               <br />
//               <label htmlFor="pincode">pincode</label>
//               <br />
//               <input
//                 type="text"
//                 id="pincode"
//                 onChange={(e) => {
//                   setPincode(e.target.value);
//                 }}
//               />
//               <br />
//               <label htmlFor="city">city</label>
//               <br />
//               <input
//                 type="text"
//                 id="city"
//                 onChange={(e) => {
//                   setCity(e.target.value);
//                 }}
//               />
//               <br />
//               <label htmlFor="state">state</label>
//               <br />
//               <input
//                 type="text"
//                 id="state"
//                 onChange={(e) => setState(e.target.value)}
//               />
//               <br />
//               <label htmlFor="mobile">Mobile</label>
//               <br />
//               <input
//                 type="text"
//                 id="mobile"
//                 onChange={(e) => setMobile(e.target.value)}
//               />
//               <br />
//               <label htmlFor="place">place</label>
//               <br />
//               <input
//                 type="text"
//                 id="place"
//                 onChange={(e) => setPlace(e.target.value)}
//               />
//               <br />
//             </form>
//           </div>
//           <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 your-order">
//             <h3>Your Oredres</h3>
//             <div className="d-flex justify-content-between title">
//               <p>Product</p>
//               <p>Subtotal</p>
//             </div>
//             <hr className="hr-gray" />
//             <div>
//               {data.map((item, index) => {
//                 return (
//                   <div
//                     key={index}
//                     className="all-checkout-product d-flex justify-content-between align-items-center"
//                   >
//                     <p>{item.productTitle}</p>
//                     <p>&#x20B9; {item.productPrice}</p>
//                   </div>
//                 );
//               })}
//             </div>
//             <hr className="hr-gray" />
//             <div className="d-flex justify-content-between title">
//               <p>Subtotal</p>
//               <p>&#x20B9; {total}</p>
//             </div>
//             <hr className="hr-gray" />
//             <div className="d-flex justify-content-between title">
//               <p>Shipping</p>
//               <div className="shipping">
//                 <form>
//                   <div className="d-flex">
//                     <input
//                       type="radio"
//                       name="Flate rate"
//                       id="FlatRate"
//                       onClick={() => {
//                         FlateRate();
//                       }}
//                     />
//                     <label htmlFor="FlatRate">Flat rate</label>
//                   </div>
//                   <div className="d-flex">
//                     <input type="radio" name="Flate rate" id="PickupStore" />
//                     <label htmlFor="PickupStore">Pickup Store</label>
//                   </div>
//                 </form>
//               </div>
//             </div>
            
//             <hr className="hr-gray" />
//             <div className="d-flex justify-content-between title">
//               <p>Total</p>
//               <p>&#x20B9; {total + shippingCharge}</p>
//             </div>
//             <hr className="hr-gray" />
//             <div className="placeorder">
//               <button type="button" onClick={postdata} disabled={!cartId}>
//                 PLACE ORDER
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <Subscribe />

//       <Footer />
//     </>
//   );
// };

// export default CheckOut;

import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import NAVBAR from "./NavBar";
import Subscribe from "./Subscribe";
import Footer from "./Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CheckOut = () => {

const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [addressone, setAddressOne] = useState("");
  const [addresstwo, setAddressTwo] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [mobile, setMobile] = useState("");
  const [place, setPlace] = useState("");
  const [cartId, setCartId] = useState();
  // const [gtotal,setGtotal] = useState('');
  let userid = sessionStorage.getItem("userId");
  const navigate = useNavigate();
  const total = data.reduce((sum, item) => {
    return sum + item.productPrice * (item.quantity || 1);
  }, 0);

  let shippingCharge = 50;
  console.log("userid:", userid);
  console.log("cartId:", cartId);
  console.log("SENDING DATA:", {
    name,
    addressone,
    addresstwo,
    pincode,
    city,
    state,
    mobile,
    place,
    cartId,
    userid,
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/cart/getalldataofcart/${userid}`)
      .then((res) => {
        console.log("FULL RESPONSE:", res.data);

        // 🔥 IMPORTANT FIX
        const cartData = res.data.addtocartdata;

        if (!cartData) {
          console.log("❌ cartData not found");
          return;
        }

        console.log("✅ cartData:", cartData);

        setCartId(cartData.cartId); // ✅ THIS IS YOUR cartId
        setData(cartData.user?.product || []);
      })
      .catch((err) => {
        console.log("ERROR FETCHING CART:", err);
      });
  }, []);

  const [isLogged, setIsLogged] = useState(sessionStorage.getItem("isLogged"));

  useEffect(() => {
    setIsLogged(sessionStorage.getItem("isLogged"));
  }, []);

  const handlerLogOut = async () => {
    sessionStorage.removeItem("isLogged");
    sessionStorage.removeItem("userId");
    setIsLogged(null);
  };

  const postdata = async (e) => {
    e.preventDefault();

    console.log("PLACE ORDER CLICKED");

    if (!name || !addressone || !pincode || !city || !mobile) {
      alert("Please fill all required fields");
      return;
    }

    try {
      const response = await axios.post(
    `http://localhost:5000/checkout/add-detail-of-checkOut?userId=${userid}&cartId=${cartId}`,
        {
          name,
          addressone,
          addresstwo,
          pincode,
          city,
          state,
          mobile,
          place,
          typeofdelivery: "online",
        },
      );

      console.log("SUCCESS:", response);
      console.log("FINAL AMOUNT (PAISE):", total);

      alert("Order Placed Successfully ✅");
      console.log(process.env.RAZORPAY_KEY_ID);
      navigate("/VerifyUserData");
    
    } catch (error) {
      console.log( error);

      alert("Backend Error: " + JSON.stringify(error?.response?.data));
    }
  };

  const FlateRate = () => {
    shippingCharge = 50;
  };

  return (
    <>
      <ToastContainer />
      <NAVBAR />

      {/* HERO */}
      <div className="checkout-hero">
        <h1>Checkout</h1>
        <p>Complete your order securely</p>
      </div>

      <div className="container py-5">
        <div className="row g-4">

          {/* LEFT - FORM */}
          <div className="col-lg-6">
            <div className="checkout-card">
              <h4>Billing Details</h4>

              <form className="checkout-form">
                <div className="row g-3">

                  <div className="col-md-6">
                    <input type="text" placeholder="Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)} />
                  </div>

                  <div className="col-md-6">
                    <input type="text" placeholder="Mobile"
                      onChange={(e) => setMobile(e.target.value)} />
                  </div>

                  <div className="col-12">
                    <input type="text" placeholder="Address Line 1"
                      onChange={(e) => setAddressOne(e.target.value)} />
                  </div>

                  <div className="col-12">
                    <input type="text" placeholder="Address Line 2"
                      onChange={(e) => setAddressTwo(e.target.value)} />
                  </div>

                  <div className="col-md-6">
                    <input type="text" placeholder="City"
                      onChange={(e) => setCity(e.target.value)} />
                  </div>

                  <div className="col-md-6">
                    <input type="text" placeholder="State"
                      onChange={(e) => setState(e.target.value)} />
                  </div>

                  <div className="col-md-6">
                    <input type="text" placeholder="Pincode"
                      onChange={(e) => setPincode(e.target.value)} />
                  </div>

                  <div className="col-md-6">
                    <input type="text" placeholder="Place"
                      onChange={(e) => setPlace(e.target.value)} />
                  </div>

                </div>
              </form>
            </div>
          </div>

          {/* RIGHT - ORDER SUMMARY */}
          <div className="col-lg-6">
            <div className="checkout-card">

              <h4>Your Order</h4>

              <div className="order-list">
                {data.map((item, index) => (
                  <div key={index} className="order-item">
                    <span>{item.productTitle}</span>
                    <span>₹ {item.productPrice}</span>
                  </div>
                ))}
              </div>

              <hr />

              <div className="order-summary">
                <div className="d-flex justify-content-between">
                  <span>Subtotal</span>
                  <span>₹ {total}</span>
                </div>

                <div className="d-flex justify-content-between">
                  <span>Shipping</span>
                  <span>₹ 50</span>
                </div>

                <hr />

                <div className="d-flex justify-content-between total">
                  <b>Total</b>
                  <b>₹ {total + 50}</b>
                </div>
              </div>

              <button
                className="place-order-btn"
                onClick={postdata}
                disabled={!cartId}
              >
                Place Order
              </button>

            </div>
          </div>

        </div>
      </div>

      <Subscribe />
      <Footer />
    </>
  );
};

export default CheckOut;