import axios from "axios";
import { useState } from "react";
import { CloseButton } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const UserLogin = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const Login = (data) => {

    axios
      .post("http://localhost:5000/users/login", {
        email: data.email,
        password: data.password,
      })
      .then((response) => {

        if (response.data.status === 200) {

          sessionStorage.setItem("isLogged", true);
          sessionStorage.setItem("userId", response.data.data.userId);

          navigate("/");
        } else {

          sessionStorage.setItem("isLogged", false);
          alert("Invalid Email or Password");
        }

      })
      .catch((error) => {
        console.log(error);
      });
  };

  const Register = () => {
    navigate("./UserRegister");
  };

  const navigateToHome = () => {
    navigate("/");
  };

  return (
    // <div className="bg-color">
    //   <div className="pop-up">

    //     <div className="close-button" onClick={navigateToHome}>
    //       <CloseButton />
    //     </div>

    //     <form onSubmit={handleSubmit(Login)}>

    //       <h2 className="login-tag">Log In</h2>

    //       {/* EMAIL */}
    //       <div className="input-group">
    //         <input
    //           type="email"
    //           className="form-control"
    //           placeholder="Email"
    //           autoComplete="off"
    //           {...register("email", {
    //             required: "Email is required",
    //             pattern: {
    //               value: /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
    //               message: "Invalid email format",
    //             },
    //           })}
    //         />
    //       </div>

    //       {errors.email && (
    //         <span style={{ color: "red" }}>
    //           {errors.email.message}
    //         </span>
    //       )}

    //       {/* PASSWORD */}
    //       <div className="input-group mt-3">
    //         <input
    //           type="password"
    //           className="form-control"
    //           placeholder="Password"
    //           {...register("password", {
    //             required: "Password is required",
    //           })}
    //         />
    //       </div>

    //       {errors.password && (
    //         <span style={{ color: "red" }}>
    //           {errors.password.message}
    //         </span>
    //       )}

    //       {/* BUTTON */}
    //       <div className="input-group mt-4">
    //         <button type="submit">Log In</button>
    //       </div>

    //       <p
    //         onClick={Register}
    //         style={{ cursor: "pointer", color: "black", marginTop: "15px" }}
    //       >
    //         Register Now?
    //       </p>

    //     </form>
    //   </div>
    // </div>

    <div className="login-page">

  <div className="login-card">

    <div className="close-btn" onClick={navigateToHome}>
      <CloseButton />
    </div>

    <form onSubmit={handleSubmit(Login)}>

      <h2>Welcome Back 👋</h2>
      <p className="sub-text">Login to continue shopping</p>

      {/* EMAIL */}
      <div className="form-group">
        <input
          type="email"
          placeholder="Enter your email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
              message: "Invalid email format",
            },
          })}
        />
        {errors.email && <span>{errors.email.message}</span>}
      </div>

      {/* PASSWORD */}
      <div className="form-group">
        <input
          type="password"
          placeholder="Enter your password"
          {...register("password", {
            required: "Password is required",
          })}
        />
        {errors.password && <span>{errors.password.message}</span>}
      </div>

      {/* BUTTON */}
      <button type="submit" className="login-btn">
        Log In
      </button>

      <p className="switch-text">
        Don't have an account?{" "}
        <span onClick={Register}>Register</span>
      </p>

    </form>

  </div>

</div>
  );
};

export default UserLogin;