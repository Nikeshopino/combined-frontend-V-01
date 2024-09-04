import React from 'react'
import MobileFooter from '../MobileComponents/MobileFooter';
import MobileProfile from '../MobileComponents/MobileProfile';
function MobileProfilePage() {
    return (
        <div>
            <div className='mb-24'><MobileProfile/></div>
            <div style={footerStyle}><MobileFooter currentTab='Profile'/></div>
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
export default MobileProfilePage