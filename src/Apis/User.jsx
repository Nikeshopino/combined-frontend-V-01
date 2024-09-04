import axios from "axios";
// const BACKEND_URL = `http://localhost:8000/v1`;
const BACKEND_URL = `https://yoursay-backendrender.onrender.com/v1`;
//const BACKEND_URL = `https://yoursay.live/v1`;
export const loginUser = async(name, mobile) => {
    try {
        const reqUrl = `${BACKEND_URL}/login`;
        const response = await axios.post(reqUrl, { name, mobile });
        localStorage.setItem("userId",response.data._id)
        // console.log(response.data)
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
export const registerUser = async ({name, mobile}) => {
    try {
        const reqUrl = `${BACKEND_URL}/create-user`;
        const response = await axios.post(reqUrl, { name, mobile });
        localStorage.setItem("userId",response.data._id)
        // console.log(response.data._id);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

// Recharge for a user  :: 
export const rechargeAmtUser = async ({userId , amount}) =>{
    try{
        const reqUrl  = `${BACKEND_URL}/recharge`
        const response = await axios.post(reqUrl,{userId , amount});
        // console.log(response)
        return response.data;

    }catch(error){
        console.log(error);
    }
}

// User Profile Data ::
export const getUserProfile = async() => {
    try {
        const userId = localStorage.getItem("userId")
        const reqUrl = `${BACKEND_URL}/profile/${userId}`;
        const response = await axios.get(reqUrl);
        // console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(`Error fetching event by ID: ${error}`);
        throw error; // Re-throw the error to handle it in the calling function
    }
};

//Unmatched-history
export const getUserUnmatchedOrder = async() => {
    try {
        const userId = localStorage.getItem("userId")
        const reqUrl = `${BACKEND_URL}/unmatched-history/${userId}`;
        const response = await axios.get(reqUrl);
        // console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(`Error fetching event by ID: ${error}`);
        throw error; // Re-throw the error to handle it in the calling function
    }
};

//Matched-history
export const getUserMatchedOrder = async() => {
    try {
        const userId = localStorage.getItem("userId")
        const reqUrl = `${BACKEND_URL}/matched-history/${userId}`;
        const response = await axios.get(reqUrl);
        // console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(`Error fetching event by ID: ${error}`);
        throw error; // Re-throw the error to handle it in the calling function
    }
};

export const getUserTransactionHistory = async () => {
    try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
            throw new Error("User ID not found in local storage");
        }
        const response = await axios.get(`${BACKEND_URL}/transaction-history/${userId}`);
        // console.log(response.data)
        return response.data.transactions; // Return only the transactions array
    } catch (error) {
        console.error("Error fetching user transaction history:", error);
        console.error("Error details:", error.response ? error.response.data : error.message);
        return []; // Return an empty array on error
    }
};