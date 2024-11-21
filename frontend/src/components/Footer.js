import React from "react";
import { FaWhatsapp, FaYoutube } from "react-icons/fa";
import { IoLocationSharp, IoTimeOutline } from "react-icons/io5";
import { MdLocalPhone, MdOutlineMailOutline } from "react-icons/md";


const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className="bg-primary-dark py-12 px-6">
  <div className="max-w-screen-xl mx-auto grid lg:grid-cols-3 justify-center gap-x-12 space-y-5 lg:space-y-0">
    <div className="flex flex-col gap-10 max-w-md">
      <h1 className="text-primary text-2xl font-semibold">
      Die Unterkunft
      </h1>
      <p className="leading-7 text-white text-justify -mt-5">
      Das Zimmer befindet sich in einer ruhigen Lage in Chemnitz. Verkehrsanbindung ist sowohl mit öffentlichen Verkehrsmitteln möglich als auch schnell mit dem Auto in die Stadt. Parkmöglichkeit ist kostenlos hier und stets frei vor der Unterkunft.
      </p>
      
    </div>
    
    <div className="space-y-4 text-center">
      {/* <h2 className="text-white text-2xl font-bold">Company</h2>
      <div className="space-y-1">
        <div className="grid gap-1">
          <Link
            to="/"
            className="text-[#E7E7E7] hover:text-white transition-all duration-300 font-sans"
          >
            Home
          </Link>
          <Link
            to="/services"
            className="text-[#E7E7E7] hover:text-white transition-all duration-300"
          >
            Services
          </Link>
          <Link
            to="/portfolio"
            className="text-[#E7E7E7] hover:text-white transition-all duration-300"
          >
            Portfolio
          </Link>
          <Link
            to="/contact"
            className="text-[#E7E7E7] hover:text-white transition-all duration-300"
          >
            Contact Us
          </Link>
        </div>
      </div> */}
    </div>

    <div className="space-y-6">
      <h2 className="text-white text-2xl font-bold">Contacts</h2>
      <div className="space-y-1">
        <div className="flex items-center gap-3">
          <IoLocationSharp className="text-primary" size={20} />
          <span className="text-[#E7E7E7]">Casparistraße 1, 09126 Chemnitz</span>
        </div>
        <div className="flex items-center gap-3">
          <IoTimeOutline className="text-primary" size={20} />
          <span className="text-[#E7E7E7]">
          Check-in: 24/7 

          </span>
        </div>
        <div className="flex items-center gap-3">
          <MdOutlineMailOutline className="text-primary" size={20} />
          <span className="text-[#E7E7E7]">adam.david@web.de
          </span>
        </div>
        <div className="flex items-center gap-3">
          <MdLocalPhone className="text-primary" size={20} />
          <span className="text-[#E7E7E7]">+49 17663265933 Here .</span>
        </div>
      </div>
      


      <div className="flex gap-5 -mt-5">
        <a
          href="https://wa.me/+8801731177283"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-full cursor-pointer bg-white group hover:bg-primary transition-all duration-300"
        >
          <FaWhatsapp className="text-black group-hover:text-white transition-all duration-300" />
        </a>
        <a
          href="https://www.youtube.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-full cursor-pointer bg-white group hover:bg-primary transition-all duration-300"
        >
          <FaYoutube className="text-black group-hover:text-white transition-all duration-300" />
        </a>
      </div>
    </div>
    
  </div>
  <hr className="max-w-screen-xl mx-auto mt-5" />
  <div className="mt-6 space-y-2">
    <p className="text-center text-[#E7E7E7]">
      © {year} Adam’s Pension. All rights reserved.
    </p>
    <p className="text-center text-[#E7E7E7]">
      Developed by{" "}
      <a
        href="https://www.linkedin.com/in/mdyasirarafat030/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary"
      >
        Md Yasir Arafat
      </a>
    </p>
  </div>
</div>

  );
};

export default Footer;
