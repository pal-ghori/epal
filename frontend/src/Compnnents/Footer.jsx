import 'bootstrap/dist/css/bootstrap.min.css';

let Footer = () => {
    return (
        <>
            <section className='footer'>
                <div className="container">
                    <div className="row">
                        <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-12 footer-text">
                            <h4>About Our Store</h4>
                            <p>Our values in epal are upheld within high quality tailoring, fabric insight and innovative design alongside the desire for innovative and the natural beauty with versatility and top of mind allowing for the investment pieces.</p>
                            <img src={require('./Routs/img/asset 39.png')} alt="" />
                        </div>
                        <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-12 footer-text">
                            <h3>Shop</h3>
                            <ul>
                                <li><a href="/Shop">DRESSES</a></li>
                                <li><a href="/Shop">T-SHIRTS</a></li>
                                <li><a href="/Shop">BLOUSES</a></li>
                                <li><a href="/Shop">OUTERWEAR</a></li>
                                <li><a href="/Shop">ACCESSORIES</a></li>
                                <li><a href="/Shop">KNITWEAR</a></li>
                                <li><a href="/Shop">PANTS</a></li>
                            </ul>
                        </div>
                        <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-12 footer-text">
                            <h3>Links</h3>
                            <ul>
                                <li><a href="/About">ABOUT US</a></li>
                                <li><a href="/Contact">STORE LOCATIONS</a></li>
                                {/* <li><a href="c">SHIPPING & RETURNS</a></li> */}
                                {/* <li><a href="c">SUSTAINABILITY</a></li> */}
                                <li><a href="/About">HELP & FAQS</a></li>
                                <li><a href="/Contact">CONTACTS</a></li>
                            </ul>
                        </div>
                        <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-12 footer-text">
                            <h3>Help</h3>
                            <ul>
                                <li><a href="">PRIVACY POLICY</a></li>
                                <li><a href="">REFUND POLICY</a></li>
                                <li><a href="">ORDER STATUS</a></li>
                                <li><a href="">GIFT CARDS</a></li>
                                <li><a href="">SIZE GUIDE</a></li>
                            </ul>
                        </div>
                    </div>
                    <hr className='horizontal-border' />
                    <div className="row">
                        <div className='col-xxl-6 col-xl-6 col-lg-6 col-md-12 col-12 footer-end'>
                            <p className='text-start'>United States (USD $)</p>
                        </div>
                        <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-12 col-12 footer-end">
                            <p className='text-end'>©2024 epal, All Rights Reserved. With Love by CMSSuperHeroes</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Footer;