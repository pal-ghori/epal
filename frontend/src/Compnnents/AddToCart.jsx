import React, { useEffect, useState } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { IoBagHandleOutline, IoClose, IoLogOutOutline, IoSearch } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import Subscribe from './Subscribe'
import Footer from './Footer'
import axios from 'axios'

function AddToCart() {
    const [data, setData] = useState([])
    const [cartId, setCartId] = useState([])
    const [deletedProduct, setDeletedProduct] = useState('')
    var total = 0;
    let userid = sessionStorage.getItem('userId');
    
    useEffect(() => {
        getData();
    }, [deletedProduct])


    const [isLogged, setIsLogged] = useState(sessionStorage.getItem('isLogged'));

    useEffect(() => {
        setIsLogged(sessionStorage.getItem('isLogged'));
    }, []);


    const handlerLogOut = async () => {
        sessionStorage.removeItem('isLogged');
        sessionStorage.removeItem('userId');
        setIsLogged(null);
    };

    function getData() {
        axios.get(`http://localhost:5000/cart/getalldataofcart/${userid}`)
            .then(async (res) => {
                console.log(res);
                if(res.data)
                {
                     setData(res?.data?.addtocartdata?.user?.product)
                    setCartId(res.data.addtocartdata.cartId)
                }
                else{
                    console.log('else')
                }
            })
            .catch((err) => {
                setData([])
                
                console.log("err",err)
            })
        }

    const removeCartItem = async (productId) => {

        console.log("PID = " + productId);
        await axios.delete(`http://localhost:5000/cart/remove-cart-item?user_id=${userid}&product_id=${productId}`)
            .then(function (res) {
                if(res.data.success)
                {
                    console.log('sss')
                    getData()
                }
                console.log(res);
            })
            .catch(function (err) {
                console.log(err);
            })
        setDeletedProduct(productId)
    }


    return (
        <>

             <Navbar expand="lg" className="bg-body-success my-2 bg-dark padding-12 ">
                <Container>
                    <Navbar.Brand href="#home" className='logo'><Link to="/"><Link to="/"><img src={require('../Compnnents/Routs/img/asset 0.png')} alt="" /></Link></Link></Navbar.Brand>
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
                                        </Nav.Link>:null
                                    }
                        </Nav>
                        <div className='all-icons text-center d-flex justify-content-center align-items-center'>
                            <Link >
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
            <div className="container">
                <div className='margin-top'>
                    <div className='d-flex justify-content-between align-items-center'>
                        <div>
                            <b>Product</b>
                        </div>
                        <div>
                            <div className='row'>
                                {console.log(data)}
                                {

                                    data.map((item) => {
                                        total += parseInt(item.productPrice);
                                        return (
                                            <>
                                                <div className="d-flex align-items-center text-center col-xxl-4 col-xl-4 col-lg-4 col-md-5 single-cart-product">
                                                    <IoClose className='close-icon' onClick={() => { removeCartItem(item.productId) }} />
                                                    <img src={(item.productImage) ? item.productImage[0] : ""} alt="" width={'30%'} />
                                                    <div className='product-info'>
                                                        <p>{item.productTitle}</p>
                                                        <p>&#x20B9; {item.productPrice}</p>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    })
                                }
                            </div>
                        </div>

                    </div>

                    <hr className='hr-black' />
                </div>

                <div className='final-bill'>
                    <h3>Cart Total</h3>
                    <div className='d-flex justify-content-between align-items-center mt-5'>
                        <div className=''>
                            <b>Sub Total</b>
                        </div>
                        <div>
                            <p>&#x20B9; {total}</p>
                        </div>
                    </div>
                    <hr className='hr-black' />
                    <div className='d-flex justify-content-between align-items-center mt-5'>
                        <div className=''>
                            <b>Total</b>
                        </div>
                        <div>
                            <h4><b>&#x20B9; {total}</b></h4>
                        </div>
                    </div>
                    <hr className='hr-black' />
                    { data.length!==0 ? ( <Link to="/CheckOut">
                        <button className='update-cart'>PROCEED TO CHECKOUT</button>
                    </Link>) : ""}
                   
                </div>

                <hr className='hr-black' />

            </div>
            <Subscribe />

            <Footer />
        </>
    )
}

export default AddToCart;