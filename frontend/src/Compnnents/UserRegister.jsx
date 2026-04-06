import axios from "axios";
import { useState } from "react";
import { CloseButton } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";

const UserRegister = () => {
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstName] = useState('');
    const [LastName, setLastName] = useState('');
    const navigate = useNavigate();


    const signIn = (e) => {
        e.preventDefault();
            axios.post(`http://localhost:5000/users/sign-up`, {
            email: email,
            number: number,
            password: password,
            firstName: firstname,
            lastName: LastName,
        })
            .then(function (response) {
                console.log(response);
                if (response.status === 200) {
                    console.log(response.data.status);
                    // sessionStorage.setItem("isLogged", true);
                    toast.success(response.data.message, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                    });
                    navigate('/')
                } else {
                    sessionStorage.setItem("isLogged", false);                    
                    toast.error(response.data.message, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                    });
                }
            })
            .catch(function (error) {
    console.log(error.response); // IMPORTANT
    alert(error.response?.data?.message || "Something went wrong");
})
    }

    const navigateToHome = () => {
        navigate('/')
    }

    const Login = () => {
        navigate('/UserLogin')
    }
    return (
        // <>
        //     <ToastContainer />
        //     <div className="bg-color">
        //         <div className="pop-up">
        //             <div className="close-button" onClick={() => { navigateToHome() }}>
        //                 <CloseButton />
        //             </div>
        //             <form>
        //                 <h2 className="login-tag">Register</h2>
        //                 <div className="input-group">
        //                     <input type="email" id="email" className="form-control" placeholder="Email" autoComplete="off"
        //                         onChange={(e) => { setEmail(e.target.value) }} />
        //                 </div>
        //                 <div className="input-group">
        //                     <input type="text" id="mobilenumber" className="form-control" placeholder="Mobile Number"
        //                         onChange={(e) => { setNumber(e.target.value) }} />
        //                 </div>
        //                 <div className="input-group">
        //                     <input type="password" id="password" className="form-control" placeholder="Password"
        //                         onChange={(e) => { setPassword(e.target.value) }} />
        //                 </div>
        //                 <div className="input-group">
        //                     <input type="text" id="firstname" className="form-control" placeholder="First Name"
        //                         onChange={(e) => { setFirstName(e.target.value) }} />
        //                 </div>
        //                 <div className="input-group">
        //                     <input type="text" id="lastname" className="form-control" placeholder="Last Name"
        //                         onChange={(e) => { setLastName(e.target.value) }} />
        //                 </div>
        //                 <div className="input-group mt-5">
        //                     <button onClick={signIn}>Sign-in</button>
        //                 </div>
        //                 <div>
        //                 <p onClick={Login} style={{cursor : "pointer",color : "Black"}}>Already Have Account?</p>
        //                 </div>
        //             </form>
        //         </div>
        //     </div>
        // </>

        <>
  <ToastContainer />

  <div className="login-page">

    <div className="login-card">

      <div className="close-btn" onClick={navigateToHome}>
        <CloseButton />
      </div>

      <form onSubmit={signIn}>

        <h2>Create Account ✨</h2>
        <p className="sub-text">Join us today</p>

        <div className="form-group">
          <input type="text" placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)} />
        </div>

        <div className="form-group">
          <input type="text" placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)} />
        </div>

        <div className="form-group">
          <input type="email" placeholder="Email"
            onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="form-group">
          <input type="text" placeholder="Mobile Number"
            onChange={(e) => setNumber(e.target.value)} />
        </div>

        <div className="form-group">
          <input type="password" placeholder="Password"
            onChange={(e) => setPassword(e.target.value)} />
        </div>

        <button type="submit" className="login-btn">
          Register
        </button>

        <p className="switch-text">
          Already have an account?{" "}
          <span onClick={Login}>Login</span>
        </p>

      </form>

    </div>

  </div>
</>
    )
}

export default UserRegister;