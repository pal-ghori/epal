import { FaFacebook, FaInstagram, FaTiktok, FaTwitter } from "react-icons/fa";

const Contactus = () => {
    return (
        <>
            <div className="container">
                <div className="row pt-5 pb-5">
                    <div className="info-text col-xxl-4 col-xl-4 col-lg-4 col-md-4">
                        <div className="my-4 para">
                            <h5>Contact Info</h5>
                            <p>Email Us: chani@cmssuperheroes.com</p>
                            <p>Call Us: 002 0198745701</p>
                        </div>
                        <div className="my-4 para">
                            <h5>Address</h5>
                            <p>2307 Beverley Rd Brooklyn, New York </p>
                            <p> 11226 United States.</p>
                        </div>
                        <div className="my-4 para">
                            <h5>Support Hours</h5>
                            <p>Mon-Fri  9:00am - 5:00pm PST</p>
                            <p className="text-danger">*Excludes Holidays"</p>
                        </div>
                        <div className="my-4">
                            <h5>Social Media</h5>
                            <div>
                            <FaFacebook className="contact-icon"/>
                            <FaInstagram className="contact-icon"/>
                            <FaTiktok className="contact-icon"/>
                            <FaTwitter className="contact-icon"/>
                            </div>
                        </div>
                    </div>
                    <div className="col-xxl-8 col-xl-8 col-lg-8 col-md-8">
                        <form action="">
                            <h1>How can we help?</h1>
                            <p>Let us know your questions, thoughts and ideas via the form below. Our support team will get back to you as soon as possible.</p>
                            <div className="d-flex mb-3">
                                <input type="text" placeholder="Name" />
                                <input type="text" placeholder="Email" />
                            </div>
                            <div className="d-flex mb-3">
                                <input type="text" placeholder="Phone" />
                                <input type="text" placeholder="Order Number" />
                            </div>
                            <div>
                                <textarea name="Your Message"  cols="100%" rows="7" placeholder="Your Message"></textarea>
                            </div>
                                <div className="Contact_us_button">
                                    <button>SUBMIT</button>
                                </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Contactus;