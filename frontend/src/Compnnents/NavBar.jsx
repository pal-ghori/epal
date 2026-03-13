import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { IoBagHandleOutline, IoSearch,IoLogOutOutline } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
let isLogged = sessionStorage.getItem('isLogged');


export default function NAVBAR() {
    const [isLogged, setIsLogged] = useState(sessionStorage.getItem('isLogged'));
    const navigate = useNavigate();

    useEffect(() => {
        setIsLogged(sessionStorage.getItem('isLogged'));
    }, []);


    const handlerLogOut = async () => {
        sessionStorage.removeItem('isLogged');
        sessionStorage.removeItem('userId');
        setIsLogged(null);
        navigate('/UserLogin');
    };

    return (
        <>
            <div className='menu '>

                <Navbar expand="lg" className="bg-body-success my-2">
                    <Container className='d-flex justify-content-between'>
                        <Navbar.Brand href="#home" className='logo'><Link to="/"><img src={require('./Routs/img/asset 0.png')} alt="" /></Link></Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">

                            <Nav className="navbar d-flex justify-content-center">
                                <Nav.Link className='navitems' to='/'>
                                    <Link to="/" className='page'>Home</Link>
                                </Nav.Link>
                                <Nav.Link className='navitems' to='/Shop'>
                                    <Link to="/Shop" className='page'>Shop</Link>
                                </Nav.Link>
                                <Nav.Link className='navitems' to='/About'>
                                    <Link to="/About" className='page'>About</Link>
                                </Nav.Link>
                                <Nav.Link className='navitems' to='/Contact'>
                                    <Link to="/Contact" className='page'>Contact</Link>
                                </Nav.Link>
                                
                                {isLogged==null ?
                                    <Nav.Link className='navitems' to='/UserLogin'>
                                        <Link to="/UserLogin" className='page'>Login</Link>
                                    </Nav.Link> : null}
                            </Nav>
                            <div className='all-icons d-flex justify-content-center'>
                                <Link to='/AddToCart'>
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
                </Navbar><hr />
            </div></>
    )
}
