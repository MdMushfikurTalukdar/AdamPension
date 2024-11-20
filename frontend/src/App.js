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
import Try from "./pages/Try.js";
import EmailForm from "./pages/EmailForm.js";


function App() {
  return (
    <>
        <Router>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/room-book" element={<Room/>} />
            <Route path="/sign" element={<SignUp/>} />
            <Route path="/admin" element={<AdminPanel/>} />
            <Route path="/try" element={<Try/>} />
            <Route path="/email" element={<EmailForm/>} />
            
          </Routes>
        </Router>

    </>
  );
}

export default App;

