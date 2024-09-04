const TradeDetails = ({ title, h2h, matchedQty, investedAmount, pendingQty, profit, totalEarning, logoUrl }) => {

    return (
      <div className="border border-gray-300 rounded-md p-4 shadow-sm mt-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-bold">{title}</h3>
            <p className="text-gray-500 text-sm">{h2h}</p>
          </div>
          <img src={logoUrl} alt="Match Logo" className="h-12" />
        </div>
  
        <div className="flex justify-between mt-4 text-sm">
          <div>
            <p>Matched Qty : <span className="font-bold">{matchedQty}</span></p>
            <p>Total Invested amount : <span className="font-bold">{investedAmount}</span></p>
          </div>
          <div>
            <p>Pending Qty : <span className="font-bold">{pendingQty}</span></p>
            <p>Profit again : <span className="font-bold">{profit}</span></p>
          </div>
        </div>
  
        <div className="border-t border-dashed border-gray-300 my-4"></div>
  
        <div className="text-right font-bold text-gray-600">
          <span className="text-lg">Total Earning : </span>
          <span className="text-lg ">{totalEarning}</span>
        </div>
      </div>
    );
  };
  export default TradeDetails