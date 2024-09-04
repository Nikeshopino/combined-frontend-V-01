import profile1 from "../../Assets/boy.png";
import profile2 from "../../Assets/profile2.png";
import { getActivityBar } from "../../Apis/Event";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Activity = () => {
  const [activity, setActivity] = useState([]);
  const { eventId } = useParams();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const activityData = await getActivityBar(eventId);
        console.log("Activity Data::", activityData);
        setActivity(activityData);
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };
    fetchEvent();
  }, [eventId]);

  return (
    <div className="flex justify-center items-start py-4">
      <div className="w-full max-w-4xl">
        {activity.length > 0 ? (
          activity.map((order, index) => {
            const { yesOrder, noOrder } = order;
            const yesPrice = yesOrder.price;
            const noPrice = noOrder.price;

            // Calculate the total price
            const totalPrice = yesPrice + noPrice;

            // Calculate the width of each segment
            const yesWidthPercentage = (yesPrice / totalPrice) * 100;
            const noWidthPercentage = (noPrice / totalPrice) * 100;

            return (
              <div
                key={index}
                className="flex items-center w-full bg-gray-100 p-4 rounded-lg shadow-md mb-4"
              >
                {/* Left Profile, Yes Order */}
                <div className="flex items-center space-x-2 flex-shrink-0">
                  <img
                    src={profile1}
                    alt="User A"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <p className="text-gray-700 font-medium">{yesOrder.userName}</p>
                </div>

                {/* Ratio Bar */}
                <div className="flex-grow mx-4 h-6 bg-gray-300 rounded-full relative">
                  <div
                    className="h-full bg-blue-500 rounded-l-full absolute top-0 left-0"
                    style={{ width: `${yesWidthPercentage}%` }}
                  >
                    <p className="absolute inset-0 flex items-center justify-center text-black text-xs">
                      {yesPrice}
                    </p>
                  </div>
                  <div
                    className="h-full bg-red-500 rounded-r-full absolute top-0 right-0"
                    style={{ width: `${noWidthPercentage}%` }}
                  >
                    <p className="absolute inset-0 flex items-center justify-center text-black text-xs">
                      {noPrice}
                    </p>
                  </div>
                </div>

                {/* Right Profile, No Order */}
                <div className="flex items-center space-x-2 flex-shrink-0">
                  <p className="text-gray-700 font-medium">{noOrder.userName}</p>
                  <img
                    src={profile2}
                    alt="User B"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex justify-center items-center h-auto p-4">
            <p
              style={{
                fontSize: "1.5rem",
                color: "#6495ED",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              No orders placed yet!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Activity;
