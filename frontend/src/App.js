import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Home from "./pages/Home.js";
import Room from "./pages/RoomBook.js";
import SignUp from "./pages/SignUpForm.js";
import AdminPanel from "./pages/AdminPanel.js";
import EmailForm from "./pages/EmailForm.js";
import AboutUs from "./pages/AboutUs.js";
import ContactUs from "./pages/ContactUs.js";
import CheckoutForm from "./pages/CheckoutForm.js";

// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";

// const stripePromise = loadStripe("your-publishable-key-here");

function App() {
  return (
    <>
        <Router>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/room-book" element={<Room/>} />
            <Route path="/sign" element={<SignUp/>} />
            <Route path="/admin" element={<AdminPanel/>} />
            <Route path="/email" element={<EmailForm/>} />
            <Route path="/about" element={<AboutUs/>} />
            <Route path="/contact" element={<ContactUs/>} />
            {/* <Elements stripe={stripePromise}>
              <Route path="/check" element={<CheckoutForm/>} />
            </Elements> */}

            
          </Routes>
        </Router>

    </>
  );
}

export default App;

