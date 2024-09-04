import React, { useState } from 'react';
import { FaBell, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { Switch } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';
import  cricketImg from '../Assets/cricket.png'
import  footballImg from '../Assets/football.png'
import  newsImg from '../Assets/news-report.png'
import RaceImg from "../Assets/race.png"
import YoutubeImg from "../Assets/youtube.png"

function MobileHeader({isLive,setIsLive}) {
  const [selectedCategory, setSelectedCategory] = useState('');
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const categories = [
    { name: 'Football', icon: footballImg, path: 'Football' },
    { name: 'Cricket', icon: cricketImg, path: 'Cricket' },
    { name: 'Current-Affairs', icon: newsImg, path: 'CurrentAffair' },
    { name: 'Youtube', icon: YoutubeImg, path: 'Youtube' },
    { name: 'F1-Racing', icon: RaceImg, path: 'F1%20Racing' },
  ];


  const handleSelect = (category) => {
    setSelectedCategory(category.name);
    setIsDropdownOpen(false);
    navigate(`mobile/category/${category.path}`);
  };

  return (
    <div className="flex items-center justify-between bg-white px-4 py-4 shadow-sm font-montserrat">
      {/* Category Dropdown */}
      <div className="relative">
        <div
          className="border border-[#144CC7] rounded-md flex items-center px-3 py-2 cursor-pointer"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <span className="text-[#144CC7] text-sm">
            {selectedCategory ? (
              <>
                {categories.find((cat) => cat.name === selectedCategory).icon}{' '}
                {selectedCategory}
              </>
            ) : (
              'Category'
            )}
          </span>
          {isDropdownOpen ? (
            <FaChevronUp className="ml-2 text-[#144CC7]" />
          ) : (
            <FaChevronDown className="ml-2 text-[#144CC7]" />
          )}
        </div>
        {isDropdownOpen && (
          <ul className="absolute left-[-1rem] mt-1 w-40 bg-white p-2 rounded-md shadow-lg z-10">
            {categories.map((category, index) => (
              <li
                key={index}
                className="flex items-center px-4 py-2 mb-2 cursor-pointer border font-montserrat font-bold border-gray-300  transition duration-150 ease-in-out rounded-2xl shadow-md"
                onClick={() => handleSelect(category)}
              >
                {/* <span className="mr-4 text-blue-500">{category.icon}</span> */}
                <img src={category.icon} alt={category.name} className="mr-4 w-8 h-8" />
                <span className='font-montserrat text-xs text-[#272727] font-semibold'>{category.name}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Live Toggle and Bell Icon */}
      <div className="flex items-center space-x-4">
        {/* Live Toggle */}
        <div className="flex items-center space-x-2">
          <Switch
            checked={isLive}
            onChange={setIsLive}
            className={`${
              isLive ? 'bg-[#144CC7]' : 'bg-gray-500'
            } relative inline-flex h-6 w-11 items-center rounded-full`}
          >
            <span
              className={`${
                isLive ? 'translate-x-6' : 'translate-x-1'
              } inline-block h-4 w-4 transform bg-white rounded-full transition-transform`}
            />
          </Switch>
          <span className="text-sm text-[#144CC7] font-bold font-montserrat tracking-widest">Live</span>
        </div>

        {/* Bell Icon */}
        <FaBell className="text-xl cursor-pointer text-[#144CC7]" />
      </div>
    </div>
  );
}

export default MobileHeader;
