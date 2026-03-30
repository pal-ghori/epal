import { FaFacebook, FaInstagram, FaStar, FaTiktok, FaTwitter } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import Carousel from 'react-bootstrap/Carousel';
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Container } from "react-bootstrap";
import { IoBagHandleOutline, IoLogOutOutline, IoSearch } from "react-icons/io5";
import Footer from "./Footer";
import Subscribe from "./Subscribe";

const SingleProduct = (props) => {
    const [data, setData] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();

    // console.log(id);
    useEffect(() => {
        axios.get(`http://localhost:5000/admin/getsingleproduct/${id}`)
            .then(function (response) {
                // console.log(response.data.data);
                setData(response.data.data)
            })
            .catch(function (error) {
                console.log(error);
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

    const postquery = () => {
    console.log("ADD TO CART CLICKED");

    let userid = sessionStorage.getItem('userId');

    if (!userid) {
        alert("Please login first");
        navigate("/UserLogin");
        return;
    }

    axios.post("http://localhost:5000/cart/addtocart", {
        userId: userid,
        productId: id
    })
    .then((res) => {
        console.log("SUCCESS:", res);
        navigate('/AddToCart');
    })
    .catch((error) => {
        console.log("ERROR:", error.response?.data || error);
    });
};

    return (
        <section>
            {console.log(data)}
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
                            <Link to='/AddToCart'>
                                <IoBagHandleOutline className='icon' />
                                {
                                    isLogged ?
                                    <IoLogOutOutline onClick={handlerLogOut}  className='iconLogOut' ></IoLogOutOutline>
                                    : null
                                }
                            </Link>
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className="container">
                <div className="row mt-5">
                    <Carousel className="col-xxl-6 col-xl-6 col-lg-6 col-md-12 col-12 text-center ">
                        <img src={(data.image) ? data.image[0] : ""} alt="" height={'90%'} width={'90%'} />
                        <img src={(data.image) ? data.image[1] : ""} alt="" height={'90%'} width={'90%'} />
                    </Carousel>
                    <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-12 col-12 singleProduct-info">
                        <h1>{data.title}</h1>
                        <div className="singleProduct-price d-flex">
                            <span className='text-danger'>&#x20B9; {data.price}</span>
                        </div>
                        <div className="star d-flex">
                            <FaStar className="single-star" /><FaStar className="single-star" /><FaStar className="single-star" /><FaStar className="single-star" /><FaStar className="single-star" />
                            <p>(1 customer review / Add review)</p>
                        </div>
                        <p>Our products use finest materials and stunning design to create something special. Transformative colours, bold textiles and unique prints, natural fibres with high our quality craftsmanship design remains at forefront. We believe in creating unique products, so we use finest materials and stunning design to create special items.</p>
                        <button onClick={postquery}>ADD TO CART</button>
                        <div className="whislist d-flex">
                            <CiHeart className="single-whislist" />
                            <p>ADD TO WISHLIST</p>
                        </div>
                        <hr />
                        <div className="tags">
                            <p>SKU:  ED5690058</p>
                            <p>CATEGORIES:
                                BLOUSES, KNITWEAR, OUTERWEAR</p>
                            <p>TAGS:
                                CASUAL, YELLOW</p>
                        </div>
                        <div className="social-icons">
                            <FaFacebook className="single-star" />
                            <FaInstagram className="single-star" />
                            <FaTiktok className="single-star" />
                            <FaTwitter className="single-star" />
                        </div>
                    </div>
                </div>
                <div className="Description">
                    <p className="text-center">DESCRIPTION</p>
                    <hr />
                    <p>Starting with our core, we are replacing the conventional composition of our Essentials Collection with more sustainable fibres in each product. An action only contributing to the longevity of the classic styles, designed to last and stand the test of time. Moving forward, we are committed to increasing percentage of the more sustainable fibres used in seasonal collections. Transformative colours partner bold textiles and unique prints, natural fibres paired with high our quality craftsmanship and thoughtful design remains at the forefront textile care labelling drying and taking care of our clothes.</p>
                </div>
            </div>
            <Subscribe />
            <Footer />
        </section>
    )
}

export default SingleProduct;