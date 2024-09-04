import React from 'react';
import './spinner.css'
import { DotLoader } from 'react-spinners';
const Spinner = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-40 z-50">
      {/* <div className="loader"></div> */}
      <DotLoader color='#144CC7' size={70} speedMultiplier={3}/>
    </div>
  );
};

export default Spinner;
