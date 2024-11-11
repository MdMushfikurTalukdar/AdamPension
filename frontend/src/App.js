import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Home from "./pages/Home.js";
import Room from "./pages/RoomBook.js";


function App() {
  return (
    <>
        <Router>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/room-book" element={<Room/>} />
            
          </Routes>
        </Router>

    </>
  );
}

export default App;