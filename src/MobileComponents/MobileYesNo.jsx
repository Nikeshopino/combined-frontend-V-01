import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { createOrder } from "../Apis/Order";
import { getOrderbook } from "../Apis/Event";
import { getUserProfile } from "../Apis/User";

function MobileYesNo({ handleModalToggle, currentEvent, preSelectedButton }) {
  const preSelectedPrice =
    preSelectedButton === "yes"
      ? currentEvent.currentYesPrice
      : currentEvent.currentNoPrice;

  const [selected, setSelected] = useState(preSelectedButton);
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(preSelectedPrice);
  const [amount, setAmount] = useState(price * quantity);
  const [balance, setBalance] = useState(0);
  const [avlQty, setAvlQty] = useState({ buys: [], sells: [] });
  const [userData, setUserData] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const profile = await getUserProfile();
        setUserData(profile);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvent();
  }, []);

  useEffect(() => {
    setBalance(userData?.totalBalance);
  }, [userData]);

  useEffect(() => {
    setAmount(price * quantity);
  }, [price, quantity]);

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

  const handleButtonClick = (value) => {
    setSelected(value);
    setPrice(
      value === "yes"
        ? currentEvent.currentYesPrice
        : currentEvent.currentNoPrice
    );
  };

  const eventOrderbook = async () => {
    try {
      const eventOrderbook = await getOrderbook(currentEvent._id);
      setAvlQty(eventOrderbook.data || { buys: [], sells: [] });
    } catch (error) {
      console.error("Error fetching orderbook:", error);
    }
  };

  useEffect(() => {
    eventOrderbook();
  }, [price]);

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

  const handlePlaceOrder = async () => {
    const { userId, type, price, quantity } = formData;
    if (!type || !price || !quantity) {
      toast.error("Please select type, price, and quantity.");
      return;
    }
    setIsButtonDisabled(true); // Disable button immediately after click
    try {
      const orderData = {
        userId,
        eventId: currentEvent._id,
        type,
        price,
        quantity,
      };

      const response = await createOrder(orderData); // Replace with your API call
      if (response) {
        toast.success("Order placed successfully");
        setOrderSuccess(true); // Show tick mark
        setTimeout(() => {
          handleModalToggle(); // Close modal after delay
        }, 2000); // Adjust the delay as needed
      } else {
        toast.error("Order not placed / Please top-up your balance.");
        setIsButtonDisabled(false); // Re-enable button if the order fails
      }
    } catch (error) {
      toast.error("Error placing order");
      console.error("Error placing order:", error);
      setIsButtonDisabled(false); // Re-enable button if there is an error
    }
  };

  return (
    <div style={{ zIndex: 1000 }}>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40  "
        onClick={handleModalToggle}
      ></div>

      {/* Modal */}
      <div>
        <div
          className="fixed inset-0 z-50 flex items-end md:items-center justify-center font-inter"
          onClick={handleModalToggle}
        >
          <div
            className="bg-white rounded-t-2xl md:rounded-xl p-4 shadow-lg w-full max-w-md sm:w-[95%] md:w-[90%] lg:w-[70%] xl:w-[40%] relative transform transition-all duration-300 slide-up md:slide-in overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Content */}
            <div className="mb-2 flex items-center justify-between">
              <h3 className=" font-bold mb-2">{currentEvent.title}</h3>
              <img
                src={currentEvent.icons}
                alt="Event Icon"
                className="w-12 h-12 object-cover rounded-full"
              />
            </div>

            <div className="flex bg-white rounded-md overflow-hidden mb-2 shadow-lg">
              <button
                onClick={() => handleButtonClick("yes")}
                className={`w-1/2 py-2 font-bold text-xs  ${
                  selected === "yes"
                    ? "bg-[#06C270] text-white"
                    : "bg-white text-black"
                }`}
              >
                YES {currentEvent.currentYesPrice}
              </button>
              <button
                onClick={() => handleButtonClick("no")}
                className={`w-1/2 py-2 font-bold text-sm ${
                  selected === "no"
                    ? "bg-[#144CC7] text-white"
                    : "bg-white text-black"
                }`}
              >
                NO {currentEvent.currentNoPrice}
              </button>
            </div>

            <div className="flex justify-between mb-2 mt-2 font-bold">
              <h2 className="text-sm">Quantity</h2>
              <h2 className="text-sm">{quantity}</h2>
            </div>
            <div className="flex items-center mb-2">
              <button
                onClick={() =>
                  setQuantity((prev) => {
                    if (prev === 1) return 1;
                    return Math.max(prev - 1, 1);
                  })
                }
                className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded font-bold text-xl"
              >
                <h3 className="text-2xl">-</h3>
              </button>
              <input
                type="range"
                id="quantity"
                name="quantity"
                min={1}
                max={100}
                step={1}
                value={quantity}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  if (value > 1) {
                    setQuantity(Math.round(value / 5) * 5);
                  } else {
                    setQuantity(1);
                  }
                }}
                className="flex-grow mx-2 h-5 rounded-md custom-slider"
              />
              <button
                onClick={() => setQuantity((prev) => Math.min(prev + 1, 100))}
                className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded font-bold text-xl"
              >
                <h3 className="text-2xl">+</h3>
              </button>
            </div>

            <div className="flex justify-between mb-2 font-bold">
              <h2 className="text-sm">Price</h2>
              <h2 className="text-sm">{price}</h2>
            </div>
            <div className="flex items-center mb-2">
              <button
                onClick={() => setPrice((prev) => Math.max(prev - 0.5, 0.5))}
                className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded font-bold text-xl"
              >
                <h3 className="text-2xl">-</h3>
              </button>
              <input
                type="range"
                id="price"
                name="price"
                min={0.5}
                max={9.5}
                step={0.5}
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="flex-grow mx-2 h-5 rounded-md custom-slider"
              />
              <button
                onClick={() => setPrice((prev) => Math.min(prev + 0.5, 9.5))}
                className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded font-bold text-xl"
              >
                <h3 className="text-2xl">+</h3>
              </button>
            </div>

            <div className="flex justify-between mb-2 font-bold">
              <h2 className="text-sm">Available Quantity</h2>
              <h2 className="text-sm">{getAvailableQuantity()}</h2>
            </div>

            <div className="flex justify-between mb-4 font-bold">
              <h2 className="text-sm">Amount</h2>
              <h2 className="text-sm">₹ {amount}</h2>
            </div>

            <div className="flex justify-center">
              <button
                onClick={handlePlaceOrder}
                disabled={isButtonDisabled}
                className={`${!orderSuccess?'w-full':''} py-2 px-4 rounded-lg font-bold text-white ${
                  selected === "yes" ? "bg-[#06C270]" : "bg-[#144CC7]"
                } transition-all duration-300 ease-in-out ${
                  isButtonDisabled ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {orderSuccess ? (
                  <span className="text-2xl text-center">✔</span> // Show tick mark on success
                ) : (
                  <span className="block w-full text-center">Place Order</span> // Full width text
                )}
              </button>
            </div>

            <h3 className="text-center mt-2 text-sm">
              Your Balance is: {parseFloat(balance).toFixed(2)}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileYesNo;
