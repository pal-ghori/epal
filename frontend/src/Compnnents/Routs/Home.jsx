import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Carousel from 'react-bootstrap/Carousel';
import { IoBagHandleOutline, IoSearch } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import Collection from '../Collection';
import Block from '../Block';
import Footer from '../Footer';
import Quotes from '../Quotes';
import Blog from '../Blog';
import Subscribe from '../Subscribe';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import { TiEye } from "react-icons/ti";
import NAVBAR from '../NavBar';

// const Home = () => {
//     const [data, setData] = useState([]);
//     const [id, setId] = useState([]);
//     const result = data.slice(0, 8);
//     const navigatetoshop = useNavigate()

//     useEffect(() => {
//         axios.get('http://localhost:5000/admin/getallproduct')
//             .then(function (response) {
//                 // console.log(response.data);
//                 setData(response.data.productData)
//             })
//             .catch(function (error) {
//                 console.log(error);
//             })
//     }, [])

//     const navigateShop = (e) => {
//         navigatetoshop('./Shop')
//     }

//     const isLogged = sessionStorage.getItem('isLogged');

//     return (
//         <>

//             {/*------------------------- home carousal ----------------------------------------------------*/}

//             <div>
//             <NAVBAR></NAVBAR>

                
//                 <div className='crowsal'>
//                     <Carousel className='main'>
//                         <Carousel.Item className='carowselitem Carousel-img '>
//                             <img
//                                 className="d-block w-100"
//                                 src={require('./img/asset 16.jpg')}
//                                 alt="First slide"
//                             />
//                             <Carousel.Caption className='leble'>
//                                 <div className='cont'>
//                                     <p className='txt'>FASHION IS MORE ART THAN ART IS.</p>
//                                     <h1>Outrageous <br /> Fashion <br />
//                                         Always For You!</h1>
//                                     <Link to="/Shop">
//                                         <button className="button-6">Shop Now</button>
//                                     </Link>
//                                 </div>
//                             </Carousel.Caption>
//                         </Carousel.Item>
//                         <Carousel.Item className='carowselitem Carousel-img '>
//                             <img
//                                 className="d-block w-100"
//                                 src={require('./img/asset 17.jpg')}
//                                 alt="Second slide"
//                             />
//                             <Carousel.Caption className='leble'>
//                                 <div className='cont'>
//                                     <p className='txt'>You can have anything you want If you dress for it.</p>
//                                     <h1>Inspired By Nature <br /> & <br />
//                                         Crafted With Love</h1>
//                                     <Link to="/Shop">
//                                         <button className="button-6">Shop Now</button>
//                                     </Link>
//                                 </div>
//                             </Carousel.Caption>
//                         </Carousel.Item>
//                     </Carousel>
//                 </div>
//             </div>

//             {/*------------------------- Shop ----------------------------------------------------------*/}

//             <div className='container'>
//                 <div className='products-text text-center pt-5'>
//                     <p>NEW AND EXTRAORDINARY</p>
//                     <h2>Featured Products</h2>
//                 </div>
//                 <div className='row d-flex justify-content-center first-card'>
//                     {
//                         result.map((item) => {
//                             return (
//                                 <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xsm-12" >
//                                     <Link to={`/SingleProduct/${item._id}`} prodId={item._id}>
//                                         <div style={{ width: '18rem' }} className='my-3 first-card' >
//                                             <div className='fisrt-card-image'>
//                                                 <img src={item.image[0]} alt="" className='card-img' />
//                                                 <div className='product-info'>
//                                                     <h4 className='my-2 text-center'>{item.title}</h4>
//                                                     <p className='text-center'>&#x20B9; {item.price}</p>
//                                                     <div class="hover-effect">Veiw <TiEye /></div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </Link>
//                                 </div>
//                             )
//                         })
//                     }
//                 </div>
//                 <div className='pt-3 pb-5 text-center'>
//                     <button className='viewall' onClick={(e) => { navigateShop() }}>VIEW ALL</button>
//                 </div>
//             </div>

//             <Collection />

//             <div className='container block-body'>
//                 <Block />
//             </div>

//             <Quotes />

//             <Blog />

//             <div className="container">
//                 <hr className='black' />
//             </div>

//             <Subscribe />

//             <Footer />
//         </>

//     );

// }
const Home = () => {
    const [data, setData] = useState([]);
    const result = data.slice(0, 8);
    const navigatetoshop = useNavigate()

    useEffect(() => {
        axios.get('http://localhost:5000/admin/getallproduct')
            .then((response) => {
                setData(response.data.productData)
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    const navigateShop = () => {
        navigatetoshop('./Shop')
    }

    return (
        <>
            <NAVBAR />

            {/* HERO SECTION */}
            <div className='hero-section'>
                <Carousel fade>
                    <Carousel.Item>
                        <img
                            className="d-block w-100 hero-img"
                            src={require('./img/asset 16.jpg')}
                            alt="slide"
                        />
                        <Carousel.Caption className='hero-caption'>
                            <p className='hero-sub'>FASHION IS MORE ART THAN ART IS.</p>
                            <h1>Outrageous Fashion<br />Always For You!</h1>
                            <Link to="/Shop">
                                <button className="btn-main">Shop Now</button>
                            </Link>
                        </Carousel.Caption>
                    </Carousel.Item>

                    <Carousel.Item>
                        <img
                            className="d-block w-100 hero-img"
                            src={require('./img/asset 17.jpg')}
                            alt="slide"
                        />
                        <Carousel.Caption className='hero-caption'>
                            <p className='hero-sub'>Dress for what you want.</p>
                            <h1>Inspired By Nature<br />Crafted With Love</h1>
                            <Link to="/Shop">
                                <button className="btn-main">Shop Now</button>
                            </Link>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>

            {/* FEATURED PRODUCTS */}
            <div className='container py-5'>
                <div className='text-center mb-5'>
                    <p className='section-sub'>NEW COLLECTION</p>
                    <h2 className='section-title'>Featured Products</h2>
                </div>

                <div className='row g-4'>
                    {result.map((item) => (
                        <div className="col-xl-3 col-lg-4 col-md-6" key={item._id}>
                            <Link to={`/SingleProduct/${item._id}`} className="text-decoration-none">

                                <div className='product-card'>
                                    <div className='product-img-box'>
                                        <img src={item.image[0]} alt="" />
                                    </div>

                                    <div className='product-content'>
                                        <h5>{item.title}</h5>
                                        <p>₹ {item.price}</p>
                                    </div>

                                    <div className='product-hover'>
                                        View <TiEye />
                                    </div>
                                </div>

                            </Link>
                        </div>
                    ))}
                </div>

                <div className='text-center mt-4'>
                    <button className='btn-secondary' onClick={navigateShop}>
                        View All
                    </button>
                </div>
            </div>

            <Collection />
            <div className='container'>
                <Block />
            </div>
            <Quotes />
            <Blog />

            <div className="container">
                <hr />
            </div>

            <Subscribe />
            <Footer />
        </>
    )
}

export default Home;