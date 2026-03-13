let Hotsection = (props) => {
    return (
        <>
                <div className="all-card col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12">
                    <div className="one-card pb-5">
                        <img src={props.img} alt="" />
                        <div className="card-info text-center">
                            <h3>{props.title}</h3>
                            <p>{props.price}</p>
                        </div>
                    </div>
                </div>
        </>
    );
}


export default Hotsection;