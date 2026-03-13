import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Compnnents/Routs/Home';
import Shop from './Compnnents/Routs/Shop';
import Contact from './Compnnents/Routs/Contact';
import About from './Compnnents/Routs/About';
import UserRegister from './Compnnents/UserRegister';
import UserLogin from './Compnnents/UserLogin';
import SingleProduct from './Compnnents/SingleProduct';
import AddToCart from './Compnnents/AddToCart';
import CheckOut from './Compnnents/CheckOut';
import VerifyUserData from './Compnnents/VerifyUserData';
import OrderSuccess from './Compnnents/OrderSuccess';


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/UserLogin" element={<UserLogin />} />
        <Route path="/Shop" element={<Shop />} />
        <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/UserRegister" element={<UserRegister />} />
        <Route path="/userLogin/UserRegister" element={<UserRegister />} />
        <Route path="/SingleProduct/:id" element={<SingleProduct /> }/>
        <Route path="/AddToCart" element={<AddToCart />} />
        <Route path="/CheckOut" element={<CheckOut />}/>
        <Route path="/VerifyUserData" element={<VerifyUserData />}/>
        <Route path="/OrderSuccess" element={<OrderSuccess />}/>
      </Routes>
    </>
  );
}

export default App;
