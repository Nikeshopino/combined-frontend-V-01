
import { useState } from 'react';
import { FaInfoCircle } from 'react-icons/fa';
import TradeDetails from './TradeDetails';
import NoDataImg from '../../Assets/noData.png'; // Import the image from your assets

const Portfolio = () => {
  const [activeButton, setActiveButton] = useState('Active Trades'); // State to track which button is active

  const trades = [
    {
      title: 'Kolkata to win the match vs Mumbai?',
      h2h: 'H2H last 5 T20: Kolkata 4, Mumbai 1, DRAW 0',
      matchedQty: 5,
      investedAmount: 30,
      pendingQty: 0,
      profit: 5,
      totalEarning: '30 + 5 = 35',
      logoUrl: 'https://img.freepik.com/free-vector/hand-drawn-ipl-cricket-illustration_23-2149216037.jpg?size=626&ext=jpg',
      status: 'completed',
    },
    {
      title: 'Delhi to win the match vs Chennai?',
      h2h: 'H2H last 5 T20: Delhi 3, Chennai 2, DRAW 0',
      matchedQty: 4,
      investedAmount: 20,
      pendingQty: 1,
      profit: 8,
      totalEarning: '20 + 8 = 28',
      logoUrl: 'https://probo.gumlet.io/image/upload/w_200,h_200/probo_product_images/IMAGE_207fe0ff-6e8a-474a-a762-08ebbf2e36b8.png',
      status: 'completed',
    },
    // Add more trades as needed
  ];

  // Determine the filtered trades based on the active button
  const filteredTrades =
    activeButton === 'Active Trades'
      ? trades.filter((trade) => trade.status === 'ongoing')
      : trades.filter((trade) => trade.status === 'completed');

  return (
    <div >
      {/* Top Buttons for Active and Close Trades */}
      <div className="flex space-x-0 border border-gray-200 rounded-md shadow-sm">
        <button
          className={`flex-1 py-4 text-xl font-bold ${
            activeButton === 'Active Trades' ? 'border-b-4 border-blue-500' : 'border-b-4 border-transparent'
          }`}
          onClick={() => setActiveButton('Active Trades')}
        >
          Active Trades
        </button>
        <button
          className={`flex-1 py-4 text-xl font-bold ${
            activeButton === 'Close Trades' ? 'border-b-4 border-blue-500' : 'border-b-4 border-transparent'
          }`}
          onClick={() => setActiveButton('Close Trades')}
        >
          Close Trades
        </button>
      </div>

      {/* Profile Summary Section */}
      <div className="mt-4 border border-gray-200 rounded-md shadow-sm">
        <div className="flex justify-between items-center py-4 border-b border-gray-200">
          <h2 className="text-xl ml-2 font-bold">Profile Summary</h2>
          <FaInfoCircle className="text-2xl mr-2" />
        </div>
        <div className="flex items-center py-4">
          <div className="flex-1 text-center">
            <h5 className="text-gray-500 mb-2">Total Invested</h5>
            <h1 className="text-xl font-bold">600</h1>
          </div>
          <div className="border-l border-gray-400 h-12"></div> {/* Adjust height as needed */}
          <div className="flex-1 text-center">
            <h5 className="text-gray-500 mb-2">Total Earning</h5>
            <h1 className="text-xl font-bold">500</h1>
          </div>
        </div>
      </div>

      {/* Dynamic Trade Details Rendering */}
      <div>
        {filteredTrades.length > 0 ? (
          filteredTrades.map((trade, index) => (
            <TradeDetails
              key={index}
              title={trade.title}
              h2h={trade.h2h}
              matchedQty={trade.matchedQty}
              investedAmount={trade.investedAmount}
              pendingQty={trade.pendingQty}
              profit={trade.profit}
              totalEarning={trade.totalEarning}
              logoUrl={trade.logoUrl}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center mt-8">
            <img src={NoDataImg} alt="No Data" className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6" />
            <p className="text-center text-gray-500 mt-4">No trades available for the selected category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Portfolio;
