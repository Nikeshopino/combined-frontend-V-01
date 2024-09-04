import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MobileCategorySlider from "./MobileCategorySlider";
import MobileLiveEventsSlider from "./MobileLiveEventsSlider";
import MobileEvent from "./MobileEvents";
import NewsImg from "../Assets/news-report.png";
import CricketImg from "../Assets/cricket.png";
import RaceImg from "../Assets/race.png";
import YoutubeImg from "../Assets/youtube.png";
import FootballImg from "../Assets/football.png";
import { getAllEventsByCategory } from "../Apis/Event";

import MobileBanner from "./MobileBanner";

function MobileCategory() {
  const { categoryName } = useParams();
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventList = await getAllEventsByCategory(categoryName);
        setEvents(eventList);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, [categoryName]);

  // console.log(categoryName);
  const cardData = [
    {
      id: 1,
      title: "Election",
      year: "2024",
      imgSrc: NewsImg,
      path: "Election",
      parentCategory: "CurrentAffair",
    },
    {
      id: 2,
      title: "Economy",
      year: "2024",
      imgSrc: NewsImg,
      path: "Economy",
      parentCategory: "CurrentAffair",
    },
    {
      id: 3,
      title: "Bundes",
      year: "2024",
      imgSrc: FootballImg,
      path: "Bundes",
      parentCategory: "Football",
    },
    {
      id: 4,
      title: "BPL",
      year: "2024",
      imgSrc: FootballImg,
      path: "BPL",
      parentCategory: "Football",
    },
    {
      id: 5,
      title: "SpanishLeague",
      year: "2024",
      imgSrc: FootballImg,
      path: "SpanishLeague",
      parentCategory: "Football",
    },
    {
      id: 6,
      title: "F1 Racing",
      year: "2024",
      imgSrc: RaceImg,
      path: "GrandPrix",
      parentCategory: "F1 Racing",
    },
    {
      id: 7,
      title: "ODI",
      year: "2024",
      imgSrc: CricketImg,
      path: "ODI",
      parentCategory: "Cricket",
    },
    {
      id: 8,
      title: "T-20",
      year: "2024",
      imgSrc: CricketImg,
      path: "T-20",
      parentCategory: "Cricket",
    },
    {
      id: 9,
      title: "Test",
      year: "2024",
      imgSrc: CricketImg,
      path: "Test",
      parentCategory: "Cricket",
    },
    {
      id: 10,
      title: "Purav Jha",
      year: "2024",
      imgSrc: YoutubeImg,
      path: "PuravJha",
      parentCategory: "Youtube",
    },
    {
      id: 11,
      title: "Mr Beast",
      year: "2024",
      imgSrc: YoutubeImg,
      path: "MrBeast",
      parentCategory: "Youtube",
    },
    {
      id: 12,
      title: "Entertainment",
      year: "2024",
      imgSrc: YoutubeImg,
      path: "Entertainment",
      parentCategory: "Youtube",
    },
  ];
  const filteredCardData = cardData.filter(
    (card) => card.parentCategory.toLowerCase() === categoryName.toLowerCase()
  );
  return (
    <>
      {/* <div className=" mx-2  bg-[#f4f4f4]">
        <div className=" flex items-center justify-between p-2 rounded mx-1">
          <h2 className="text-[14px] font-[700] text-[#000000] font-montserrat">
            Hot Trades Going on
          </h2>
          <p className="text-[8px] font-inter text-[#85898C] ">
            Players in this arena: 23098
          </p>
        </div>
        <div className="mt-2 mx-1">
          <MobileCategorySlider cardData={filteredCardData} />
        </div>
      </div> */}
      <div className="mt-2 mx-2 bg-[#f4f4f4]">
        <MobileBanner />
      </div>
      <div className=" bg-[#f4f4f4]">
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

export default MobileCategory;
