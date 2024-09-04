import React from 'react'
import Portfolio from '../Components/UserPrivacy/Portfolio'
import MobileFooter from '../MobileComponents/MobileFooter'

function MobilePortfolioPage() {
  return (
    <div>
        <div className='mb-24'><Portfolio/></div>
        <div style={footerStyle}><MobileFooter currentTab='Portfolio'/></div>
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

export default MobilePortfolioPage