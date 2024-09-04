import { useState } from "react";
import { rechargeAmtUser } from "../../Apis/User";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Recharge = () => {
  const [formData, setFormData] = useState({
    userId: localStorage.getItem("userId") || "",
    amount: "",
  });
  const [rechargeAmt, setRechargeAmt] = useState(0);
  const [loading, setLoading] = useState(false); // Loading state added
  const navigate = useNavigate();

  const handleAmountChange = (e) => {
    const enteredAmount = parseFloat(e.target.value) || 0;
    setFormData({ ...formData, [e.target.name]: e.target.value });
    const deposit = (enteredAmount * 100) / 128;
    setRechargeAmt(deposit);
  };

  const handleRechargeSubmitBtn = async (e) => {
    e.preventDefault();
    const { amount, userId } = formData;
    if (!amount || !userId) {
      toast.error("Please fill in the amount!");
      return;
    }
    setLoading(true); // Set loading state to true
    try {
      const response = await rechargeAmtUser({ ...formData });
      if (response) {
        toast.success("Balance Updated!");
        navigate("/user/wallet");
      }
    } catch (error) {
      console.error("Recharge Failed!", error);
      toast.error("Recharge Failed!");
      setLoading(false); // Re-enable button if there's an error
    }
  };

  return (
    <div className='flex flex-col items-center justify-center h-full px-4 py-4'>
      <section className="bg-white w-full max-w-md rounded-lg shadow mt-4 mb-4">
        <div className="p-6 space-y-6">
          <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900">
            Recharge
          </h1>
          <form onSubmit={handleRechargeSubmitBtn} className="space-y-6">
            <div>
              <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-900">
                Amount
              </label>
              <input
                type="number"
                name="amount"
                id="amount"
                max="5000"
                value={formData.amount}
                onChange={handleAmountChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5"
                placeholder="Enter recharge amount"
                required
                disabled={loading} // Disable input when loading
              />
            </div>
            <div className='block p-4 bg-gray-50 border border-gray-200 rounded-lg shadow'>
              <div className='flex justify-between mb-3'>
                <p className='text-sm text-gray-500'>Recharge amount</p>
                <p className='text-sm font-semibold'>₹{rechargeAmt.toFixed(2)}</p>
              </div>
              <div className='flex justify-between mb-3'>
                <div className='flex items-center'>
                  <p className='inline-block mr-1 text-sm text-gray-500'>GST applicable</p>
                  <img className='w-3 h-3' src="https://probo.gumlet.io/image/upload/probo_product_images//info_blue.png" alt="GST info" />
                </div>
                <p className='text-sm font-semibold'>-₹{(formData.amount - rechargeAmt).toFixed(2)}</p>
              </div>
              <hr className='my-3'/>
              <div className='flex justify-between mb-3'>
                <p className='text-sm text-gray-500'>Deposit bal. credit</p>
                <p className='text-sm font-semibold'>₹{rechargeAmt.toFixed(2)}</p>
              </div>
              <div className='flex justify-between mb-3'>
                <p className='text-sm text-gray-500'>Promotional bal. credit</p>
                <p className='text-sm text-green-600 font-semibold'>+₹{(formData.amount - rechargeAmt).toFixed(2)}</p>
              </div>
              <div className='flex justify-between mb-3'>
                <p className='text-sm text-green-600 font-bold'>🎉 Recharge Cashback</p>
              </div>
              <hr className='my-3'/>
              <div className='text-right'>
                <p className='text-sm font-semibold'>₹{formData.amount}</p>
                <p className='text-gray-400 text-sm'>Net Balance</p>
              </div>
            </div>
            <button
              type="submit"
              className={`text-white bg-teal-600 py-2 rounded font-bold w-full hover:bg-teal-700 transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading} 
            >
              {loading ? 'Processing...' : 'Recharge'} 
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Recharge;
