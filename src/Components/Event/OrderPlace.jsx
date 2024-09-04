import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { createOrder } from "../../Apis/Order";
import { getOrderbook } from "../../Apis/Event";

import { useSelector, useDispatch } from "react-redux";
import { getUserProfile } from "../../Store/userSlice";

function OrderPlace({
  handleModalToggle,
  currentEvent,
  preSelectedButton,
  eventId,
}) {
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
  // console.log(avlQty);
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

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
    // console.log("button clicked", value);
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
      // handleModalToggle();
    } catch (error) {
      toast.error("Error placing order");
      console.error("Error placing order:", error);
    }
  };

  const isButtonDisabled = amount > balance;
  return (
    <div>
      <div
        key={eventId}
        className="bg-white rounded-lg p-2 sm:p-4 flex   space-y-2 sm:space-y-4 "
      >
        <div className="flex justify-between items-center">
          <div className="flex justify-between">
            <div className="flex-1 ">
              <h3 className="font-bold lg:text-md sm:text-md">
                {currentEvent.title}
              </h3>
            </div>
            <div className="flex-none">
              <img
                src={currentEvent.icons}
                alt={currentEvent.icons}
                className="w-10 h-10 sm:w-10 sm:h-10 md:w-20 md:h-20 lg:w-14 lg:h-14 xl:w-18 xl:h-15 rounded-full"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex rounded-xl border border-gray-100 shadow-md">
        <button
          onClick={() => handleButtonClick("yes")}
          className={`rounded-xl px-2 sm:px-4 sm:py-2 flex-1 font-semibold  ${
            selected === "yes"
              ? "bg-green-500 text-white"
              : "bg-white text-black"
          }`}
        >
          <p className="text-sm">
            Yes ₹ <span>{currentEvent.currentYesPrice}</span>
          </p>
        </button>
        <button
          onClick={() => handleButtonClick("no")}
          className={`rounded-xl px-2 sm:px-4 sm:py-2 flex-1 font-semibold ${
            selected === "no"
              ? "bg-blue-500 text-white"
              : "bg-white text-black"
          }`}
        >
          <p className="text-sm">
            No ₹ <span>{currentEvent.currentNoPrice}</span>
          </p>
        </button>
      </div>

      <div>
        <div className="flex justify-between mb-2 mt-2 font-bold">
          <h2 className="text-sm">Quantity</h2>
          <h2 className="text-sm">{quantity}</h2>
        </div>
        <div className="flex items-center mb-2">
          <button
            onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
            className="flex items-center justify-center w-8 h-8 bg-white border border-gray-400 rounded-xl text-xl"
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
            className="flex-grow mx-2 rounded-md "
          />
          <button
            onClick={() => setQuantity((prev) => Math.min(prev + 1, 10))}
            className="flex items-center justify-center w-8 h-8 bg-white border border-gray-400 rounded-xl text-xl"
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
            className="flex items-center justify-center w-8 h-8 bg-white border border-gray-400 rounded-xl  text-xl"
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
            className="flex items-center justify-center w-8 h-8 bg-white border border-gray-400 rounded-xl text-xl"
          >
            <h3 className="text-2xl">+</h3>
          </button>
        </div>

        <div className="flex justify-between mb-2 text-sm font-medium">
          <span className="text-gray-500 ml-auto pr-1">
            {getAvailableQuantity()} qty avl
          </span>
        </div>

        <hr />
        <div className="flex justify-between">
          <div>
            <p className="text-gray-600 text-md">Invest</p>
            <p className="text-sm font-bold">₹ {amount}</p>
          </div>

          <div>
            <p className="text-right text-gray-600 text-md">You get</p>
            <p className="text-blue-500 text-sm">{quantity * 10}</p>
          </div>
        </div>
        <div className="mt-2 flex justify-center">
          <div className="">
            <button
              onClick={handlePlaceOrder}
              disabled={isButtonDisabled}
              className={`rounded-lg px-2 sm:px-4 sm:py-2 flex-1 ${
                isButtonDisabled
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : selected === "yes"
                  ? "bg-green-500 text-white hover:bg-green-600"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              <p className="font-semibold">Tap to invest</p>
            </button>
          </div>
        </div>
        {/* <h3 className="text-center mt-2 text-sm">
            Your Balance is: {profile.totalBalance}
          </h3> */}
      </div>
    </div>
  );
}

export default OrderPlace;
