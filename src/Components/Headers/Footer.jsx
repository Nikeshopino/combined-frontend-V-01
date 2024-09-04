import { AiOutlineSend } from "react-icons/ai";
import { RiFacebookBoxLine } from "react-icons/ri";
import { TbBrandYoutube } from "react-icons/tb";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { CiTwitter } from "react-icons/ci";
import yoursay from "../../Assets/Logo.png";

const Footer = () => {
  return (
    <footer className="bg-[#272727] text-white pt-8 pb-6 px-4 lg:px-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start md:items-center space-y-6 md:space-y-0">
        {/* Logo and Description */}
        <div className="md:w-1/3">
          <div className="flex items-center mb-4">
            <img src={yoursay} alt="YouSay Logo" className="h-10" />
          </div>
          <p className="text-lg leading-relaxed">
            Welcome to YouSay, the platform where your opinions take center stage.
            Here, every 'yes' or 'no' is more than just a choice—it's an opportunity
            to win real rewards.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="md:w-1/3">
          <h3 className="text-[#FD853A] font-semibold text-lg mb-4">Navigation</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-orange-500">Home</a></li>
            <li><a href="#" className="hover:text-orange-500">About Us</a></li>
            <li><a href="#" className="hover:text-orange-500">Service</a></li>
            <li><a href="#" className="hover:text-orange-500">Term & Condition</a></li>
            <li><a href="#" className="hover:text-orange-500">Contact Us</a></li>
          </ul>
        </div>

        {/* Contact and Social Icons */}
        <div className="md:w-1/3">
          <h3 className="text-[#FD853A] font-semibold text-lg mb-4">Contact</h3>
          <p className="mb-2">+91 8826737982</p>
          <p className="mb-2">asargamingnetwork.com</p>
          <p>YourSaySupport.com</p>
          <div className="flex space-x-3 mt-4">
            <a href="#"><RiFacebookBoxLine className="w-6 h-6 hover:text-orange-500" /></a>
            <a href="#"><TbBrandYoutube className="w-6 h-6 hover:text-orange-500" /></a>
            <a href="#"><FaWhatsapp className="w-6 h-6 hover:text-orange-500" /></a>
            <a href="#"><FaInstagram className="w-6 h-6 hover:text-orange-500" /></a>
            <a href="#"><CiTwitter className="w-6 h-6 hover:text-orange-500" /></a>
          </div>
        </div>
      </div>

      {/* Newsletter and Copyright */}
      <div className="border-t border-gray-600 mt-8 pt-6">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col md:flex-row items-center md:space-x-4">
            <input
              type="email"
              placeholder="Email Address"
              className="bg-white text-black p-2 rounded-l-md focus:outline-none"
            />
            <button className="bg-orange-500 p-2 rounded-r-md flex items-center justify-center">
              <AiOutlineSend />
            </button>
          </div>
          <p className="text-center md:text-left mt-4 md:mt-0 text-sm">
            Copyright© 2024 YourSay All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
