import { useEffect, useState } from "react";
import { getAllEvents, getOrderbook, getSubCategory } from "../../Apis/Event";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import YesNo from "./YesNo";

const SubCategoryPage = () => {
  const [events, setEvents] = useState([]);
  const [expandedEvents, setExpandedEvents] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [avlQty, setAvlQty] = useState({ buys: [], sells: [] });

  const {subCategory} = useParams()

//   console.log("parentCartegory", parentCategory)

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
      const eventOrderbook = await getOrderbook(event._id);
      setAvlQty(eventOrderbook.data || { buys: [], sells: [] }); // Ensure avlQty is always an object with buys and sells arrays
    } catch (error) {
      console.log("Error fetching orderbook :", error);
    }
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventList = await getSubCategory(subCategory);
        // const cricketEvents = eventList.filter((item)=> item.parentCategory === "cricket" );
        setEvents(eventList);
        console.log(eventList)
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, [subCategory]);

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
    console.log("For data", eventId);
    navigate(`/event/${eventId}`, { state: [{ selectedOption }, { selectedEvent }] });
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mx-4 sm:mx-8">
      {events.map((event) => (
        <div
          key={event._id}
          className="bg-white rounded-lg p-2 sm:p-4 shadow-sm flex flex-col space-y-2 sm:space-y-4 border border-100-grey"
        >
          <div className="flex justify-between items-center">
            <div className="flex flex-col justify-between">
              <div className="flex-1 pr-2">
                <h3
                  className="font-bold lg:text-xl sm:text-lg"
                  onClick={() => handleCardClick(event._id)}
                >
                  {event.title}
                </h3>
              </div>

              <div className="flex items-start space-x-1 sm:space-x-2 mt-5">
                <p className="text-xs sm:text-sm text-gray-600 mt-[-10px]">
                  {expandedEvents[event._id] ? (
                    <>
                      {event.description}
                      <span
                        className="text-blue-500 ml-1 cursor-pointer"
                        onClick={() => handleReadMore(event._id)}
                      >
                        Read less
                      </span>
                    </>
                  ) : (
                    <>
                      {event.description.length > 100
                        ? `${event.description.substring(0, 45)}...`
                        : event.description}
                      {event.description.length > 100 && (
                        <span
                          className="text-blue-500 ml-1 cursor-pointer"
                          onClick={() => handleReadMore(event._id)}
                        >
                          Read more
                        </span>
                      )}
                    </>
                  )}
                </p>
              </div>
            </div>

            <div className="flex-none">
              <img
                src={event.icons}
                alt={event.icons}
                className="w-10 h-10 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-18 xl:h-15 rounded-full"
              />
            </div>
          </div>

          <div className="flex space-x-1 sm:space-x-2">
            <button
              onClick={(e) => handleYesNoClick("yes", event, e)}
              className=" bg-gradient-to-b w-full from-[#1587651A] to-[#1587651A] text-green-800 px-2 sm:px-4 sm:py-2 flex-1 font-semibold hover:bg-green-200 transition"
            
              >
              Yes ₹ {event.currentYesPrice.toFixed(1)}
            </button>
            <button
              onClick={(e) => handleYesNoClick("no", event, e)}
              className="bg-gradient-to-b w-full from-[#6342E31A] to-[#6342E31A] text-blue-800 px-2 sm:px-4 sm:py-2 flex-1 font-semibold hover:bg-blue-200 transition"
              >
              No ₹ {event.currentNoPrice.toFixed(1)}
            </button>
          </div>
        </div>
      ))}
      {showModal && selectedEvent && (
        <YesNo preSelectedButton={selectedOption} handleModalToggle={handleModalToggle} currentEvent={selectedEvent} />
      )}
    </div>
  );
};

export default SubCategoryPage;