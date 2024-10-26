import React from "react";


import { Link } from "react-router-dom";

const Card = ({ item }) => {

  const formatCurrency = (price) => {
    const priceString = price.toString();
    const parts = [];

    for (let i = priceString.length; i > 0; i -= 3) {
      parts.unshift(priceString.slice(Math.max(0, i - 3), i));
    }

    return `$${parts.join(',')}`;
  };
  return (
    <>
      <Link to={`/${item.id}`}>
        <div className=" hover:bg-[#f2f2f2] flex flex-col self-start rounded-lg text-surface shadow-secondary-1  overflow-hidden">
          <div className="h-96 overflow-hidden mx-3 mt-3 mb-3">
            <img
              className="w-full h-auto rounded-md"
              src={item.imgUrl}
              alt="Hollywood Sign on The Hill"
            />
          </div>
          <div className="mx-10 pb-5">
            <h5 className="mb-2 font-graphik text-lg truncate ... leading-tight">
              {item.name}
            </h5>
            <p className="h-23 font-graphikMedium font-extrabold text-[#828282] text-md pb-5 truncate ..">
              {formatCurrency(item.price)}
            </p>
            
          </div>
        </div>
      </Link>
    </>
  );
};

export default Card;
