import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import imageLogin from "../../Assets/banner12.jpg";
import { loginUser } from "../../Apis/User";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = ({ openLogin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
  });

  const handleFormChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.mobile) {
      toast.error("Please fill in all the fields");
      return;
    }

    try {
      const response = await loginUser(formData.name, formData.mobile);
      if (response) {
        localStorage.setItem("userId", response._id);
        toast.success("Login successful");
        openLogin(false);  // Close the login modal
        window.location.reload();
        navigate("/");
      } else {
        toast.error("Wrong Credentials.");
      }
    } catch (error) {
      toast.error("Login failed, Please Register first.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 w-full h-full z-1000 flex justify-center items-center bg-gray-800 bg-opacity-70">
      <div className="bg-white shadow-lg rounded-lg p-5 md:flex">
        <div className="hidden sm:block">
          <img
            src={imageLogin}
            alt="Login"
            className="w-[400px] h-[400px] object-cover rounded-xl shadow-lg"
          />
        </div>
        <div className="mt-4 w-full md:w-[400px] px-5 text-lg">
          <button className="block ml-auto" onClick={() => openLogin(false)}>
            <IoMdClose />
          </button>
          <div>
            <p className="text-xl font-bold">Login Page</p>
            <p className="text-slate-600 text-sm mt-3">
              Your market, your price, your say
            </p>
          </div>
          <form className="mt-5" onSubmit={handleFormSubmit}>
            <div className="mb-3">
              <label
                htmlFor="name"
                className="block mb-1 text-sm font-medium text-gray-900"
              >
                UserName
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Name"
                required
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="number"
                className="block mb-1 text-sm font-medium text-gray-900"
              >
                Mobile Number
              </label>
              <input
                type="mobile"
                name="mobile"
                value={formData.number}
                onChange={handleFormChange}
                id="number"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Mobile Number"
                required
              />
            </div>
            <div className="flex items-start mb-5">
              <p className="text-gray-400 text-sm">
                By continuing, you accept that you are 18+ years of age & agree
                to the{" "}
                <span className="text-blue-600 text-sm">
                  Terms and Conditions
                </span>
              </p>
            </div>
            <button
              type="submit"
              className="text-white bg-black hover:bg-black-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
