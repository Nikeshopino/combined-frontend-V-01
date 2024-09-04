import { useState, useEffect } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaUserCircle } from "react-icons/fa";
import { IoWalletOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import Logo from "../../Assets/new logo.png";
import { useSelector, useDispatch } from "react-redux";
import { getUserProfile } from "../../Store/userSlice";

const Header = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.user);

  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userId, setUserId] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    setUserId(storedUserId);
  }, []);

  const handleSuccess = () => {
    setUserId(localStorage.getItem("userId"));
    setOpenLogin(false);
    setOpenRegister(false);
    navigate("/");
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    if (userId) {
      dispatch(getUserProfile());
    }
  }, [dispatch, userId]);

  return (
    <header className="sticky top-0 z-50">
      <div
        className="flex justify-between items-center p-4 pr-4 bg-white border-b-[0.5px] mb-4 border-gray-800 sm:h-[40px] md:h-[40px]"
        style={{ height: "100px" }}
      >
        <div className="flex items-center">
        <Link to="/" className="m-2 text-base sm:text-xl px-2">
          <div className="cursor-pointer">
            <img
              src={Logo}
              alt="Logo"
              className="h-10 w-auto sm:h-20 md:h-22" // Adjust logo size for different screen sizes
            />
          </div>
          </Link>

          <nav className="hidden md:flex items-center ml-4">  
            {userId && (
              <Link
                to="/user/portfolio"
                className="m-2 text-base sm:text-xl px-2"
              >
                <p className="text-black cursor-pointer">Portfolio</p>
              </Link>
            )}
          </nav>
        </div>
        <div className="flex items-center">
          {!userId ? (
            <>
              <button
                onClick={() => setOpenLogin(true)}
                type="button"
                className="md:flex mx-2 text-white text-sm sm:text-lg bg-gradient-to-b from-blue-500 to-blue-800 hover:bg-blue-900 font-semibold rounded-lg px-2 sm:px-5 py-2 text-center inline-flex items-center"
              >
                Login
              </button>
              <button
                onClick={() => setOpenRegister(true)}
                type="button"
                className="md:flex text-white text-sm sm:text-lg bg-gradient-to-b from-blue-500 to-blue-800 hover:bg-blue-900 font-bold rounded-lg px-2 sm:px-5 py-2 text-center inline-flex items-center"
              >
                Register
              </button>
            </>
          ) : (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-4 border-0.3 rounded-lg">
                <button
                  type="button"
                  className="hidden md:flex text-white text-sm sm:text-lg bg-gradient-to-b from-[#0551F6] to-[#0D3A9D] hover:bg-[#0D3A9D] focus:ring-4 focus:outline-none focus:ring-[#0D3A9D] font-bold rounded-lg px-2 sm:px-5 py-2 text-center inline-flex items-center border border-transparent hover:border-2 hover:border-white"
                >
                  Download App
                </button>
              </div>

              <Link to="/user/wallet">
                <div className="hidden md:flex items-center text-black bg-white rounded-lg px-4 py-3 mr-4">
                  <IoWalletOutline className="text-lg sm:text-2xl mr-2" />
                  <span className="text-sm sm:text-lg">₹{profile ? profile.totalBalance : "0"}</span>
                </div>
              </Link>
              <div className="relative hidden md:flex">
                <Link to="/user/profile">
                  <FaUserCircle
                    className="text-black text-4xl cursor-pointer mr-4"
                    onClick={toggleDropdown}
                  />
                </Link>
              </div>
            </div>
          )}
          <div className="md:hidden flex items-center">
            <Link to="/user/wallet">
              <div className="flex items-center text-white rounded-lg px-3 py-1 mr-2">
                <IoWalletOutline className="text-lg mr-2" />
                <span className="text-sm">₹ 100</span>
              </div>
            </Link>
            <RxHamburgerMenu
              className="text-black text-2xl cursor-pointer"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            />
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="flex flex-col md:hidden bg-[#272727] p-4">
          <Link to="/" className="text-white text-lg py-2">
            Home
          </Link>
          {userId && (
            <>
              <Link to="/user/portfolio" className="text-white text-lg py-2">
                Portfolio
              </Link>
              <Link to="/user/profile" className="text-white text-lg py-2">
                Profile
              </Link>
              <Link to="/user/wallet" className="text-white text-lg py-2">
                Wallet
              </Link>
              <button
                type="button"
                className="text-white text-lg bg-gradient-to-b from-[#0551F6] to-[#0D3A9D] hover:bg-[#0D3A9D] focus:ring-4 focus:outline-none focus:ring-[#0D3A9D] font-bold rounded-lg px-5 py-2 text-center mt-2"
              >
                Download App
              </button>
            </>
          )}
        </div>
      )}

      {openLogin && (
        <Login
          openLogin={() => setOpenLogin(false)}
          onSuccess={handleSuccess}
        />
      )}

      {openRegister && (
        <Register
          openRegister={() => setOpenRegister(false)}
          onSuccess={handleSuccess}
        />
      )}
    </header>
  );
};

export default Header;
