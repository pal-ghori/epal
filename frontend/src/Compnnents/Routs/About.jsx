import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { IoBagHandleOutline, IoSearch } from "react-icons/io5";
import Block from '../Block';
import Quotes from '../Quotes';
import Subscribe from '../Subscribe';
import Footer from '../Footer';
import NAVBAR from '../NavBar';


const About = () => {
    const isLoged = sessionStorage.getItem('isLogged')
    return (
        <>
            <div>
            <NAVBAR></NAVBAR>
                
            </div>
            <div className='parallax2'>
                <h1 className='shop-hed'>About Us</h1>
            </div>

            <div className='container block-body'>
                <Block />
            </div>

            <Quotes />

            <Subscribe />

            <Footer />
        </>
    )
};

export default About;