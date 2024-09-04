
import { useMediaQuery } from "react-responsive";
import Wallet from "../Components/UserPrivacy/Wallet"
import MobileWalletPage from "../MobilePages/MobileWalletPage";
function Walletpage() {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isDesktop = useMediaQuery({ minWidth: 768 });
  return (
    <>
        <div className="w-full">
        <div className="w-full lg:w-3/5 mx-auto">
        {isDesktop && <Wallet />}
        {isMobile && <MobileWalletPage/>}
        </div>
      </div>
    </>
  )
}

export default Walletpage