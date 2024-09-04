import React from 'react';

import { useNavigate } from 'react-router-dom';




const Card = ({ title, year, imgSrc ,clickHandler }) => {
  
  return (
    <div className="bg-white shadow-sm rounded-lg px-2 py-1 w-40 h-18 flex-shrink-0" onClick={clickHandler}> {/* Prevent shrinking with min-width */}
      <div className="flex items-center justify-between space-x-2 h-full">
        <div className="flex flex-col justify-center overflow-hidden">
          <h3 className="text-xs font-semibold overflow-hidden text-ellipsis leading-tight whitespace-normal mb-1">
            {title}
          </h3>
          <p className="text-orange-500 font-medium text-xs">{year}</p>
        </div>
        <img src={imgSrc} alt={title} className="w-12 h-12 " /> 
      </div>
    </div>
  );
};

function MobileCategorySlider({cardData }) {
  const navigate = useNavigate()
  const clickHandler = (parentCategory,subCategory) =>{ 
    navigate(`/mobile/subcategory/${parentCategory}/${subCategory}`)
  }
  return (
    <div className="flex overflow-x-auto whitespace-nowrap gap-2 p-1"> {/* Allow auto scrolling */}
      {cardData.map((card) => (
        <Card key={card.id} title={card.title} year={card.year} imgSrc={card.imgSrc} clickHandler={()=>clickHandler(card.parentCategory,card.path)} />
      ))}
    </div>
  );
}

export default MobileCategorySlider;
