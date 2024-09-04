import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaBriefcase, FaWallet, FaUser } from 'react-icons/fa';
const MobileFooter = ({currentTab ="Home"}) => {
    
  const [activeTab, setActiveTab] = useState(currentTab);
  const navigate = useNavigate();
   
    
    const tabs = [
      { name: 'Home', icon: <FaHome /> },
      { name: 'Portfolio', icon: <FaBriefcase /> },
      { name: 'Wallet', icon: <FaWallet /> },
      { name: 'Profile', icon: <FaUser /> },
    ];
  const clickHandler = (target)=>{
     setActiveTab(target);
    if(target === "Home"){
        navigate('/')
    }
    else{
        navigate(`/mobile/user/${target}`)
    }
  }
  return (
    <div className="flex justify-around bg-white font-semibold font-montserrat py-3 border-t border-gray-300">
      {tabs.map((tab) => (
        <div
          key={tab.name}
          className="flex flex-col items-center cursor-pointer"
          onClick={() => clickHandler(tab.name)}
        >
          <div
            className={`flex items-center justify-center w-12 h-12 rounded-full border-[0.5px] transition-all ${
              activeTab === tab.name ? 'border-[#144CC7] text-[#144CC7]' : 'border-gray-400 text-gray-400'
            }`}
          >
            <div className="text-xl">{tab.icon}</div>
          </div>
          <div
            className={`text-sm mt-1 ${
              activeTab === tab.name ? 'text-blue-500' : 'text-gray-500'
            }`}
          >
            {tab.name}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MobileFooter;
