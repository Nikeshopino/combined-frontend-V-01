import axios from "axios";

const BACKEND_URL = `https://yoursay-backendrender.onrender.com/v1`;
//const BACKEND_URL = `https://yoursay.live/v1`;
// const BACKEND_URL = `http://localhost:8000/v1`;
export const getAllEvents = async() => {
    try {
        const reqUrl = `${BACKEND_URL}/all-event`;
        const response = await axios.get(reqUrl);
        // console.log(response.data)
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const getAllEventById = async(eventId) => {
    try {
        const reqUrl = `${BACKEND_URL}/event/${eventId}`;
        // console.log(`Requesting URL: ${reqUrl}`);
        const response = await axios.get(reqUrl);
        // console.log(`event single data:`, response.data);
        return response.data;
    } catch (error) {
        console.error(`Error fetching event by ID: ${error}`);
        throw error; // Re-throw the error to handle it in the calling function
    }
};


export const getOrderbook  = async(eventId) =>{
    try {
        const reqUrl = `${BACKEND_URL}/cumulative-orderbook/${eventId}`;
        const response = await axios.get(reqUrl);
        // console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(`Error fetching event by ID: ${error}`);
        throw error; // Re-throw the error to handle it in the calling function
    }
}

export const getAvlOrderbook  = async(eventId) =>{
    try {
        const reqUrl = `${BACKEND_URL}/avl-orderbook/${eventId}`;
        const response = await axios.get(reqUrl);
        // console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(`Error fetching event by ID: ${error}`);
        throw error; // Re-throw the error to handle it in the calling function
    }

}

export const getActivityBar  = async(eventId) =>{
    try {
        const reqUrl = `${BACKEND_URL}/activity-bar/${eventId}`;
        const response = await axios.get(reqUrl);
        // console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(`Error fetching event by ID: ${error}`);
        throw error; // Re-throw the error to handle it in the calling function
    }

}



export const getSortedEvents = async (parentCategory = "") => {
  try {
    const response = await axios.get(
      `/api/events/getSortedFilteredEvents${parentCategory ? `?parentCategory=${encodeURIComponent(parentCategory)}` : ""}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
};

export const getParentCategory = async (parentCategory) => {
    try {
        const reqUrl = `${BACKEND_URL}/events?parentCategory=${parentCategory}`;

        const response = await axios.get(reqUrl);
        // console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
export const getSubCategory = async (subCategory) => {
    try {
        const reqUrl = `${BACKEND_URL}/events?subCategory=${subCategory}`;

        const response = await axios.get(reqUrl);
        // console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const getAllEventsByCategory = async(categoryName) => {
    try {
        const reqUrl = `${BACKEND_URL}/events?parentCategory=${categoryName}`;
        const response = await axios.get(reqUrl);
        // console.log(response.data)
        return response.data;
    } catch (error) {
        console.log(error);
    }

};
export const getAllEventBySubCategory =async(parentCategory,subCategory) => {
    try {
        const reqUrl = `${BACKEND_URL}/events?parentCategory=${parentCategory}&subCategory=${subCategory}`;
        const response = await axios.get(reqUrl);
        // console.log(response.data)
        return response.data;
    } catch (error) {
        console.log(error);
    }

};