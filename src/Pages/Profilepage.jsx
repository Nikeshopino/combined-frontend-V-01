import { useMediaQuery } from "react-responsive";
import Profile from "../Components/UserPrivacy/Profile";
import MobileProfilePage from "../MobilePages/MobileProfilePage";
//import Profile from "../Components/Profile"
function Profilepage() {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isDesktop = useMediaQuery({ minWidth: 768 });
  return (
    <>
      <div className="w-full">
        <div className="w-full lg:w-3/5 mx-auto">
        {isDesktop &&<Profile />}
        {isMobile && <MobileProfilePage/>}
        </div>
      </div>
    </>
  );
}

export default Profilepage;
