import { useState, useEffect } from 'react';
import { getUserTransactionHistory } from '../../Apis/User';

const Tradehistory = () => {
  const [account, setAccount] = useState(true);
  const [activeButton, setActiveButton] = useState('All');
  const [transactions, setTransactions] = useState([]);
  // console.log(transactions)

  useEffect(() => {
    const fetchUserTransactionHistory = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (userId) {
          const response = await getUserTransactionHistory(userId);
          // console.log("User Transaction History:", response);
          setTransactions(response); // Adjust according to the API response structure
        } else {
          console.log("No userId found in local storage.");
        }
      } catch (error) {
        console.error("Error fetching user transaction history:", error);
      }
    };

    fetchUserTransactionHistory();
  }, []); // Empty dependency array ensures this runs only once on component mount

  const buttonClasses = (button) =>
    `text-white text-md w-full font-medium rounded-md lg:px-5 px-2 py-2.5 me-2 mb-2 focus:outline-none ${
      activeButton === button
        ? 'bg-blue-800 hover:bg-blue-900 dark:bg-blue-900 dark:hover:bg-blue-950 dark:focus:ring-blue-900'
        : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
    }` +
    (activeButton === button
      ? ' bg-gradient-to-b from-[#0551F6] to-[#0D3A9D]'
      : ' bg-gradient-to-b from-[#0551F6] to-[#0D3A9D] opacity-80');

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  const handleOnClick = (click) => {
    if (click === 'account') {
      setAccount(true);
    }
  };

  return (
    <div>
      <div className='flex flex-col justify-center items-center w-full'>
        <div className='flex flex-col justify-center items-center border-solid border-2 bg-white rounded-b-lg p-2 w-full lg:w-3/5'>
          <div className='flex lg:justify-center lg:items-center bg-white p-2 w-full'>
            <div className='font-semibold w-full text-center'>
              <p onClick={() => handleOnClick('account')}>Account</p>
              {account && (
                <div className='mt-1'>
                  <hr className='border-2 rounded-xl border-blue-500' />
                </div>
              )}
            </div>
          </div>

          <div className='w-full'>
            {account && (
              <div className='flex'>
                <div className='m-2 w-1/4'>
                  <button
                    type='button'
                    className={buttonClasses('All')}
                    onClick={() => handleButtonClick('All')}
                  >
                    All
                  </button>
                </div>
                </div>
            )}
          </div>
        </div>

        {transactions.map((item, index) => (
          <div
            key={index}
            className='border-solid border-2 bg-white rounded-xl p-4 w-full md:w-4/5 lg:w-3/5 mt-2'
          >
            <button
              className='text-white text-xs font-medium py-1 px-2 rounded-md focus:outline-none'
              style={{
                background: 'linear-gradient(to bottom, #00FF90 0%, #007542 100%)',
              }}
            >
              {item.transactionType}
            </button>
            <div className='flex justify-between'>
              <p className='font-semibold'>{item.eventTitle}</p>
              <p className='text-blue-600 font-semibold'>{item.amount}</p>
            </div>
            <p className='text-xs text-gray-500 mb-2'>{new Date(item.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>

            <hr />
            <div className='flex justify-between'>
              <p className='text-gray-500'>Order id:</p>
              <p className='text-gray-500'>{item.userId}</p>
            </div>
            <div className='flex justify-between'>
              <p className='text-gray-500'>Currency Type:</p>
              <p className='text-gray-500'>{item.currencyType}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tradehistory;
