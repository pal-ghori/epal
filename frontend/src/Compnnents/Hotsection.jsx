// let Hotsection = (props) => {
//     return (
//         <>
//                 <div className="all-card col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12">
//                     <div className="one-card pb-5">
//                         <img src={props.img} alt="" />
//                         <div className="card-info text-center">
//                             <h3>{props.title}</h3>
//                             <p>{props.price}</p>
//                         </div>
//                     </div>
//                 </div>
//         </>
//     );
// }


// export default Hotsection;

import { Link } from "react-router-dom";

let Hotsection = (props) => {
    return (
        <>
            <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                <div className="product-card">

                    <Link to={`/SingleProduct/${props.id}`}>
                        <div className="product-img">
                            <img src={props.img} alt={props.title} />
                        </div>

                        <div className="product-info text-center">
                            <h5>{props.title}</h5>
                            <p>₹ {props.price}</p>
                        </div>
                    </Link>

                </div>
            </div>
        </>
    );
}

export default Hotsection;