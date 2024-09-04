import { useMediaQuery } from "react-responsive";
import EventDetail from "../Components/Event/Eventdetails";
import MobileEvenDetailPage from "../MobilePages/MobileEvenDetailPage";
function Eventdetailspage() {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isDesktop = useMediaQuery({ minWidth: 768 });
  return (
    <>
       {isDesktop && <div className="flex justify-center w-full lg:w-[83%]  mx-auto">
        <EventDetail />
      </div>}
      {isMobile && <MobileEvenDetailPage/>}
    </>

  )
}

export default Eventdetailspage