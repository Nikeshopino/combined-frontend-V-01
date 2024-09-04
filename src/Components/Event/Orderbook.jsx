import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAvlOrderbook } from "../../Apis/Event";
import "../../printTable.css";

const OrderBook = () => {
  const [event, setEvent] = useState(null);
  const { eventId } = useParams();
  // console.log("DATA AVL QTY FROM BCK", event);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const eventData = await getAvlOrderbook(eventId);
        // console.log(`Fetched event data:`, eventData);
        setEvent(eventData);
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };
    fetchEvent();
  }, [eventId]);
  

  // Ensure all prices have an entry with quantity, defaulting to 0 if not present
  const getTopOrders = (orders) => {
    if (!Array.isArray(orders)) return [];

    // Sort orders by quantity in descending order and take the top 5
    const topOrders = orders
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 5);

    return topOrders;
  };

  // Check if event data is valid and contains arrays
  const isValidOrders = (orders) => Array.isArray(orders);

  const filteredYesOrders = getTopOrders(event?.buys || []);
  const filteredNoOrders = getTopOrders(event?.sells || []);

  const maxQtyY = Math.max(...filteredYesOrders.map((row) => row.quantity));
  const maxQtyN = Math.max(...filteredNoOrders.map((row) => row.quantity));

  return (
    <div>
      <div className="mt-4 p-4 shadow-sm rounded-lg border border-gray-200 text-xs font-inter bg-[#fff]">
        <h3 className="text-[#2D2D2D] font-semibold text-lg mb-2 font-inter">
          Order Book
        </h3>
        <div className="flex justify-between">
          {/* Yes Table */}
          <div className="w-1/2">
            <table className="price-table w-full mr-4">
              <thead>
                <tr>
                  <th>Price</th>
                  <th>
                    Qty at <span style={{ color: "blue" }}>Yes</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredYesOrders.map((row, index) => (
                  <tr key={index}>
                    <td>{row.price}</td>
                    <td className="bar-cell">
                      <div
                        className="bar"
                        style={{
                          width: `${(row.quantity / maxQtyY) * 100}%`,
                        }}
                      ></div>
                      <span className="qty-text">{row.quantity}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* No Table */}
          <div className="w-1/2">
            <table className="price-table w-full sm:ml-2">
              <thead>
                <tr>
                  <th>Price</th>
                  <th>
                    Qty at <span style={{ color: "Red" }}>No</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredNoOrders.map((row, index) => (
                  <tr key={index}>
                    <td>{row.price}</td>
                    <td className="bar-cell">
                      <div
                        className="bar"
                        style={{
                          width: `${(row.quantity / maxQtyN) * 100}%`,
                          backgroundColor: "pink",
                        }}
                      ></div>
                      <span className="qty-text">{row.quantity}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderBook;
