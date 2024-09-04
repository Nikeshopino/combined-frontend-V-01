import group360 from "../../Assets/group_360.png";
import group from "../../Assets/group_11655_360.png";
import { FaLightbulb } from "react-icons/fa6";
import { useState, useEffect } from "react";
import YesNo from "./YesNo";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Label,
  Legend,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { lineChartData, eventDetails } from "./data";
import { useLoaderData, useLocation, useParams } from "react-router-dom";
import { getAllEventById } from "../../Apis/Event";
import OrderBook from "./Orderbook";
import Activity from "./Activity";
import OrderPlace from "./OrderPlace";

// import YesNo from "./YesNo";

function EventDetail() {
  const [selectedChart, setSelectedChart] = useState("lineChart");
  const [selectedLegend, setSelectedLegend] = useState(null);
  const [selectedTab, setSelectedTab] = useState("orderBook");
  const [showModal, setShowModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState();
  const [event, setEvent] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [avlQty, setAvlQty] = useState({ buys: [], sells: [] });
  const [price, setPrice] = useState(0);
  const location = useLocation();

  const { eventId } = useParams();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const eventData = await getAllEventById(eventId);
        // console.log(`Fetched event data:`, eventData);
        setEvent(eventData);
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };
    fetchEvent();
  }, [eventId]);

  if (!event) return <p>Loading...</p>;

  const handleLegendClick = (legend) => {
    setSelectedLegend(legend === selectedLegend ? null : legend);
  };
  const handleModalToggle = () => {
    setShowModal(!showModal);
  };
  const handleYesNoClick = (option, e) => {
    e.stopPropagation();
    setSelectedOption(option);
    handleModalToggle();

    const [formData, setFormData] = useState({
      userId: localStorage.getItem("userId") || "",
      eventId: currentEvent._id,
      type: preSelectedButton,
      price: preSelectedPrice,
      quantity: 1,
    });

    useEffect(() => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        type: selected,
        price: price,
        quantity: quantity,
      }));
    }, [selected, price, quantity]);

    const getAvailableQuantity = () => {
      const { type, price } = formData;
      const orders = type === "yes" ? avlQty.buys : avlQty.sells;
      if (!Array.isArray(orders)) {
        return 0;
      }
      const matchingOrder = orders.find(
        (order) => parseFloat(order.price) === parseFloat(price)
      );
      return matchingOrder ? matchingOrder.quantity : 0;
    };
  };

  return (
    <div className="fixed top-22 flex w-[83%] h-screen">
      <div className="absolute flex flex-col mt-2 h-[80%] w-2/3 px-4 overflow-y-auto scrollbar-hide">
        <div className="flex flex-col border border-gray-200 rounded-lg mt-2 p-2">
          <div className="flex">
            <div className="flex items-center justify-center">
              <img
                src={event.icons}
                alt={event.icons}
                className="w-20 h-20 sm:w-10 sm:h-10 md:w-20 md:h-20 lg:w-60 lg:h-15 xl:w-18 xl:h-15 rounded-full"
              />
            </div>

            <div className="px-2">
              <div>
                <p className="text-xl font-bold">{event.title}</p>
              </div>

              <div className="mt-1">
                <p className="text-sm text-gray-500">
                  {event.description.substring(0, 250)}
                </p>
              </div>
            </div>
          </div>

          <div className="flex bg-blue-100 rounded-lg p-2 mt-2">
            <div>
              <FaLightbulb className="text-yellow-400 text-4xl" />
            </div>
            <div>
              <p className="text-sm text-center text-blue-900">
                {event.one_liner_description}
              </p>
            </div>
          </div>
        </div>
        {/* Event Header Section */}

        <div>
          {showModal && (
            <YesNo
              preSelectedButton={selectedOption}
              handleModalToggle={handleModalToggle}
              currentEvent={event}
            />
          )}
        </div>

        {/* Market Predict Section */}
        <div className="mt-4 p-4 shadow-sm rounded-lg border border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-left">
              <span className="text-black">The Market predict</span>
              <br />
            </h2>
            <div className="flex mt-4 sm:mt-0 border border-gray-300 rounded-lg">
              <button
                onClick={() => setSelectedChart("pieChart")}
                className={`py-2 px-6 border-r rounded-l-lg ${
                  selectedChart === "pieChart"
                    ? "bg-gradient-to-b from-[#0551F6] to-[#0D3A9D] text-white"
                    : "bg-white text-black"
                }`}
              >
                Pie Chart
              </button>
              <button
                onClick={() => setSelectedChart("lineChart")}
                className={`py-2 px-6 rounded-r-lg ${
                  selectedChart === "lineChart"
                    ? "bg-gradient-to-b from-[#0551F6] to-[#0D3A9D] text-white"
                    : "bg-white text-black"
                }`}
              >
                Line Chart
              </button>
            </div>
          </div>
          {/* Chart Section */}
          {selectedChart === "pieChart" ? (
            <div className="flex flex-col md:flex-row align-center justify-center">
              <div className="w-full md:w-1/2 flex justify-center md:mt-0 mt-[-6px]">
                <PieChart width={250} height={180}>
                  <Pie
                    data={[
                      { name: "Yes", value: event.currentYesPrice * 10 },
                      { name: "No", value: event.currentNoPrice * 10 },
                    ]}
                    cx="40%"
                    cy="40%"
                    innerRadius={50}
                    outerRadius={70}
                    startAngle={90}
                    endAngle={450}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    <Cell
                      fill="#8884d8" // Color for the "Yes" segment
                      opacity={
                        selectedLegend === null || selectedLegend === "Yes"
                          ? 1
                          : 0.3
                      }
                    />
                    <Cell
                      fill="#82ca9d" // Color for the "No" segment
                      opacity={
                        selectedLegend === null || selectedLegend === "No"
                          ? 1
                          : 0.3
                      }
                    />
                    <Label
                      value="Win Probability"
                      position="center"
                      style={{ fontSize: "12px", fontWeight: "bold" }}
                    />
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Legend
                    layout="vertical"
                    align="right"
                    verticalAlign="middle"
                    onClick={(e) => handleLegendClick(e.value)}
                    wrapperStyle={{ cursor: "pointer", paddingLeft: 20 }}
                  />
                </PieChart>
              </div>
            </div>
          ) : (
            <div className="w-full h-64 p-0 m-0">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" padding={{ left: 0, right: 0 }} />
                  <YAxis />
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="yes"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                  <Line type="monotone" dataKey="no" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Order Book and Activity */}
        <div className="mt-4 p-4 shadow-sm rounded-lg border border-gray-200">
          <div className="mt-4 sm:mt-0 flex">
            {/* <button
              onClick={() => setSelectedTab("activityBook")}
              className={`py-2 px-6 border-r border border-gray-300 rounded-l-lg ${selectedTab === "activityBook"
                ? "bg-blue-500 text-white"
                : "bg-white text-black"
                }`}
            >
              ACTIVITY BOOK
            </button> */}
            <button
              onClick={() => setSelectedTab("orderBook")}
              className={`py-2 px-6 border border-gray-300 rounded-lg ${
                selectedTab === "orderBook"
                  ? "bg-gradient-to-b from-[#0551F6] to-[#0D3A9D] text-white"
                  : "bg-white text-black"
              }`}
            >
              ORDER BOOK
            </button>
          </div>
          {selectedTab === "orderBook" && <OrderBook />}
          {selectedTab === "activityBook" && <Activity />}
        </div>

        {/* About the event */}
        <div className="mt-4 p-4 shadow-sm rounded-lg border border-gray-200">
          <h1 className="text-lg font-semibold text-left mb-4">
            {event.title}
          </h1>

          {/* Main Info */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <h4 className="text-gray-500">Traders</h4>
              <h4 className="text-lg font-semibold">{eventDetails.traders}</h4>
            </div>
            <div>
              <h4 className="text-gray-500">Volume</h4>
              <h4 className="text-lg font-semibold">{eventDetails.Volume}</h4>
            </div>
            <div>
              <h4 className="text-gray-500">Started At</h4>
              <h4 className="text-lg font-semibold">{eventDetails.Started}</h4>
            </div>
            <div>
              <h4 className="text-gray-500">Ended At</h4>
              <h4 className="text-lg font-semibold">{eventDetails.Ended}</h4>
            </div>
          </div>

          <hr className="my-4 border-t-2 border-gray-300" />

          {/* Additional Info */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div>
              <h4 className="text-gray-500">Source of Truth</h4>
              <h4 className="text-lg font-semibold">{eventDetails.Source}</h4>
            </div>
            <div>
              <h4 className="text-gray-500">Trading Started On</h4>
              <h4 className="text-lg font-semibold">
                {eventDetails.EventStarted}
              </h4>
            </div>
            <div>
              <h4 className="text-gray-500">Event Expires On</h4>
              <h4 className="text-lg font-semibold">
                {eventDetails.EventEnded}
              </h4>
            </div>
          </div>
          <div className="mt-4">
            <h4 className="text-gray-500">Event Overview & Statistics</h4>
            <p className="text-sm text-gray-700">{eventDetails.description}</p>
          </div>

          {/* Rules */}
          <div className="mt-4">
            <h4 className="text-gray-500">Rules</h4>
            <p className="text-sm text-gray-700">{eventDetails.rules}</p>
          </div>
        </div>
      </div>

      <div className="w-1/3 absolute top-0 right-0 h-[73%]  mt-3 max-w-[calc(33.33%)] flex flex-col sm:flex-row p-1">
        <div className="flex w-full flex-col ">
          <div className="flex w-full justify-between rounded-lg border border-gray-200 p-1">
            <div className="flex p-1">
              <div className="mx-1">
                <img src={group360} alt="" />
              </div>
              <div className="flex items-center">
                <p className="text-xs font-bold">Amount Invested : ₹500</p>
              </div>
            </div>
            <div className="flex">
              <div className="mx-1 pt-0.5">
                <img src={group} alt="" />
              </div>
              <div className="flex items-center">
                <p className="text-xs font-bold">Trade : 5</p>
              </div>
            </div>
          </div>
          <div className="border border-100-grey rounded-lg mt-3 p-2">
            <OrderPlace
              handleModalToggle="True"
              currentEvent={event}
              preSelectedButton="no"
              eventId={eventId}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetail;
