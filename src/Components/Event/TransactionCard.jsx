const TransactionCard = ({ yesPrice, noPrice, yesUser, noUser, timeAgo }) => {
    // Calculate the percentage widths for the blue and green segments
    const total = yesPrice + noPrice;
    const yesPercentage = (yesPrice / total) * 100;
    const noPercentage = (noPrice / total) * 100;
  
    return (
      <div className="flex items-center justify-between border p-3 rounded-md shadow-sm bg-white mb-4" style={{ width: '100%' }}>
        {/* Yes User */}
        <div className="flex flex-col items-center">
          <div className="bg-blue-100 p-1 rounded-full shadow-sm">
            <span role="img" aria-label="user-icon" className="text-lg">👤</span>
          </div>
          <div className="mt-1 font-semibold text-xs">{yesUser}</div>
        </div>
  
        {/* Price Bar */}
        <div className="flex-1 mx-3 text-center">
          <div className="flex h-5 rounded-full overflow-hidden">
            {/* Yes Price */}
            <div
              className="flex items-center justify-center text-white font-bold h-full"
              style={{
                width: `${yesPercentage}%`,
                backgroundColor: '#007bff',
                fontSize: '0.8rem'
              }}
            >
              ₹{yesPrice}
            </div>
  
            {/* No Price */}
            <div
              className="flex items-center justify-center text-white font-bold h-full"
              style={{
                width: `${noPercentage}%`,
                backgroundColor: '#28a745',
                fontSize: '0.8rem'
              }}
            >
              ₹{noPrice}
            </div>
          </div>
          <div className="text-black-500 text-xs mt-1">{timeAgo}</div>
        </div>
  
        {/* No User */}
        <div className="flex flex-col items-center">
          <div className="bg-green-100 p-1 rounded-full shadow-sm">
            <span role="img" aria-label="user-icon" className="text-lg">👤</span>
          </div>
          <div className="mt-1 font-semibold text-xs">{noUser}</div>
        </div>
      </div>
    );
  };
  
  export default TransactionCard;