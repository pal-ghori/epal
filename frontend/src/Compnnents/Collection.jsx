// import 'bootstrap/dist/css/bootstrap.min.css';

// let Collection = () => {
//     return (
//         <>
//             <section className='Collection pt-4 pb-5'>
//                 <div className="container">
//                     <div className="row">
//                         <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 d-flex justify-content-center my-2 first-img">
//                             <img className='bg-img' src={require('./Routs/img/pro-cat-dresse.webp')} height={'100%'} width={'100%'} alt="" />
//                             <div className='overlay'>
//                                 <p>Dresses</p>
//                                 <h6>VIWE CLLECTION</h6>
//                             </div>
//                         </div>
//                         <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 d-flex justify-content-center my-2 first-img">
//                             <img className='bg-img' src={require('./Routs/img/pro-cat-t-shirt.jpg')} height={'100%'} width={'100%'} alt="" />
//                             <div className='overlay'>
//                                 <p>T-shirts</p>
//                                 <h6>VIWE CLLECTION</h6>
//                             </div>
//                         </div>
//                         <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 d-flex justify-content-center my-2 first-img">
//                             <img className='bg-img' src={require('./Routs/img/pro-cat-t-outerwear.jpg')} height={'100%'} width={'100%'} alt="" />
//                             <div className='overlay'>
//                                 <p>Outerwear</p>
//                                 <h6>VIWE CLLECTION</h6>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//         </>
//     );
// }

// export default Collection;

import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

let Collection = () => {
    return (
        <>
            <section className='collection-section py-5'>
                <div className="container">

                    <div className="text-center mb-4">
                        <p className="small-text">EXPLORE</p>
                        <h2 className="main-title">Our Collections</h2>
                    </div>

                    <div className="row g-4">

                        {/* CARD 1 */}
                        <div className="col-lg-4 col-md-6 col-12">
                            <Link to="/shop" className="collection-card">
                                <img src={require('./Routs/img/pro-cat-dresse.webp')} alt="Dresses" />
                                <div className="overlay">
                                    <h4>Dresses</h4>
                                    <span>View Collection →</span>
                                </div>
                            </Link>
                        </div>

                        {/* CARD 2 */}
                        <div className="col-lg-4 col-md-6 col-12">
                            <Link to="/shop" className="collection-card">
                                <img src={require('./Routs/img/pro-cat-t-shirt.jpg')} alt="T-shirts" />
                                <div className="overlay">
                                    <h4>T-Shirts</h4>
                                    <span>View Collection →</span>
                                </div>
                            </Link>
                        </div>

                        {/* CARD 3 */}
                        <div className="col-lg-4 col-md-6 col-12">
                            <Link to="/shop" className="collection-card">
                                <img src={require('./Routs/img/pro-cat-t-outerwear.jpg')} alt="Outerwear" />
                                <div className="overlay">
                                    <h4>Outerwear</h4>
                                    <span>View Collection →</span>
                                </div>
                            </Link>
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
}

export default Collection;