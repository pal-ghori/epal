import { Container, Nav, Navbar } from 'react-bootstrap';
import { IoBagHandleOutline, IoSearch,IoLogOutOutline } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Subscribe from './Subscribe';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Bounce, ToastContainer, toast } from 'react-toastify';

const CheckOut = () => {
    const [data, setData] = useState([]);
    const [name, setName] = useState('');
    const [addressone, setAddressOne] = useState('');
    const [addresstwo, setAddressTwo] = useState('');
    const [pincode, setPincode] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [mobile, setMobile] = useState('');
    const [place, setPlace] = useState('');
    const [cartId, setCartId] = useState();
    // const [gtotal,setGtotal] = useState('');
    let userid = sessionStorage.getItem('userId');
    const navigate = useNavigate();
    let total = 0;
    let shippingCharge = 50;
    // console.log(userid);
    useEffect(() => {
        axios.get(`http://localhost:5000/cart/getalldataofcart/${userid}`)
            .then((res) => {
                // console.log(res.data.addtocartdata.cartId);
                setCartId(res.data.addtocartdata.cartId)
                setData(res.data.addtocartdata.user.product);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    const [isLogged, setIsLogged] = useState(sessionStorage.getItem('isLogged'));

    useEffect(() => {
        setIsLogged(sessionStorage.getItem('isLogged'));
    }, []);


    const handlerLogOut = async () => {
        sessionStorage.removeItem('isLogged');
        sessionStorage.removeItem('userId');
        setIsLogged(null);
    };

    const postdata = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:5000/checkout/add-detail-of-checkout?userId=${userid}&cartId=${cartId}`, {
            name: name,
            addressone: addressone,
            addresstwo: addresstwo,
            pincode: pincode,
            city: city,
            state: state,
            mobile: mobile,
            place: place,
            typeofdelivery: "online"

        })
            .then(function (response) {
                console.log(response);
                navigate('/VerifyUserData')
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    const FlateRate = () => {
        shippingCharge = total + parseInt('50')
        console.log({ shippingCharge });
    }
    return (
        <>
            <ToastContainer />

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
                            <Link to='AddToCart'>
                                <IoBagHandleOutline className='icon' />
                            </Link>
                            {
                                    isLogged ?
                                    <IoLogOutOutline onClick={handlerLogOut} className='iconLogOut' ></IoLogOutOutline>
                                    : null
                                } 
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar> 
            <div className="container">
                <div className="row">
                    <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 billing-details">
                        <h3>Billing Details</h3>
                        <form className='checkoutfrom'>
                            <label htmlFor="name">Name</label><br />
                            <input type="text" id='name' autoComplete='off' onChange={(e) => { setName(e.target.value) }} />
                            <br />
                            <label htmlFor="addressone">address one</label><br />
                            <input type="text" id='addressone'
                                onChange={(e) => { setAddressOne(e.target.value) }} />
                            <br />
                            <label htmlFor="addresstwo">addresstwo</label><br />
                            <input type="text" id='addresstwo'
                                onChange={(e) => { setAddressTwo(e.target.value) }} />
                            <br />
                            <label htmlFor="pincode">pincode</label><br />
                            <input type="text" id='pincode'
                                onChange={(e) => { setPincode(e.target.value) }} />
                            <br />
                            <label htmlFor="city">city</label><br />
                            <input type="text" id='city' onChange={(e) => { setCity(e.target.value) }} />
                            <br />
                            <label htmlFor="state">state</label><br />
                            <input type="text" id='state' onChange={(e) => setState(e.target.value)} />
                            <br />
                            <label htmlFor="mobile">Mobile</label><br />
                            <input type="text" id='mobile' onChange={(e) => setMobile(e.target.value)} />
                            <br />
                            <label htmlFor="place">place</label><br />
                            <input type="text" id='place' onChange={(e) => setPlace(e.target.value)} />
                            <br />
                        </form>
                    </div>
                    <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 your-order">
                        <h3>Your Oredres</h3>
                        <div className='d-flex justify-content-between title'>
                            <p>Product</p>
                            <p>Subtotal</p>
                        </div>
                        <hr className='hr-gray' />
                        <div>
                            {
                                data.map((item) => {
                                    total += parseInt(item.productPrice)
                                    // setGtotal(gtotal+parseInt(item.productPrice))
                                    return (
                                        <>
                                            <div className='all-checkout-product d-flex justify-content-between align-items-center'>
                                                <p>{item.productTitle}</p>
                                                <p>&#x20B9; {item.productPrice}</p>
                                            </div>
                                        </>
                                    )
                                })
                            }
                        </div>
                        <hr className='hr-gray' />
                        <div className='d-flex justify-content-between title'>
                            <p>Subtotal</p>
                            <p>&#x20B9; {total}</p>
                        </div>
                        <hr className='hr-gray' />
                        <div className='d-flex justify-content-between title'>
                            <p>Shipping</p>
                            <div className='shipping'>
                                <form>
                                    <div className='d-flex'>
                                        <input type="radio" name="Flate rate" id="FlatRate" onClick={() => { FlateRate() }} />
                                        <label htmlFor="FlatRate">Flat rate</label>
                                    </div>
                                    <div className="d-flex">
                                        <input type="radio" name="Flate rate" id="PickupStore" />
                                        <label htmlFor="PickupStore">Pickup Store</label>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <hr className='hr-gray' />
                        <div className='d-flex justify-content-between title'>
                            <p>Total</p>
                            <p>&#x20B9; {total}</p>
                        </div>
                        <hr className='hr-gray' />
                        <div className='placeorder'>
                            <button onClick={postdata}>PLACE ORDER</button>
                        </div>
                    </div>
                </div>
            </div>

            <Subscribe />


            <Footer />
        </>
    )
}

export default CheckOut;