/* eslint-disable react/prop-types */
import {  Routes, Route, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Homepage from "./Pages/Homepage";
import Profilepage from "./Pages/Profilepage";
import Walletpage from "./Pages/Walletpage";
import Eventdetailspage from "./Pages/Eventdetailspage";
import Rechargepage from "./Pages/Rechargepage";
import Transactionpage from "./Pages/Transactionpage";
import Kyc from "./Components/Kyc/Kyc";
import SubmitKyc2 from "./Components/Kyc/SubmitKyc2";
import Header from "./Components/Headers/Header";
import Portfoliopage from "./Pages/Portfoliopage";
import ParentCategory from "./Pages/ParentCategory";
import SubCategory from "./Pages/SubCategory";
import { useMediaQuery } from "react-responsive";
import { useEffect } from "react";
import MobilePortfolioPage from "./MobilePages/MobilePortfolioPage";
import MobileCategory from "./MobileComponents/MobileCategory";
import MobileLoginPage from "./MobileComponents/MobileLoginPage";
import MobileRegistrationPage from "./MobileComponents/MobileRegistrationPage";
import MobileSubCategory from "./MobileComponents/MobileSubCategory";

export default function App() {
  const isDesktop = useMediaQuery({ minWidth: 768 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const navigate = useNavigate();

  useEffect(() => {
    if (isMobile) {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        navigate("/mobile/login");
      }
      else{
        navigate("/")
      }
    }
    else{
      navigate("/")
    }
  }, [isMobile]);

  return (
   <>
      {isDesktop && <Header />}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/event/:eventId" element={<Eventdetailspage />} />
        {/* User Private Routes ::*/}
        <Route path="/user/profile" element={<Profilepage />} />
        <Route path="/user/wallet" element={<Walletpage />} />
        <Route path="/user/recharge" element={<Rechargepage />} />
        <Route path="/user/trade-history" element={<Transactionpage />} />
        <Route path="/user/portfolio" element={<Portfoliopage />} />
        {/* SubCategory ::*/}
        <Route path="/events/:parentCategory" element={<ParentCategory />} />
        <Route
          path="/events/subCategory/:subCategory"
          element={<SubCategory />}
        />
        {/* User KYC-Routes ::*/}
        <Route path="/user/kyc" element={<Kyc />} />
        <Route path="/user/kyc/submit" element={<SubmitKyc2 />} />

        {/* mobile Specific Routes */}
        <Route path="/mobile/user/portfolio" element={<MobilePortfolioPage />} />
        <Route path="/mobile/user/wallet" element={<Walletpage />} />
        <Route path="/mobile/user/profile" element={<Profilepage />} />
        <Route path="/mobile/register" element = {<MobileRegistrationPage/>}/>
        <Route path="/mobile/category/:categoryName" element={<MobileCategory />} />
        <Route path="/mobile/subcategory/:parentCategory/:subCategory" element={<MobileSubCategory />} />
        <Route path="/mobile/login" element={<MobileLoginPage />} />

      </Routes>
      <ToastContainer position="top-right" autoClose={500} />
 </>
  );
}
