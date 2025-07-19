import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import HomePage from "./Pages/HomePage";
import LandingPage from "./Pages/LandingPage";
import LoginAuth from "./Security/loginAuth";
import SigninAuth from "./Security/signinAuth";
import axios from "axios"
import DashBoard from "./Pages/DashBoard";
import About from "./Pages/About";
import Contact from "./Pages/Contact";

axios.defaults.baseURL = "http://localhost:8000/api/"

const App = () => {
  return (
    <BrowserRouter>
      <Routes >
        <Route path="/" element={<HomePage />} >
          <Route index element={<LandingPage />} />
          <Route path="login/:userType" element={<LoginAuth />} />
          <Route path="signin/:userType" element={<SigninAuth />} />
          <Route path="dashboard" element={<DashBoard />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
        </Route >

      </Routes>
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App;