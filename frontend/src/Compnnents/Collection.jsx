import 'bootstrap/dist/css/bootstrap.min.css';

let Collection = () => {
    return (
        <>
            <section className='Collection pt-4 pb-5'>
                <div className="container">
                    <div className="row">
                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 d-flex justify-content-center my-2 first-img">
                            <img className='bg-img' src={require('./Routs/img/pro-cat-dresse.webp')} height={'100%'} width={'100%'} alt="" />
                            <div className='overlay'>
                                <p>Dresses</p>
                                <h6>VIWE CLLECTION</h6>
                            </div>
                        </div>
                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 d-flex justify-content-center my-2 first-img">
                            <img className='bg-img' src={require('./Routs/img/pro-cat-t-shirt.jpg')} height={'100%'} width={'100%'} alt="" />
                            <div className='overlay'>
                                <p>T-shirts</p>
                                <h6>VIWE CLLECTION</h6>
                            </div>
                        </div>
                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 d-flex justify-content-center my-2 first-img">
                            <img className='bg-img' src={require('./Routs/img/pro-cat-t-outerwear.jpg')} height={'100%'} width={'100%'} alt="" />
                            <div className='overlay'>
                                <p>Outerwear</p>
                                <h6>VIWE CLLECTION</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Collection;