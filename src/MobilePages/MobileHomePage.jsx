import React, { useEffect, useState } from 'react';
import MobileHeader from '../MobileComponents/MobileHeader';
import MobileCategorySlider from '../MobileComponents/MobileCategorySlider';
import MobileBanner from '../MobileComponents/MobileBanner';
import MobileEvent from '../MobileComponents/MobileEvents';
import MobileFooter from '../MobileComponents/MobileFooter';
import NewsImg from "../Assets/news-report.png";
import CricketImg from "../Assets/cricket.png";
import RaceImg from "../Assets/race.png"
import YoutubeImg from "../Assets/youtube.png"
import FootballImg from "../Assets/football.png"

import { getAllEvents } from '../Apis/Event';
import { HashLoader } from 'react-spinners';
function MobileHomePage() {
  const [isLive,setIsLive] = useState(false);
  const [events, setEvents] = useState([]);
  const cardData = [
    {
      id: 1,
      title: "Election",
      year: "2024",
      imgSrc: NewsImg, 
      path:"Election",
      parentCategory:"CurrentAffair"
    },
    {
      id: 2,
      title: "Economy",
      year: "2024",
      imgSrc: NewsImg, 
      path:"Economy",
      parentCategory:"CurrentAffair"
    },
    {
      id: 3,
      title:"Bundes",
      year: "2024",
      imgSrc: FootballImg, 
      path: "Bundes",
      parentCategory:"Football"
    },
    {
      id: 4,
      title:"BPL",
      year: "2024",
      imgSrc: FootballImg, 
      path: "BPL",
      parentCategory:"Football"
    },
    {
      id: 5,
      title:"SpanishLeague",
      year: "2024",
      imgSrc: FootballImg, 
      path: "SpanishLeague",
      parentCategory:"Football"
    },
    {
      id: 6,
      title:"F1 Racing",
      year: "2024",
      imgSrc: RaceImg, 
      path: "GrandPrix",
      parentCategory:"F1 Racing"
    },
    {
      id: 7,
      title:"ODI",
      year: "2024",
      imgSrc: CricketImg, 
      path: "ODI",
      parentCategory:"Cricket"
    },
    {
      id: 8,
      title:"T-20",
      year: "2024",
      imgSrc: CricketImg, 
      path: "T-20",
      parentCategory:"Cricket"
    },
    {
      id: 9,
      title:"Test",
      year: "2024",
      imgSrc: CricketImg, 
      path: "Test",
      parentCategory:"Cricket"
    },
    {
      id: 10,
      title:"Purav Jha",
      year: "2024",
      imgSrc: YoutubeImg, 
      path: "PuravJha",
      parentCategory:"Youtube"
    },
    {
      id: 11,
      title:"Mr Beast",
      year: "2024",
      imgSrc: YoutubeImg, 
      path: "MrBeast",
      parentCategory:"Youtube"
    },
    {
      id: 12,
      title:"Entertainment",
      year: "2024",
      imgSrc: YoutubeImg, 
      path: "Entertainment",
      parentCategory:"Youtube"
    },
  ];
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventList = await getAllEvents();
        let filteredEvents = eventList;

        // Filter events if isLive is true
        if (isLive) {
          filteredEvents = eventList.filter(event => event.live === "yes");
        }

        setEvents(filteredEvents);

      
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();

    
  }, [isLive]);
  return (
    <div style={{ backgroundColor: "#f4f4f4" }}> {/* Adjust padding to account for footer height */}
    
      <div>
        <MobileHeader setIsLive={setIsLive}isLive ={isLive}  />
      </div>
      <div className='mt-2 mx-3'>
        <MobileCategorySlider cardData={cardData} />
      </div>
      <div className='mt-2 mx-2'>
        <MobileBanner />
      </div>
      <div className='mb-24' >
        <MobileEvent isLive ={isLive} events={events}/>
      </div>
     
      <div style={footerStyle}>
        <MobileFooter currentTab='Home'/>
      </div>
    </div>
  );
}

const footerStyle = {
  position: 'fixed',
  bottom: '-5px',
  left: 0,
  width: '100%',
  backgroundColor: '#fff', // Adjust to your footer's background color
  zIndex: 10, // Ensures footer is above other content
};

export default MobileHomePage;
