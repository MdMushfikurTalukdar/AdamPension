import React from "react";
import Navbar from "../components/Navbar";
import Rooms from "../components/Room";
import Footer from "../components/Footer";
import Banner from "../components/Banner";

const Home = () => {
    return (
        <div>
            <Navbar />
            <main>
                <Banner/>
                <Rooms />
            </main>
            <Footer />
        </div>
    );
};

export default Home;
