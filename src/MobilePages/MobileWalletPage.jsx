import React from 'react'
import Wallet from '../Components/UserPrivacy/Wallet';
import MobileFooter from '../MobileComponents/MobileFooter';

function MobileWalletPage() {
    return (
        <div className='mx-4'>
            <div className='mb-24 mt-4'><Wallet/></div>
            <div style={footerStyle}><MobileFooter currentTab='Wallet'/></div>
        </div>
      )
    }
    const footerStyle = {
        position: 'fixed',
        bottom: '-5px',
        left: 0,
        width: '100%',
        backgroundColor: '#fff', // Adjust to your footer's background color
        zIndex: 10, // Ensures footer is above other content
      };

export default MobileWalletPage