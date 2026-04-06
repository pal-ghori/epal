// import 'bootstrap/dist/css/bootstrap.min.css';

// let Quotes = () => {
//     return (
//         <>
//             <section className="quotes">
//                 <div className="container full-card">
//                     <div className="row ">
//                         <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-12 col-12 quotes-img">
//                             <img src={require('./Routs/img/quotes-1.webp')} alt="" height={'100%'} width={'80%'} />
//                         </div>
//                         <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-12 col-12 d-flex align-items-center">
//                             <div className='quotes-text'>
//                                 <h6>DEFINING NEW FASHION</h6>
//                                 <h2>Fashionable, True Elegant& Looks So Good!</h2>
//                                 <p>Our products use finest materials and stunning design to create something special. Transformative colours, bold textiles and unique prints, natural fibres with high our quality craftsmanship design remains at forefront.</p>
//                                 <p>We believe in creating unique products, so we use finest materials and stunning design to create special items.</p>
//                                 <button>LEARN MORE</button>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="row my-5">
//                         <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-12 col-12 d-flex align-items-center">
//                             <div className='quotes-text'>
//                                 <h6>EXPLORE OUR COLLECTIONS</h6>
//                                 <h2>Innovative, An Unobtrusive & Honest Beauty!</h2>
//                                 <p>Our values are upheld within high quality tailoring, fabric insight and innovative design alongside the desire for innovative and the natural beauty with versatility and top of mind allowing the investment pieces.</p>
//                                 <p>Our production lines are intentionally small with a focus on natural fabrications and unique seasonless design.</p>
//                                 <button>SHOP COLLECTION</button>
//                             </div>
//                         </div>
//                         <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-12 col-12 quotes-img d-flex justify-content-end">
//                             <img src={require('./Routs/img/quotes-2.webp')} alt="" height={'100%'} width={'80%'} />
//                         </div>
//                     </div>
//                     <div className='vedio-page'>
//                         <img src={require('./Routs/img/vedio.webp')} alt="" height={'100%'} width={'100%'} />
//                     </div>
//                     <div className="row my-5">
//                         <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12 text-center free-shipping">
//                             <img src={require('./Routs/img/free-delivery.png')} alt="" />
//                             <h5>Free Shipping</h5>
//                             <p>A free trackable two days delivery service on all orders over $90.</p>
//                         </div>
//                         <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12 text-center free-shipping">
//                             <img src={require('./Routs/img/refund.png')} alt="" />
//                             <h5>Money Back Guarantee</h5>
//                             <p>We offer customers 100% money back guarantee on everything we sell.</p>
//                         </div>
//                         <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12 text-center free-shipping">
//                             <img src={require('./Routs/img/payment.png')} alt="" />
//                             <h5>Flexible Payment</h5>
//                             <p>All orders placed before Sunday to Friday are dispatched same day.</p>
//                         </div>
//                         <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12 text-center free-shipping">
//                             <img src={require('./Routs/img/24-hours-support.png')} alt="" />
//                             <h5>Exchanges & Returns</h5>
//                             <p>You have 30 days from the shipping date to return your purchase.</p>
//                         </div>
//                     </div>
//                 </div>
//                 <hr />
//             </section>
//         </>
//     );
// }

// export default Quotes;

import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

let Quotes = () => {
    return (
        <>
            <section className="quotes-section">

                <div className="container">

                    {/* SECTION 1 */}
                    <div className="row align-items-center g-4 my-5">

                        <div className="col-lg-6 text-center">
                            <img src={require('./Routs/img/quotes-1.webp')} className="quotes-img" alt="" />
                        </div>

                        <div className="col-lg-6">
                            <div className="quotes-text">
                                <span>DEFINING NEW FASHION</span>
                                <h2>Elegant, Modern & Stylish Looks</h2>
                                <p>
                                    Our products use finest materials and stunning design to create something special.
                                    We combine bold textiles with natural fabrics to ensure comfort and style.
                                </p>

                                <Link to="/About" className="btn-main">Learn More</Link>
                            </div>
                        </div>

                    </div>

                    {/* SECTION 2 */}
                    <div className="row align-items-center g-4 my-5 flex-lg-row-reverse">

                        <div className="col-lg-6 text-center">
                            <img src={require('./Routs/img/quotes-2.webp')} className="quotes-img" alt="" />
                        </div>

                        <div className="col-lg-6">
                            <div className="quotes-text">
                                <span>EXPLORE COLLECTION</span>
                                <h2>Innovative & Minimal Design</h2>
                                <p>
                                    We focus on high quality tailoring, clean aesthetics and versatile fashion
                                    that suits every occasion with elegance.
                                </p>

                                <Link to="/Shop" className="btn-main">Shop Now</Link>
                            </div>
                        </div>

                    </div>

                    {/* VIDEO / BANNER */}
                    <div className="video-banner my-5">
                        <img src={require('./Routs/img/vedio.webp')} alt="" />
                    </div>

                    {/* FEATURES */}
                    <div className="row text-center g-4 my-5">

                        <div className="col-md-3 col-6">
                            <div className="feature-card">
                                <img src={require('./Routs/img/free-delivery.png')} alt="" />
                                <h6>Free Shipping</h6>
                                <p>Free delivery on all orders above ₹999</p>
                            </div>
                        </div>

                        <div className="col-md-3 col-6">
                            <div className="feature-card">
                                <img src={require('./Routs/img/refund.png')} alt="" />
                                <h6>Money Back</h6>
                                <p>100% refund guarantee</p>
                            </div>
                        </div>

                        <div className="col-md-3 col-6">
                            <div className="feature-card">
                                <img src={require('./Routs/img/payment.png')} alt="" />
                                <h6>Secure Payment</h6>
                                <p>Safe & flexible payments</p>
                            </div>
                        </div>

                        <div className="col-md-3 col-6">
                            <div className="feature-card">
                                <img src={require('./Routs/img/24-hours-support.png')} alt="" />
                                <h6>24/7 Support</h6>
                                <p>Always here to help you</p>
                            </div>
                        </div>

                    </div>

                </div>

                <hr />
            </section>
        </>
    );
}

export default Quotes;