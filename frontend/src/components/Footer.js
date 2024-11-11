import React from "react";
import { FaFacebook, FaLinkedin, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { IoLocationSharp, IoTimeOutline } from "react-icons/io5";
import { MdLocalPhone, MdOutlineMailOutline } from "react-icons/md";
import { Link } from "react-router-dom"; // Import from React Router for navigation

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className="bg-primary-dark py-12 px-6">
      <div className="max-w-screen-xl mx-auto grid lg:grid-cols-5 justify-between space-y-5 lg:space-y-0">
        <div className="flex flex-col gap-10 lg:col-span-2 max-w-md">
          <h1 className="text-primary text-2xl font-semibold">
            Adam’s Mansion
          </h1>
          <p className="leading-7 text-white text-justify -mt-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque at
            tenetur nobis, consequuntur quibusdam beatae id! Recusandae aut quam
            quas.
          </p>
          <div className="flex gap-3 -mt-5">
            <a
              href="https://www.linkedin.com/company/electrosys-engineering/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full cursor-pointer bg-white group hover:bg-primary transition-all duration-300"
            >
              <FaLinkedin className="text-black group-hover:text-white transition-all duration-300" />
            </a>
            <a
              href="https://wa.me/+8801731177283"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full cursor-pointer bg-white group hover:bg-primary transition-all duration-300"
            >
              <FaWhatsapp className="text-black group-hover:text-white transition-all duration-300" />
            </a>
            <a
              href="https://www.facebook.com/people/ElectroSys-Engineering/61560350367695/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full cursor-pointer bg-white group hover:bg-primary transition-all duration-300"
            >
              <FaFacebook className="text-black group-hover:text-white transition-all duration-300" />
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
        <div className="space-y-6">
          <h2 className="text-white text-2xl font-bold">Company</h2>
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
          </div>
        </div>
        {/* <div className="space-y-5">
          <h2 className="text-white text-2xl font-bold">Quick Links</h2>
          <div className="space-y-1">
            <div className="grid gap-1">
              <Link
                to="/privacy-policy"
                className="text-[#E7E7E7] hover:text-white transition-all duration-300"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms-conditions"
                className="text-[#E7E7E7] hover:text-white transition-all duration-300"
              >
                Terms & Conditions
              </Link>
              <Link
                to="/contact"
                className="text-[#E7E7E7] hover:text-white transition-all duration-300"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div> */}
        <div className="space-y-6">
          <h2 className="text-white text-2xl font-bold">Contacts</h2>
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <IoLocationSharp className="text-primary" size={20} />
              <span className="text-[#E7E7E7]">Mirpur DOHS, Dhaka-1216</span>
            </div>
            <div className="flex items-center gap-3">
              <IoTimeOutline className="text-primary" size={20} />
              <span className="text-[#E7E7E7]">
                Mon - Fri: 09:00 am - 05:00 pm
              </span>
            </div>
            <div className="flex items-center gap-3">
              <MdOutlineMailOutline className="text-primary" size={20} />
              <span className="text-[#E7E7E7]">info@adams.com</span>
            </div>
            <div className="flex items-center gap-3">
              <MdLocalPhone className="text-primary" size={20} />
              <span className="text-[#E7E7E7]">(+88) 01318-411864</span>
            </div>
          </div>
        </div>
      </div>
      <hr className="max-w-screen-xl mx-auto mt-5" />
      <div className="mt-6 space-y-2">
        <p className="text-center text-[#E7E7E7]">
          © {year} Adam’s Mansion. All rights reserved.
        </p>
        <p className="text-center text-[#E7E7E7]">
          Developed by{" "}
          <a
            href="https://www.linkedin.com/in/jisan027/"
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
