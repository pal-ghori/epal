// import 'bootstrap/dist/css/bootstrap.min.css';

// let Footer = () => {
//     return (
//         <>
//             <section className='footer'>
//                 <div className="container">
//                     <div className="row">
//                         <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-12 footer-text">
//                             <h4>About Our Store</h4>
//                             <p>Our values in Chani are upheld within high quality tailoring, fabric insight and innovative design alongside the desire for innovative and the natural beauty with versatility and top of mind allowing for the investment pieces.</p>
//                             <img src={require('./Routs/img/asset 39.png')} alt="" />
//                         </div>
//                         <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-12 footer-text">
//                             <h3>Shop</h3>
//                             <ul>
//                                 <li><a href="/Shop">DRESSES</a></li>
//                                 <li><a href="/Shop">T-SHIRTS</a></li>
//                                 <li><a href="/Shop">BLOUSES</a></li>
//                                 <li><a href="/Shop">OUTERWEAR</a></li>
//                                 <li><a href="/Shop">ACCESSORIES</a></li>
//                                 <li><a href="/Shop">KNITWEAR</a></li>
//                                 <li><a href="/Shop">PANTS</a></li>
//                             </ul>
//                         </div>
//                         <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-12 footer-text">
//                             <h3>Links</h3>
//                             <ul>
//                                 <li><a href="/About">ABOUT US</a></li>
//                                 <li><a href="/Contact">STORE LOCATIONS</a></li>
//                                 {/* <li><a href="c">SHIPPING & RETURNS</a></li> */}
//                                 {/* <li><a href="c">SUSTAINABILITY</a></li> */}
//                                 <li><a href="/About">HELP & FAQS</a></li>
//                                 <li><a href="/Contact">CONTACTS</a></li>
//                             </ul>
//                         </div>
//                         <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-12 footer-text">
//                             <h3>Help</h3>
//                             <ul>
//                                 <li><a href="">PRIVACY POLICY</a></li>
//                                 <li><a href="">REFUND POLICY</a></li>
//                                 <li><a href="">ORDER STATUS</a></li>
//                                 <li><a href="">GIFT CARDS</a></li>
//                                 <li><a href="">SIZE GUIDE</a></li>
//                             </ul>
//                         </div>
//                     </div>
//                     <hr className='horizontal-border' />
//                     <div className="row">
//                         <div className='col-xxl-6 col-xl-6 col-lg-6 col-md-12 col-12 footer-end'>
//                             <p className='text-start'>United States (USD $)</p>
//                         </div>
//                         <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-12 col-12 footer-end">
//                             <p className='text-end'>©2024 chani, All Rights Reserved. With Love by CMSSuperHeroes</p>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//         </>
//     );
// }

// export default Footer;

import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

let Footer = () => {
    return (
        <section className='footer-section'>

            <div className="container">

                <div className="row g-4">

                    {/* ABOUT */}
                    <div className="col-lg-5 col-md-6">
                        <div className="footer-box">
                            <h5>About Our Store</h5>
                            <p>
                                We focus on high-quality fabrics, modern design, and timeless fashion.
                                Our goal is to provide stylish and comfortable clothing for everyone.
                            </p>
                            <img src={require('./Routs/img/asset 39.png')} alt="" className="payment-img"/>
                        </div>
                    </div>

                    {/* SHOP */}
                    <div className="col-lg-2 col-md-6">
                        <div className="footer-box">
                            <h6>Shop</h6>
                            <ul>
                                <li><Link to="/Shop">Dresses</Link></li>
                                <li><Link to="/Shop">T-Shirts</Link></li>
                                <li><Link to="/Shop">Blouses</Link></li>
                                <li><Link to="/Shop">Outerwear</Link></li>
                            </ul>
                        </div>
                    </div>

                    {/* LINKS */}
                    <div className="col-lg-2 col-md-6">
                        <div className="footer-box">
                            <h6>Company</h6>
                            <ul>
                                <li><Link to="/About">About</Link></li>
                                <li><Link to="/Contact">Contact</Link></li>
                                <li><Link to="/About">FAQ</Link></li>
                            </ul>
                        </div>
                    </div>

                    {/* HELP */}
                    <div className="col-lg-3 col-md-6">
                        <div className="footer-box">
                            <h6>Support</h6>
                            <ul>
                                <li><Link to="/About">Privacy Policy</Link></li>
                                <li><Link to="/About">Refund Policy</Link></li>
                                <li><Link to="/About">Order Status</Link></li>
                            </ul>
                        </div>
                    </div>

                </div>

                {/* BOTTOM */}
                <div className="footer-bottom">
                    <p>© 2026 eglobe Store | All Rights Reserved</p>
                </div>

            </div>

        </section>
    );
}

export default Footer;