import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './components/Signup';
import SignIn from './components/Signin';
import MasterPage from "./components/Masterpage";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import Contactus from "./components/contactus";
import Cart from "./components/cart";
import Home from "./components/home";
import Testimonial from "./components/Testimonial";
import Admin_Sidebar from "./components/Admin_sidebar";
import Admin_add_product from "./components/Admin_add_product";

import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
        <Routes>
          {/* Define your routes here */}
          <Route path="/" element={<SignIn />} />
          <Route path="Signup" element={<SignUp />} />
          <Route path="forgotpassword" element={<ForgotPassword />} />
          <Route path="resetpassword" element={<ResetPassword />} />
          <Route path="Contactus" element={<Contactus />} />
          <Route path="Admin_add_product" element={<Admin_add_product />} />
          <Route path="Cart" element={<Cart />} />

        {/* Routes that require admin sidebar */}

          <Route path="Admin_Sidebar" element={<Admin_Sidebar />}>
         

          {/* Add more admin routes here */}


        <Route path="/" element={<MasterPage />}>
          <Route path="Home" element={<Home />} />
          <Route path="products" element={<products />} />
          <Route path="Testimonial" element={<Testimonial />} />
        </Route>

          
        </Route>

        </Routes>
    </Router>

    
  );
}

export default App;
