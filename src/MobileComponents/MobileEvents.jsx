import { useEffect, useState } from "react";
import { getAvlOrderbook } from "../Apis/Event";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { truncateText } from "../utils/utility";
import MobileYesNo from "./MobileYesNo";
import { FadeLoader } from "react-spinners";

const MobileEvent = ({ isLive, events }) => {
  const [expandedEvents, setExpandedEvents] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [avlQty, setAvlQty] = useState({ buys: [], sells: [] });

  const [formData, setFormData] = useState({
    userId: localStorage.getItem("userId") || "",
    type: "",
    price: 0.5,
    quantity: 1,
  });

  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const navigate = useNavigate();

  const handleReadMore = (eventId) => {
    setExpandedEvents((prevState) => ({
      ...prevState,
      [eventId]: !prevState[eventId],
    }));
  };

  const handleModalToggle = () => {
    setShowModal(!showModal);
  };

  const handleYesNoClick = async (option, event, e) => {
    e.stopPropagation();
    setSelectedOption(option);
    setSelectedEvent(event);
    setFormData({ ...formData, type: option });
    handleModalToggle();

    try {
      const eventOrderbook = await getAvlOrderbook(event._id);
      setAvlQty(eventOrderbook.data || { buys: [], sells: [] });
    } catch (error) {
      // console.log("Error fetching orderbook :", error);
    }
  };

  useEffect(() => {
    if (showModal) {
      setTimeout(() => {
        setShowModal(true);
      }, 10);
    } else {
      setShowModal(false);
    }
  }, [showModal]);

  const handleCardClick = (eventId) => {
    navigate(`/event/${eventId}`);
  };

  return (
    <>
      <div className="flex justify-center items-center ">
        {!events && <FadeLoader size={70} color="#808080" />}
      </div>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 mx-4 sm:mx-8">
        {events.map((event) => (
          <div
            key={event._id}
            onClick={() => handleCardClick(event._id)}
            className="bg-white rounded-lg p-2 sm:p-4 shadow-sm flex flex-col space-y-1"
          >
            <div className="flex justify-between items-center space-x-2">
              <div className="flex-1">
                <div className="flex items-center justify-between space-x-4">
                  <h3 className="font-bold text-md">{event.title}</h3>
                  <img
                    src={event.icons}
                    alt={event.icons}
                    className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full"
                  />
                </div>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-xs text-gray-600">
                    {truncateText(event.one_liner_description, 40)}
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCardClick(event._id);
                    }}
                    className="text-blue-500 underline"
                    style={{ fontSize: "0.75rem" }}
                  >
                    Read More
                  </button>
                </div>
              </div>
            </div>

            <div className="flex space-x-2 mt-2">
              <button
                onClick={(e) => handleYesNoClick("yes", event, e)}
                className="bg-[#E7F9F1] text-green-800 px-4 py-3 mt-1 rounded-lg flex-1 text-sm font-bold hover:bg-green-200 transition"
              >
                Yes {event.currentYesPrice.toFixed(1)}
              </button>
              <button
                onClick={(e) => handleYesNoClick("no", event, e)}
                className="bg-[#E8EEFA] text-blue-800 px-4 py-3 mt-1 rounded-lg flex-1 text-sm font-bold hover:bg-blue-200 transition"
              >
                No {event.currentNoPrice.toFixed(1)}
              </button>
            </div>
          </div>
        ))}
        {showModal && selectedEvent && (
          <MobileYesNo
            preSelectedButton={selectedOption}
            handleModalToggle={handleModalToggle}
            currentEvent={selectedEvent}
          />
        )}
      </div>
    </>
  );
};

export default MobileEvent;
