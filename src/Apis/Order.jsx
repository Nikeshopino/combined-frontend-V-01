import axios from "axios";
// const BACKEND_URL = `http://localhost:8000/v1`;
const BACKEND_URL = `https://yoursay-backendrender.onrender.com/v1`;
//const BACKEND_URL = `https://yoursay.live/v1`;
export const createOrder = async ({
  userId,
  eventId,
  type,
  price,
  quantity,
}) => {
  try {
    const reqUrl = `${BACKEND_URL}/create-order`;
    const response = await axios.post(reqUrl, {
      userId,
      eventId,
      type,
      price,
      quantity,
    });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};


