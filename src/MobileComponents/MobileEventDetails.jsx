import { useState, useEffect } from "react";
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
import "./PriceTable.css";
import { getAvlOrderbook } from "../Apis/Event";
import { lineChartData, eventDetails } from "../Components/Event/data";
import { useParams } from "react-router-dom";
import { getAllEventById } from "../Apis/Event";
import { FaLightbulb } from "react-icons/fa";
import MobileYesNo from "./MobileYesNo";
import { convertToIST } from "../utils/utility";
import MobileOrderBook from "./MobileOrderBook";

function MobileEventDetails() {
  const [selectedLegend, setSelectedLegend] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState();
  const [event, setEvent] = useState(null);
  const [orderbook, setOrderBook] = useState([]);
  const { eventId } = useParams();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const eventData = await getAllEventById(eventId);
        setEvent(eventData);
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };
    fetchEvent();
  }, [eventId]);

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
  };

  useEffect(() => {
    const fetchOrderBook = async () => {
      try {
        const eventData = await getAvlOrderbook(eventId);
        // console.log(`Fetched event data:`, eventData);
        setOrderBook(eventData);
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };
    fetchOrderBook();
  }, [eventId]);
  // console.log("oeder", orderbook);

  const getTopOrders = (orders) => {
    if (!Array.isArray(orders)) return [];
    const topOrders = orders
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 5);
    return topOrders;
  };

  const filteredYesOrders = getTopOrders(orderbook?.buys || []);
  const filteredNoOrders = getTopOrders(orderbook?.sells || []);
  const maxQtyY = Math.max(...filteredYesOrders.map((row) => row.quantity));
  const maxQtyN = Math.max(...filteredNoOrders.map((row) => row.quantity));
  if (!event) return <p>Loading...</p>;

  return (
    <div className="px-4 py-2 bg-[#f4f4f4]">
      {/* Event Header Section */}
      <div className="flex flex-col sm:flex-row p-4 border bg-[#fff] border-gray-200 rounded-lg shadow-sm ">
        <img
          src={event.icons}
          alt="Event"
          className="w-24 h-24 mx-auto rounded-lg mb-2"
        />
        <div className="flex flex-col justify-center w-full">
          <h2 className="text-md font-semibold text-[#3D3D3D] font-inter text-center w-full">
            {event.title}
          </h2>
          <div className="flex justify-center mt-1">
            {event.parentCategory && (
              <span className=" text-white text-xs text-center bg-[#F05502] py-1 px-2 rounded-lg ">
                {event.parentCategory}
              </span>
            )}
          </div>
          <div className="flex justify-center mt-2 bg-[#f4f4f4] rounded-xl">
            {event.one_liner_description && (
              <p className="flex items-center text-xs  p-1 font-inter font-semibold text-transparent bg-clip-text bg-gradient-to-b from-[#0551F6] to-[#0D3A9D]">
                <span className="text-yellow-300 mr-2 text-xl">
                  <FaLightbulb />
                </span>
                {event.one_liner_description}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="bg-[#fff]">
        {showModal && (
          <MobileYesNo
            preSelectedButton={selectedOption}
            handleModalToggle={handleModalToggle}
            currentEvent={event}
          />
        )}
      </div>
      {/* Pie Chart */}
      <div className="mt-4 p-4 shadow-sm rounded-lg border border-gray-200 bg-white">
        <div className=" mb-4">
          <h2 className="text-md font-semibold text-left text-[#2D2D2D] font-inter">
            The Market Predict
          </h2>
          <div className="w-full flex justify-center mb-8 mt-4">
            <PieChart width={290} height={155}>
              <Pie
                data={[
                  { name: "Yes", value: event.currentYesPrice * 10 },
                  { name: "No", value: event.currentNoPrice * 10 },
                ]}
                cx="50%"
                cy="55%"
                innerRadius={55}
                outerRadius={70}
                startAngle={90}
                endAngle={450}
                paddingAngle={2}
                cornerRadius={15}
                dataKey="value"
              >
                <Cell
                  fill="#06C270"
                  opacity={
                    selectedLegend === null || selectedLegend === "Yes"
                      ? 1
                      : 0.3
                  }
                />
                <Cell
                  fill="#144CC7 "
                  opacity={
                    selectedLegend === null || selectedLegend === "No" ? 1 : 0.3
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
                formatter={(value, entry) => {
                  const percentage =
                    (entry.payload.value /
                      (event.currentYesPrice * 10 +
                        event.currentNoPrice * 10)) *
                    100;
                  return `${value}: ${percentage.toFixed(0)}%`;
                }}
                wrapperStyle={{ cursor: "pointer", paddingLeft: 20 }}
              />
            </PieChart>
          </div>
        </div>
      </div>

      {/* Line Chart */}
      <div className="mt-4 p-4 shadow-sm rounded-lg border border-gray-200 bg-white">
        <div>
          <h2 className="text-md font-semibold text-center text-[#2D2D2D] mb-4 font-inter">
            The Market Trend / Chart
          </h2>
          <div className="w-full h-64 p-0 m-0 " style={{ marginLeft: "-1rem" }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" padding={{ left: 0, right: 0 }} />
                <YAxis />
                <Tooltip formatter={(value) => `${value}%`} />
                <Legend
                  formatter={(value) => {
                    // Customize the legend labels
                    return value.charAt(0).toUpperCase() + value.slice(1); // Capitalize the first letter
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="yes"
                  stroke="#06C270"
                  activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="no" stroke=" #144CC7" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Order Book and Activity */}
      <div>
        <div className="mt-4 p-4 shadow-sm rounded-lg border border-gray-200 text-xs font-inter bg-[#fff]">
          <h3 className="text-[#2D2D2D] font-semibold text-lg mb-2 font-inter">
            Order Book
          </h3>
          <div className="flex justify-between">
            {/* Yes Table */}
            <MobileOrderBook
              data={filteredYesOrders}
              color={"#06C270"}
              maxQuantity={maxQtyY}
              type={"Yes"}
            />
            {/* No Table */}
            <MobileOrderBook
              maxQuantity={maxQtyN}
              color={"#144CC7"}
              data={filteredNoOrders}
              type={"No"}
            />
          </div>
        </div>
      </div>

      {/* About the event */}
      <div className="mt-4 p-4 shadow-sm rounded-lg border border-gray-200 bg-[#fff] mb-8 font-montserrat ">
        <h1 className="text-lg font-semibold text-left mb-4">{event.title}</h1>

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
          <div className="flex flex-col space-y-2">
            <h4 className="text-gray-500">Source of Truth</h4>
            <h4 className="text-lg font-semibold">{event.sourceOfTruth}</h4>
          </div>
          <div className="flex flex-col space-y-2">
            <h4 className="text-gray-500">Trading Started On</h4>
            <h4 className="text-lg font-semibold">
              {convertToIST(event.eventStartedOn)}
            </h4>
          </div>
          <div className="flex flex-col space-y-2">
            <h4 className="text-gray-500">Event Expires On</h4>
            <h4 className="text-lg font-semibold">
              {convertToIST(event.eventExpiresOn)}
            </h4>
          </div>
        </div>

        <div className="mt-4">
          <h4 className="text-gray-500 font-semibold">
            Event Overview & Statistics
          </h4>
          <p className="text-sm text-gray-700">{event.overview}</p>
        </div>

        {/* Rules */}
        <div className="mt-4">
          <h4 className="text-gray-500 font-semibold">Rules</h4>
          <p className="text-sm text-gray-700">{event.eventRules}</p>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4 flex justify-evenly border-t border-gray-200">
        <button
          className="w-full py-2 rounded-lg font-semibold text-white mr-2 bg-[#06C270]"
          onClick={(e) => handleYesNoClick("yes", e)}
        >
          YES ₹ {event.currentYesPrice}
        </button>
        <button
          className="w-full py-2 rounded-lg font-semibold text-white ml-2 bg-[#144CC7]"
          onClick={(e) => handleYesNoClick("no", e)}
        >
          NO ₹ {event.currentNoPrice}
        </button>
      </div>
    </div>
  );
}

export default MobileEventDetails;
