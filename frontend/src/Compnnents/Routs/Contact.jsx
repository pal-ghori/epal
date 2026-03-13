import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { IoBagHandleOutline, IoSearch } from "react-icons/io5";
import Contactus from '../Contactus';
import Subscribe from '../Subscribe';
import Footer from '../Footer';
import NAVBAR from '../NavBar';

const Contact = () => {
    const isLoged = sessionStorage.getItem('isLogged')
    return (
        <>
            <div>
            <NAVBAR></NAVBAR>
              
            </div>
            <div className='map'>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d172139.71944576502!2d-122.65386774957614!3d47.61285104940075!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5490102c93e83355%3A0x102565466944d59a!2sSeattle%2C%20WA%2C%20USA!5e0!3m2!1sen!2sin!4v1707886438323!5m2!1sen!2sin" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title='Google MAP'></iframe>

                <div className='cont-card'>
                    <h2 className='n-tag'>New York</h2>
                    <p className='aed'>Our new store now: 2307 Beverley Rd Brooklyn, New York</p>
                    <p>Week Days &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;   &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        09.00 - 24:00</p>
                    <hr className='hr-black' />
                    <p>Week Days &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;   &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        09.00 - 24:00</p>
                    <hr className='hr-black' />
                    <p>Week Days &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;   &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        09.00 - 24:00</p>
                    <hr className='hr-black' />

                </div>
            </div>

            <Contactus />

            <Subscribe />

            <Footer />
        </>
    )
};

export default Contact;