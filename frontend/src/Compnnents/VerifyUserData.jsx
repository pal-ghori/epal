import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap';
import { IoBagHandleOutline, IoLogOutOutline, IoSearch } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Subscribe from './Subscribe';

const VerifyUserData = () => {
    const [data, setData] = useState([]);
    const [cartId, setCartId] = useState();
    const [checkoutId, setCkeckoutId] = useState();
    const navigate = useNavigate();
    // console.log(logo);

    let userid = sessionStorage.getItem('userId');

    const [isLogged, setIsLogged] = useState(sessionStorage.getItem('isLogged'));

    useEffect(() => {
        setIsLogged(sessionStorage.getItem('isLogged'));
    }, []);


    const handlerLogOut = async () => {
        sessionStorage.removeItem('isLogged');
        sessionStorage.removeItem('userId');
        setIsLogged(null);
    };

    useEffect(() => {
        axios.get(`http://localhost:5000/checkout/getcheckout/${userid}`)
            .then((res) => {
                console.log(res.data.data);
                setData(res.data.data.user.detail[0]);
                setCkeckoutId(res.data.data._id)
                setCartId(res.data.data.user.cart_id)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }

    async function displayRazorpay() {
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }

        // creating a new order
        const result = await axios.post(`http://localhost:5000/checkout/createorderforallcart/${cartId}`);

        if (!result) {
            alert("Server error. Are you online?");
            return;
        }
        // console.log(result);
        // Getting the order details back
        const { amount, id, currency } = result.data.order;
        // console.log(order_id);
        const options = {
            key: "rzp_test_5ez4Vyrl60o1D4", // Enter the Key ID generated from the Dashboard
            amount: amount.toString(),
            currency: currency,
            name: "epal Clothing",
            description: "Test Transaction",
            image: `${require('./Routs/img/logo.png')}`,
            order_id: id,
            handler: async function (response) {
                // const rpaydata = {
                //     orderCreationId: id,
                //     razorpayPaymentId: response.razorpay_payment_id,
                //     razorpayOrderId: response.razorpay_order_id,
                //     razorpaySignature: response.razorpay_signature,
                // };

                // const result = await axios.post("http://localhost:5000/checkout/paymentvarification", rpaydata);
                // console.log(response);
                axios.post(`http://localhost:5000/checkout/paymentvarification`, {
                    orderCreationId: id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                    userId: userid,
                    arrayofproduct: result.data.arrayofproduct,
                    checkoutId: checkoutId
                })
                    .then(function (response) {
                        console.log(response);
                        // navigate('/VerifyUserData')
                        if (response.data.status === 200) {
                            navigate('/OrderSuccess')
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    })

                // alert(result.data.msg);
            },
            prefill: {
                name: "User Name",
                email: "userEmail@example.com",
                contact: "9999999999",
            },
            notes: {
                address: "User's Address Corporate Office",
            },
            theme: {
                color: "#222222",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }

    return (
        <>
           <Navbar expand="lg" className="bg-body-success my-2 bg-dark padding-12 ">
                <Container>
                    <Navbar.Brand href="#home" className='logo'><Link to="/"><img src={require('../Compnnents/Routs/img/asset 0.png')} alt="" /></Link></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="navbar m-auto">
                            <Nav.Link className='navitems' to='/'>
                                <Link to="/" className='page for-blackcolor'>Home</Link>
                            </Nav.Link>
                            <Nav.Link className='navitems' to='/Shop'>
                                <Link to="/Shop" className='page for-blackcolor'>Shop</Link>
                            </Nav.Link>
                            <Nav.Link className='navitems' to='/About'>
                                <Link to="/About" className='page for-blackcolor'>About</Link>
                            </Nav.Link>
                            <Nav.Link className='navitems' to='/Contact'>
                                <Link to="/Contact" className='page for-blackcolor'>Contact</Link>
                            </Nav.Link>
                            {
                                !isLogged ?
                                    <Nav.Link className='navitems' to='/UserLogin'>
                                        <Link to="/UserLogin" className='page'>Login</Link>
                                    </Nav.Link> : null
                            }
                        </Nav>
                        <div className='all-icons text-center d-flex justify-content-center align-items-center'>
                            <Link to='./AddToCart'>
                                <IoBagHandleOutline className='icon' />
                            </Link>
                            {
                                    isLogged ?
                                    <IoLogOutOutline onClick={handlerLogOut}  className='iconLogOut' ></IoLogOutOutline>
                                    : null
                                }
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className="container-1000">
                <div className='userverify-all-detail'>
                    <h2>User Details: </h2>
                    <hr className='hr-gray-two' />
                    <div className='user-detail'>
                        <p>Name:</p>
                        <p>{data.name}</p>
                    </div>
                    <hr className='hr-gray-two' />
                    <div className='user-detail'>
                        <p>AddressOne:</p>
                        <p>{data.addressOne}</p>
                    </div>
                    <hr className='hr-gray-two' />
                    <div className='user-detail'>
                        <p>AddressTwo:</p>
                        <p>{data.addressTwo}</p>
                    </div>
                    <hr className='hr-gray-two' />
                    <div className='user-detail'>
                        <p>PinCode:</p>
                        <p>{data.pinCode}</p>
                    </div>
                    <hr className='hr-gray-two' />
                    <div className='user-detail'>
                        <p>City:</p>
                        <p>{data.city}</p>
                    </div>
                    <hr className='hr-gray-two' />
                    <div className='user-detail'>
                        <p>State:</p>
                        <p>{data.state}</p>
                    </div>
                    <hr className='hr-gray-two' />
                    <div className='user-detail'>
                        <p>Mobile no.</p>
                        <p>{data.mobile}</p>
                    </div>
                    <hr className='hr-gray-two' />
                    <div className='user-detail'>
                        <p>Place:</p>
                        <p>{data.place}</p>
                    </div>
                    <div className="placeorder my-5"><button onClick={displayRazorpay}>Place Order</button></div>
                </div>
            </div>
            <Subscribe />


            <Footer />
        </>
    )
}

export default VerifyUserData;