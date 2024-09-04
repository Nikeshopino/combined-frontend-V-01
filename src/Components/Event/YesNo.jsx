/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { createOrder } from "../../Apis/Order";
import { getOrderbook } from "../../Apis/Event";
import { getUserProfile } from "../../Store/userSlice";
import { useSelector, useDispatch } from "react-redux";

function YesNo({ handleModalToggle, currentEvent, preSelectedButton }) {
  const preSelectedPrice =
    preSelectedButton === "yes"
      ? currentEvent.currentYesPrice
      : currentEvent.currentNoPrice;

  const [selected, setSelected] = useState(preSelectedButton);
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(preSelectedPrice);
  const [amount, setAmount] = useState(price * quantity);
  const [balance, setBalance] = useState(1000);
  const [avlQty, setAvlQty] = useState({ buys: [], sells: [] });
  const dispatch = useDispatch();
  const { profile} = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);
  // console.log(avlQty);

  // Update amount whenever price or quantity changes
  useEffect(() => {
    setAmount(price * quantity);
  }, [price, quantity]);

  // Update formData whenever quantity, price, or selected type changes
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
      setAvlQty(eventOrderbook.data || { buys: [], sells: [] }); // Ensure avlQty is always an object with buys and sells arrays
    } catch (error) {
      console.log("Error fetching orderbook :", error);
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

  // console.log(getAvailableQuantity());

  const handlePlaceOrder = async () => {
    const { userId, type, price, quantity } = formData;
    if (!type || !price || !quantity) {
      toast.error("Please select type, price, and quantity.");
      return;
    }
    try {
      const orderData = {
        userId,
        eventId: currentEvent._id,
        type,
        price,
        quantity,
      };

      console.log("Order Data:", orderData);
      const response = await createOrder(orderData); // Replace with your API call
      if (response) {
        toast.success("Order placed successfully");
      } else {
        toast.error("Order not placed / Please top-up your balance.");
      }
      handleModalToggle();
    } catch (error) {
      toast.error("Error placing order");
      console.error("Error placing order:", error);
    }
  };

  const isButtonDisabled = amount > balance;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={handleModalToggle}
      ></div>

      {/* Modal */}
      <div
        className="fixed inset-0 z-50 flex items-end md:items-center justify-center border-separate rounded-lg"
        onClick={handleModalToggle}
      >
        <div
          className="bg-white p-4 shadow-lg w-full max-w-md sm:w-[95%] md:w-[90%] lg:w-[70%] xl:w-[40%] relative transform transition-all duration-300 slide-up md:slide-in overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          {/* <button
            onClick={handleModalToggle}
            className="absolute top-0 right-0 text-gray-500 text-3xl hover:text-gray-700"
          >
            &times;
          </button> */}

          {/* Modal Content */}
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-md font-semibold">{currentEvent.title}</h3>
            <img
              src={currentEvent.icons}
              alt="Event Icon"
              className="w-16 h-16 object-cover rounded-full"
            />
          </div>
          <div className="flex bg-white rounded-xl overflow-hidden mb-2 shadow-md">
            <button
              onClick={() => handleButtonClick("yes")}
              className={`w-1/2 py-2 font-bold rounded-xl text-sm ${
                selected === "yes"
                  ? "bg-green-500 text-white"
                  : "bg-white text-black"
              }`}
            >
              Yes ₹ {currentEvent.currentYesPrice}
            </button>
            <button
              onClick={() => handleButtonClick("no")}
              className={`w-1/2 py-2 rounded-xl font-bold text-sm ${
                selected === "no"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-black"
              }`}
            >
              No ₹ {currentEvent.currentNoPrice}
            </button>
          </div>
          <div className="flex justify-between mb-2 mt-2 font-semibold">
            <h2 className="text-sm font-semibold">Quantity</h2>
            <h2 className="text-sm">{quantity} qty</h2>
          </div>
          <div className="flex items-center mb-2">
            <button
              onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
              className="flex items-center justify-center w-8 h-8 bg-white rounded-lg border border-gray-200 font-bold text-xl"
            >
              <h3 className="text-2xl">-</h3>
            </button>
            <input
              type="range"
              id="quantity"
              name="quantity"
              min={0}
              max={100}
              step={5}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="flex-grow mx-2 h-3 rounded-md"
            />
            <button
              onClick={() => setQuantity((prev) => Math.min(prev + 1, 10))}
              className="flex items-center justify-center w-8 h-8 rounded-lg border border-gray-200 font-bold text-xl"
            >
              <h3 className="text-2xl">+</h3>
            </button>
          </div>
          <div className="flex justify-between mb-2 font-bold">
            <h2 className="text-sm">Price</h2>
            <h2 className="text-sm">₹ {price}</h2>
          </div>
          <div className="flex items-center mb-2">
            <button
              onClick={() => setPrice((prev) => Math.max(prev - 0.5, 0.5))}
              className="flex items-center justify-center w-8 h-8 rounded-lg border border-gray-200 font-bold text-xl"
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
              onChange={(e) => setPrice(parseFloat(e.target.value))}
              className="flex-grow mx-2 h-3 rounded-md"
            />
            <button
              onClick={() => setPrice((prev) => Math.min(prev + 0.5, 9.5))}
              className="flex items-center justify-center w-8 h-8 rounded-lg border border-gray-200 font-bold text-xl"
            >
              <h3 className="text-2xl">+</h3>
            </button>
          </div>
          <div className="flex justify-between mb-2 text-sm font-medium">
            <span className="text-gray-500 ml-auto pr-1">
              {getAvailableQuantity()} qty avl
            </span>
          </div>
          <hr
            className="border-dotted border-gray-400 mb-4"
            style={{ borderTop: "2px dotted #ccc" }}
          />
          <div className="flex justify-between mb-2">
            <div className="flex flex-col items-center">
              <h5 className="font-bold text-sm text-gray-500">You put</h5>
              <h5 className="text-md font-bold"> ₹ {amount}</h5>
            </div>
            <div className="flex flex-col items-center">
              <h5 className="font-bold text-sm text-gray-500">You get</h5>
              <h5 className="text-md font-bold">₹ {quantity * 10}</h5>
            </div>
          </div>
          <div className="text-center">
            <h4 className="text-red-500 text-sm">
              {isButtonDisabled && "Insufficient Balance"}
            </h4>
            <button
              onClick={handlePlaceOrder}
              disabled={isButtonDisabled}
              className={`w-full py-2 px-4 rounded-lg ${
                isButtonDisabled
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : selected === "yes"
                  ? "bg-green-500 text-white hover:bg-green-600"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              Place Order
            </button>
          </div>
          <h3 className="text-center mt-2 text-sm">
            Your Balance is: {profile.totalBalance}
          </h3>
        </div>
      </div>
    </>
  );
}

export default YesNo;