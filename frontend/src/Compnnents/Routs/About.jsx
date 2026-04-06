import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { IoBagHandleOutline, IoSearch } from "react-icons/io5";
import Block from '../Block';
import Quotes from '../Quotes';
import Subscribe from '../Subscribe';
import Footer from '../Footer';
import NAVBAR from '../NavBar';


// const About = () => {
    // const isLoged = sessionStorage.getItem('isLogged')
//     return (
//         <>
//             <div>
//             <NAVBAR></NAVBAR>
                
//             </div>
//             <div className='parallax2'>
//                 <h1 className='shop-hed'>About Us</h1>
//             </div>

//             <div className='container block-body'>
//                 <Block />
//             </div>

//             <Quotes />

//             <Subscribe />

//             <Footer />
//         </>
//     )
// };

const About = () => {
    const isLoged = sessionStorage.getItem('isLogged')
    
    return (
        <>
            <NAVBAR />

            {/* HERO SECTION */}
            <div className='about-hero'>
                <h1>About Us</h1>
                <p>We create style that speaks comfort & confidence</p>
            </div>

            {/* ABOUT CONTENT */}
            <div className='container about-section'>
                <div className='row align-items-center g-4'>

                    <div className='col-lg-6'>
                        <div className='about-text'>
                            <h2>Who We Are</h2>
                            <p>
                                We are a modern fashion brand focused on delivering
                                high-quality, stylish, and comfortable clothing.
                                Our goal is to provide a seamless shopping experience
                                with trendy collections at affordable prices.
                            </p>

                            <p>
                                From casual wear to premium outfits, we ensure every
                                product meets our quality standards and customer expectations.
                            </p>
                        </div>
                    </div>

                    <div className='col-lg-6 text-center'>
                        <img
                            src="https://images.unsplash.com/photo-1521334884684-d80222895322"
                            alt="about"
                            className='about-img'
                        />
                    </div>

                </div>
            </div>

            {/* EXTRA COMPONENTS */}
            <div className='container'>
                <Block />
            </div>

            <Quotes />

            <Subscribe />
            <Footer />
        </>
    )
};

export default About;