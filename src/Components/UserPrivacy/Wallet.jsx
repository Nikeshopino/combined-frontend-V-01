import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaRupeeSign } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { getUserProfile } from "../../Store/userSlice";
import { useEffect } from "react";
const Wallet = () => {
  const Notavailable = () => {
    toast.error("This service is under development...", {
      style: { width: "400px" },
    });
  };
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

if(!profile){
  return <div>Loading...</div>
} 
  return (
    <div className="">
      <div className="space-y-4 sm:space-y-6">
        {/* Total Balance */}
        <div className="text-center">
          <p className="mt-1 sm:mt-2 text-sm sm:text-base md:text-lg">
            Total balance
          </p>
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold leading-none tracking-tight text-gray-800">
            <div className="flex items-center justify-center">
              <FaRupeeSign className="mr-1" />
              {parseFloat(profile?.totalBalance).toFixed(2)}
            </div>
          </h1>
        </div>
        {/* Deposit Card */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-2 sm:p-4 flex flex-row items-center justify-between">
          <div className="flex items-center flex-grow">
            <img
              className="w-10 h-10 sm:w-12 sm:h-12"
              src="https://probo.gumlet.io/image/upload/probo_product_images/deposit_wallet_icon.png"
              alt="Deposit"
            />
            <div className="ml-2 sm:ml-4">
              <h5 className="text-sm sm:text-md font-medium text-gray-900">
                Recharge Deposit
              </h5>
              <div className="flex items-center text-lg sm:text-xl font-bold leading-none tracking-tight text-gray-900">
                <FaRupeeSign className="mr-1" />
                {parseFloat(profile.rechargeDepositBalance).toFixed(2)}
              </div>
            </div>
          </div>
          <div className="flex-shrink-0">
            <Link to="/user/recharge">
              <button
                type="button"
                className="text-white hover:opacity-80 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm sm:text-md bg-gradient-to-b from-[#0551F6] to-[#0D3A9D] px-3 sm:px-4 py-1.5 sm:py-2"
              >
                Recharge
              </button>
            </Link>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-2 sm:p-4 flex flex-row items-center justify-between">
          <div className="flex items-center flex-grow">
            <img
              className="w-10 h-10 sm:w-12 sm:h-12"
              src="https://probo.gumlet.io/image/upload/probo_product_images/trading_balance.png"
              alt="Deposit"
            />
            <div className="ml-2 sm:ml-4">
              <h5 className="text-sm sm:text-md font-medium text-gray-900">
                Trade Deposit
              </h5>
              <div className="flex items-center text-lg sm:text-xl font-bold leading-none tracking-tight text-gray-900">
                <FaRupeeSign className="mr-1" />
                {parseFloat(profile.tradeDepositBalance).toFixed(2)}
              </div>
            </div>
          </div>
        </div>
        {/* Winnings Card */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-2 sm:p-4 flex flex-row items-center justify-between">
          <div className="flex items-center flex-grow">
            <img
              className="w-10 h-10 sm:w-12 sm:h-12"
              src="https://probo.gumlet.io/image/upload/probo_product_images/winnings_wallet_icon.png"
              alt="Winnings"
            />
            <div className="ml-2 sm:ml-4">
              <h5 className="text-sm sm:text-md font-medium text-gray-900">
                Winnings
              </h5>
              <div className="flex items-center text-lg sm:text-xl font-bold leading-none tracking-tight text-gray-900">
                <FaRupeeSign className="mr-1" />
                {parseFloat(profile.winningsBalance).toFixed(2)}
              </div>
            </div>
          </div>
          <div className="flex-shrink-0">
            <button
              type="button"
              onClick={Notavailable}
              className="text-white hover:opacity-80 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm sm:text-md bg-gradient-to-b from-[#0551F6] to-[#0D3A9D] px-3 sm:px-4 py-1.5 sm:py-2"
            >
              Withdraw
            </button>
          </div>
          
        </div>
        {/* Promotional Card */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-2 sm:p-4 flex flex-row items-center justify-between">
          <div className="flex items-center flex-grow">
            <img
              className="w-10 h-10 sm:w-12 sm:h-12 "
              src="https://probo.gumlet.io/image/upload/probo_product_images/promotional_wallet_icon.png"
              alt="Promotional"
            />
            <div className="ml-2 sm:ml-4">
              <h5 className="text-sm sm:text-md font-medium text-gray-900">
                Promotional
              </h5>
              <div className="flex items-center text-lg sm:text-xl font-bold leading-none tracking-tight text-gray-900">
                <FaRupeeSign className="mr-1" />
                {parseFloat(profile.promotionalBalance).toFixed(2)}
              </div>
            </div>
          </div>
          <div className="flex-shrink-0">
            <Link>
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
            </Link>
          </div>
        </div>
        <h2 className="font-bold tracking-wide">Quick Actions</h2>
        <div className="flex flex-col bg-white border border-gray-200 rounded-lg shadow-md p-2 sm:p-4">
          {/* Transaction History */}
          <div className="mb-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="m-1 sm:m-2">
                  <img
                    className="w-10 h-10 sm:w-12 sm:h-12"
                    src="https://probo.gumlet.io/image/upload/probo_product_images/transaction_v2.png"
                    alt="Transaction History"
                  />
                </div>
                <Link to="/user/trade-history">
                  <div className="m-1 sm:m-2">
                    <div className="flex flex-col">
                      <p className="font-semibold text-sm sm:text-lg">
                        Transaction History
                      </p>
                      <p className="text-gray-500 text-xs sm:text-sm">
                        For all balance debits & credits
                      </p>
                    </div>
                  </div>
                </Link>
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
          </div>
          <hr />
          {/* KYC Verification */}
          <div className="mb-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="m-1 sm:m-2">
                  <img
                    className="w-10 h-10 sm:w-12 sm:h-12"
                    src="https://probo.gumlet.io/image/upload/probo_product_images/kyc_v2.png"
                    alt="KYC Verification"
                  />
                </div>
                <Link to="/user/kyc">
                <div className="m-1 sm:m-2">
                  <div className="flex flex-col">
                    <p className="font-semibold text-sm sm:text-lg">
                      KYC verification
                    </p>
                    <p className="text-yellow-500 text-xs sm:text-sm">
                      Tap to verify
                    </p>
                  </div>
                </div>
                </Link>
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
          </div>
          <hr />
          {/* Bank Details */}
          <div className="mb-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="m-1 sm:m-2">
                  <img
                    className="w-10 h-10 sm:w-12 sm:h-12"
                    src="https://probo.in/_next/image?url=https%3A%2F%2Fprobo.gumlet.io%2Fimage%2Fupload%2Fprobo_product_images%2Fgauge_icon_v2.png&w=64&q=75"
                    alt="Bank Details"
                  />
                </div>
                <div className="m-1 sm:m-2">
                  <div className="flex flex-col">
                    <p className="font-semibold text-sm sm:text-lg">Bank Details</p>
                    <p className="text-gray-500 text-xs sm:text-sm">
                      Manage your bank accounts
                    </p>
                  </div>
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
          </div>
          <hr />
          {/* Help & Support */}
          <div className="mb-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="m-1 sm:m-2">
                  <img
                    className="w-10 h-10 sm:w-12 sm:h-12"
                    src="https://probo.gumlet.io/image/upload/probo_product_images/email_v2.png"
                    alt="Help & Support"
                  />
                </div>
                <div className="m-1 sm:m-2">
                  <div className="flex flex-col">
                    <p className="font-semibold text-sm sm:text-lg">
                      Help & Support
                    </p>
                    <p className="text-gray-500 text-xs sm:text-sm">
                      FAQs, chat, call, or email
                    </p>
                  </div>
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
          </div>
        </div>
      </div>
    </div>
  );
};
export default Wallet;