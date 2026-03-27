import 'bootstrap/dist/css/bootstrap.min.css';

let Subscribe = () => {
    return (
        <>
            <section className='subscribe'>
                <div className="container">
                    <div className="row d-flex align-items-center">
                        <div className="col-xxl-4">
                            <div className='text-center contact-text'>
                                <h3>Contact Us</h3>
                                <p>Email : chani@cmssuperheroes.com</p>
                                <p>Phone : 02 01061245741</p>
                            </div>
                        </div>
                        <div className="col-xxl-4">
                            <div className='text-center contact-text'>
                                <h1>Subscribe To Our Newsletter</h1>
                                <form action="">
                                    <input type="text" placeholder='Your Email Address' /> 
                                    <button>SUBSCRIBE</button>
                                    <p>By subscribing, you accept the Privacy Policy</p>
                                </form>
                            </div>
                        </div> 
                        <div className="col-xxl-4">
                            <div className='text-center contact-text'>
                                <h3>Our store</h3>
                                <p>2307 Beverley Rd Brooklyn, New York <br /> 11226 United States.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Subscribe;