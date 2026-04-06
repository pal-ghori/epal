
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { IoBagHandleOutline, IoSearch } from "react-icons/io5";
// import Product from '../Product';
import Subscribe from '../Subscribe';
import Footer from '../Footer';
import { useEffect, useState } from 'react';
import axios from 'axios';
import NAVBAR from '../NavBar';

// const Shop = () => {
//     const [data, setData] = useState([])
//     const res = data.slice(0, 13)
//     const isLogged = sessionStorage.getItem('isLogged');
//     useEffect(() => {
//         axios.get(`http://localhost:5000/admin/getallproduct`)
//             .then(function (response) {
//                 // console.log(response.data.productData);
//                 setData(response.data.productData)
//             })
//             .catch(function (error) {
//                 console.log(error);
//             })
//     }, [])
//     return (
//         <>
//             <div>
//             <NAVBAR></NAVBAR>
              
//             </div>
//             <div className='parallax1'>
//                 <h1 className='shop-hed'>Our Shop</h1>
//             </div>

//             {/*------------------------- Shop ----------------------------------------------------------*/}

//             <div className='container'>
//                 <div className="products-text text-center pt-5 psss">
//                     <p>NEW AND EXTRAORDINARY</p>
//                     <h2>Featured Products</h2>
//                 </div>
//                 <div className="row">
//                     {
//                         res.map((iteam) => {
//                             return (
//                                 <>
//                                     <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-xsm-6 col-6 mt-3 h-100">
//                                         <Link to={`/SingleProduct/${iteam._id}`}>
//                                             <img src={iteam.image[0]} alt="" height={'70%'} width={'95%'} />
//                                             <div className="card-info text-center">
//                                                 <h4>{iteam.title}</h4>
//                                                 <p>&#x20B9; {iteam.price}</p>
//                                             </div>
//                                         </Link>
//                                     </div>
//                                 </>
//                             )
//                         })
//                     }
//                 </div>
//                 <div className='pt-3 pb-5 text-center'>
//                     <button className='viewall'>VIEW ALL</button>
//                 </div>
//             </div>

//             <Subscribe />

//             <Footer />
//         </>
//     )
// };

const Shop = () => {
    const [data, setData] = useState([])
    const res = data.slice(0, 13)

    useEffect(() => {
        axios.get(`http://localhost:5000/admin/getallproduct`)
            .then((response) => {
                setData(response.data.productData)
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    return (
        <>
            <NAVBAR />

            {/* HERO / HEADER */}
            <div className='shop-hero'>
                <h1>Our Shop</h1>
                <p>Explore latest fashion collections</p>
            </div>

            {/* PRODUCTS */}
            <div className='container py-5'>
                <div className="text-center mb-5">
                    <p className="section-sub">NEW ARRIVALS</p>
                    <h2 className="section-title">Featured Products</h2>
                </div>

                <div className="row g-4">
                    {
                        res.map((item) => (
                            <div className="col-xl-3 col-lg-4 col-md-6 col-6" key={item._id}>
                                <Link to={`/SingleProduct/${item._id}`} className="text-decoration-none">

                                    <div className="product-card">
                                        <div className="product-img-box">
                                            <img src={item.image[0]} alt="" />
                                        </div>

                                        <div className="product-content">
                                            <h5>{item.title}</h5>
                                            <p>₹ {item.price}</p>
                                        </div>

                                        <div className="product-hover">
                                            View Product
                                        </div>
                                    </div>

                                </Link>
                            </div>
                        ))
                    }
                </div>

                <div className='text-center mt-5'>
                    <button className='btn-secondary'>View More</button>
                </div>
            </div>

            <Subscribe />
            <Footer />
        </>
    )
}

export default Shop;