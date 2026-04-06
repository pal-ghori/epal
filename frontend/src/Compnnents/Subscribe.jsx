// import 'bootstrap/dist/css/bootstrap.min.css';

// let Subscribe = () => {
//     return (
//         <>
//             <section className='subscribe'>
//                 <div className="container">
//                     <div className="row d-flex align-items-center">
//                         <div className="col-xxl-4">
//                             <div className='text-center contact-text'>
//                                 <h3>Contact Us</h3>
//                                 <p>Email : chani@cmssuperheroes.com</p>
//                                 <p>Phone : 02 01061245741</p>
//                             </div>
//                         </div>
//                         <div className="col-xxl-4">
//                             <div className='text-center contact-text'>
//                                 <h1>Subscribe To Our Newsletter</h1>
//                                 <form action="">
//                                     <input type="text" placeholder='Your Email Address' /> 
//                                     <button>SUBSCRIBE</button>
//                                     <p>By subscribing, you accept the Privacy Policy</p>
//                                 </form>
//                             </div>
//                         </div> 
//                         <div className="col-xxl-4">
//                             <div className='text-center contact-text'>
//                                 <h3>Our store</h3>
//                                 <p>2307 Beverley Rd Brooklyn, New York <br /> 11226 United States.</p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//         </>
//     );
// }

// export default Subscribe;

import 'bootstrap/dist/css/bootstrap.min.css';

let Subscribe = () => {
    return (
        <>
            <section className='subscribe-section'>
                <div className="container">

                    <div className="row g-4 align-items-center">

                        {/* CONTACT */}
                        <div className="col-lg-4 col-md-6">
                            <div className='info-card text-center'>
                                <h5>Contact Us</h5>
                                <p>Email: chani@cmssuperheroes.com</p>
                                <p>Phone: +91 98765 43210</p>
                            </div>
                        </div>

                        {/* SUBSCRIBE */}
                        <div className="col-lg-4 col-md-12">
                            <div className='subscribe-card text-center'>
                                <h4>Subscribe Newsletter</h4>

                                <form className="subscribe-form">
                                    <input type="email" placeholder='Enter your email' />
                                    <button type="submit">Subscribe</button>
                                </form>

                                <small>We respect your privacy</small>
                            </div>
                        </div>

                        {/* STORE */}
                        <div className="col-lg-4 col-md-6">
                            <div className='info-card text-center'>
                                <h5>Our Store</h5>
                                <p>Ahmedabad, Gujarat</p>
                                <p>India</p>
                            </div>
                        </div>

                    </div>

                </div>
            </section>
        </>
    );
}

export default Subscribe;