import Banner from "../Components/Headers/Banner";
import Category from "../Components/Headers/Category";
import Event from "../Components/Event/Event";

import Navbar from "../Components/Headers/Navbar";
import { useMediaQuery } from "react-responsive";
import MobileHomePage from "../MobilePages/MobileHomePage";
function Homepage() {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isDesktop = useMediaQuery({ minWidth: 768 });
  return (
    <>
      {isDesktop &&  <><div className="flex justify-center w-full lg:w-[78%] mx-auto">
        <Navbar />
      </div>
      <div className="w-full lg:w-[78%] mx-auto flex justify-center mb-1">
        {/* <div className="h-0.5 bg-gray-600 w-full "></div> */}
      </div>
      <div className="flex justify-center w-full lg:w-[78%]  mx-auto">
        <Category />
      </div>
      <div className="flex justify-center w-full lg:w-[79%] mt-1  mx-auto">
        <Banner />
      </div>
      <div className="flex justify-center w-full lg:w-[82%]  mx-auto">
        <Event />
      </div>
      </>}
      {isMobile && <MobileHomePage className='bg-[#f4f4f4]'/>}
    </>
  );
}

export default Homepage;
