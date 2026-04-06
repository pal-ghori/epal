// import Carousel from 'react-bootstrap/Carousel';

// function Block() {
//     return (
//         <Carousel className='block-body text-center mt-5 mb-5'>
//             <Carousel.Item className='CarouselItem'>
//                 <p>You can never take too much care over the choice of your shoes. Too many women think they are unimportant, but the real proof of an elegant woman is what is on her feet.</p>
//                 <div className='CarouselItem-heading'>
//                     <p>- Christian Dior</p>
//                 </div>
//             </Carousel.Item>
//             <Carousel.Item className='CarouselItem'>
//                 <p>Love it! It's knitted from extra fine mulesing free Merino wool and really has kept its shape over time. Can't wait to buy some more colours and new awesome styles!</p>
//                 <div className='CarouselItem-heading'>
//                     <p>- Lola Dark</p>
//                 </div>
//             </Carousel.Item>
//         </Carousel>
//     );
// }

// export default Block;

import Carousel from 'react-bootstrap/Carousel';

function Block() {
    return (
        <div className="testimonial-section">
            <div className="container">

                <div className="text-center mb-4">
                    <p className="small-text">TESTIMONIALS</p>
                    <h2 className="main-title">What People Say</h2>
                </div>

                <Carousel indicators={false} interval={3000}>

                    <Carousel.Item>
                        <div className="testimonial-card">
                            <p className="quote">
                                “You can never take too much care over the choice of your shoes.
                                Too many women think they are unimportant, but the real proof
                                of an elegant woman is what is on her feet.”
                            </p>
                            <h6>- Christian Dior</h6>
                        </div>
                    </Carousel.Item>

                    <Carousel.Item>
                        <div className="testimonial-card">
                            <p className="quote">
                                “Love it! It's knitted from extra fine Merino wool and really
                                has kept its shape over time. Can't wait to buy more styles!”
                            </p>
                            <h6>- Lola Dark</h6>
                        </div>
                    </Carousel.Item>

                </Carousel>
            </div>
        </div>
    );
}

export default Block;