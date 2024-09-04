import { TfiHeadphoneAlt } from "react-icons/tfi";
import { FaRupeeSign, FaRegUser } from "react-icons/fa";
import { IoMdShare } from "react-icons/io";
import { TbAdjustmentsShare } from "react-icons/tb";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../Store/userSlice";


const MobileProfile = () => {
    const dispatch = useDispatch();
    const { profile} = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getUserProfile());
    }, [dispatch]);
    
    
    if (!profile) {
        return <div>Loading...</div>; 
    }
  return (
    <div className="">
      <div>
        <div className="bg-white text-gray-900 min-h-screen p-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col items-center">
              <div className="mb-4">
                {/* Uncomment and add profile image if needed */}
                <img
                  className="w-32 h-32 rounded-full"
                  src="data:image/png;base64,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"
                  alt="Profile"
                />
              </div>
              <div className="text-center">
                <h1 className="text-2xl font-bold">{profile.name}</h1>
                <p className="text-gray-500 mb-4">Beginner</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
              <div className="bg-gray-50 border border-gray-300 rounded-lg shadow-sm p-4 flex-1 text-center">
                <div className="flex justify-center items-center text-2xl mb-2">
                  <FaRupeeSign />
                  <p className="ml-2">{parseFloat(profile.totalBalance).toFixed(2)}</p>
                </div>
                <p className="text-blue-700 font-semibold">Current Balance</p>
              </div>
              <div className="bg-gray-50 border border-gray-300 rounded-lg shadow-sm p-4 flex-1 text-center">
                <div className="flex justify-center items-center text-2xl mb-2">
                  <FaRupeeSign />
                  <p className="ml-2">{parseFloat(profile.winningsBalance).toFixed(2)}</p>
                </div>
                <p className="text-green-500 font-semibold">Winning Balance</p>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm mt-4 p-4">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="text-2xl mr-4">
                      <TfiHeadphoneAlt />
                    </div>
                    <div>
                      <p className="font-semibold text-lg">Help</p>
                      <p className="text-gray-500">
                        For all balance debits & credits
                      </p>
                    </div>
                  </div>
                  <svg
                    className="w-6 h-6 sm:w-8 sm:h-8 text-gray-500 hover:text-gray-700 cursor-pointer"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
                <hr />
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="text-2xl mr-4">
                      <IoMdShare />
                    </div>
                    <div>
                      <p className="font-semibold text-lg">Invite and earn</p>
                      <p className="text-gray-500">
                        For all balance debits & credits
                      </p>
                    </div>
                  </div>
                  <svg
                    className="w-6 h-6 sm:w-8 sm:h-8 text-gray-500 hover:text-gray-700 cursor-pointer"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
                <hr />
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="text-2xl mr-4">
                      <TbAdjustmentsShare />
                    </div>
                    <div>
                      <p className="font-semibold text-lg">YourSay course</p>
                      <p className="text-gray-500">
                        For all balance debits & credits
                      </p>
                    </div>
                  </div>
                  <svg
                    className="w-6 h-6 sm:w-8 sm:h-8 text-gray-500 hover:text-gray-700 cursor-pointer"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
                <hr />
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="text-2xl mr-4">
                      <TfiHeadphoneAlt />
                    </div>
                    <div>
                      <p className="font-semibold text-lg">
                        Terms and conditions
                      </p>
                      <p className="text-gray-500">
                        For all balance debits & credits
                      </p>
                    </div>
                  </div>
                  <svg
                    className="w-6 h-6 sm:w-8 sm:h-8 text-gray-500 hover:text-gray-700 cursor-pointer"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
                <hr />
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="text-2xl mr-4">
                    <FaRegUser />
                    </div>
                    <div>
                      <p className="font-semibold text-lg">Log Out</p>
                      <p className="text-gray-500">Log out user</p>
                    </div>
                  </div>
                  <svg
                    onClick={() => {
                      localStorage.clear(); // Clear local storage
                      window.location.reload(); // Refresh the app
                    }}
                    className="w-6 h-6 sm:w-8 sm:h-8 text-gray-500 hover:text-gray-700 cursor-pointer"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H5a3 3 0 01-3-3V5a3 3 0 013-3h5a3 3 0 013 3v1"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MobileProfile;
