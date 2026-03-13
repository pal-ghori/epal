import 'bootstrap/dist/css/bootstrap.min.css';

let Blog = () => {
    return (
        <>
            <section>
                <div className="container p-3">
                    <div className="blog-text">
                        <p className="text-center">FROM THE BLOG</p>
                        <h1 className="text-center">Check Out Our <br />
                            Latest Posts</h1>
                    </div>
                    <div className="row d-flex justify-content-between">
                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 first-cardd">
                            <div className='card-1'>
                                <div className='card-1img'>
                                    <img src={require('./Routs/img/blog-1.jpg')} alt="" className='' />
                                </div>
                                <p className='my-2'>OCTOBER 24, 2023 | FASHION, LIFESTYLE</p>
                                <h3>The Perfect Guide To Pick Your Perfect Duffle 2024!</h3>
                                <p>Summer is here, the season of road trips, redeyes, and getaways is upon us. Add in regularly like your Tuesday cycling class and a duffle…</p>
                                <a href='f' className='more'>READ MORE</a>
                            </div>
                        </div>
                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 first-cardd">
                            <div className='card-1'>
                                <div className='card-1img'>
                                    <img src={require('./Routs/img/blog-2.jpg')} alt="" className='' />
                                </div>
                                <p className='my-2'>OCTOBER 24, 2023 | DENIUM, INDUSTRY</p>
                                <h3>Products With Purpose: What is clean denim...</h3>
                                <p>We've come up with a few tips, in the form of a practical care guide, to increase your products' lifespan while keeping things like energy…</p>
                                <a href='f' className='more'>READ MORE</a>
                            </div>
                        </div>
                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 first-cardd">
                            <div className='card-1'>
                                <div className='card-1img'>
                                    <img src={require('./Routs/img/blog-3.jpg')} alt="" className='' />
                                </div>
                                <p className='my-2'>OCTOBER 24, 2023 | GOLD, STYLE</p>
                                <h3>Gold Seal of Sustainability: GOTS, Finally Explained!</h3>
                                <p>One of the reasons why sustainable brands tend to have higher prices than what's considered the average it's because the product's price reflects its</p>
                                <a href='f' className='more'>READ MORE</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Blog;