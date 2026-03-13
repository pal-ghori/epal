import 'bootstrap/dist/css/bootstrap.min.css';

let Quotes = () => {
    return (
        <>
            <section className="quotes">
                <div className="container full-card">
                    <div className="row ">
                        <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-12 col-12 quotes-img">
                            <img src={require('./Routs/img/quotes-1.webp')} alt="" height={'100%'} width={'80%'} />
                        </div>
                        <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-12 col-12 d-flex align-items-center">
                            <div className='quotes-text'>
                                <h6>DEFINING NEW FASHION</h6>
                                <h2>Fashionable, True Elegant& Looks So Good!</h2>
                                <p>Our products use finest materials and stunning design to create something special. Transformative colours, bold textiles and unique prints, natural fibres with high our quality craftsmanship design remains at forefront.</p>
                                <p>We believe in creating unique products, so we use finest materials and stunning design to create special items.</p>
                                <button>LEARN MORE</button>
                            </div>
                        </div>
                    </div>
                    <div className="row my-5">
                        <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-12 col-12 d-flex align-items-center">
                            <div className='quotes-text'>
                                <h6>EXPLORE OUR COLLECTIONS</h6>
                                <h2>Innovative, An Unobtrusive & Honest Beauty!</h2>
                                <p>Our values are upheld within high quality tailoring, fabric insight and innovative design alongside the desire for innovative and the natural beauty with versatility and top of mind allowing the investment pieces.</p>
                                <p>Our production lines are intentionally small with a focus on natural fabrications and unique seasonless design.</p>
                                <button>SHOP COLLECTION</button>
                            </div>
                        </div>
                        <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-12 col-12 quotes-img d-flex justify-content-end">
                            <img src={require('./Routs/img/quotes-2.webp')} alt="" height={'100%'} width={'80%'} />
                        </div>
                    </div>
                    <div className='vedio-page'>
                        <img src={require('./Routs/img/vedio.webp')} alt="" height={'100%'} width={'100%'} />
                    </div>
                    <div className="row my-5">
                        <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12 text-center free-shipping">
                            <img src={require('./Routs/img/free-delivery.png')} alt="" />
                            <h5>Free Shipping</h5>
                            <p>A free trackable two days delivery service on all orders over $90.</p>
                        </div>
                        <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12 text-center free-shipping">
                            <img src={require('./Routs/img/refund.png')} alt="" />
                            <h5>Money Back Guarantee</h5>
                            <p>We offer customers 100% money back guarantee on everything we sell.</p>
                        </div>
                        <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12 text-center free-shipping">
                            <img src={require('./Routs/img/payment.png')} alt="" />
                            <h5>Flexible Payment</h5>
                            <p>All orders placed before Sunday to Friday are dispatched same day.</p>
                        </div>
                        <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12 text-center free-shipping">
                            <img src={require('./Routs/img/24-hours-support.png')} alt="" />
                            <h5>Exchanges & Returns</h5>
                            <p>You have 30 days from the shipping date to return your purchase.</p>
                        </div>
                    </div>
                </div>
                <hr />
            </section>
        </>
    );
}

export default Quotes;