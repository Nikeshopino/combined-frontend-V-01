import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import MobileEvent from "./MobileEvents";
import { getAllEventBySubCategory } from "../Apis/Event";

import MobileBanner from "./MobileBanner";

function MobileSubCategory() {
 
  const { parentCategory, subCategory } = useParams();
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventList = await getAllEventBySubCategory(
          parentCategory,
          subCategory
        );
        setEvents(eventList);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, [parentCategory, subCategory]);

  return (
    <>
      <div className="mt-2 mx-2">
        <MobileBanner />
      </div>
      <div className=" bg-[#f4f4f4]">
        {/* <div className=' mx-2'>

<div className=" flex items-center justify-between p-2 rounded">
  <h2 className="text-[14px] font-[700] text-[#000000] font-montserrat">Hot Trades Going on</h2>
  <p className="text-[8px] font-inter text-[#85898C] ">Players in this arena: 23098</p>
</div>
<div className="mt-2">
  <MobileCategorySlider cardData={cardData} />
</div>
</div> */}
        {/* <div className='mt-2 mx-2'>
<div className=" flex items-center justify-between p-2 rounded">
  <h2 className="text-[14px] font-[700] text-[#000000] font-montserrat">Live Events</h2>
  <p className="text-[8px] font-inter text-[#85898C] ">Players in this arena: 23098</p>
</div>
<div className='mt-2'>
  <MobileLiveEventsSlider />
</div>
</div> */}
        <div className="mt-2 ">
          <h2 className="mx-4 mb-2">Active Trades</h2>
          <MobileEvent className="" events={events} />
        </div>
      </div>
    </>
  );
}

export default MobileSubCategory;
