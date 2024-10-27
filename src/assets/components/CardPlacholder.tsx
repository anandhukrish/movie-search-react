import React from "react";

const CardPlacholder = () => {
  return (
    <div className="w-[calc(100%_/_4_-_20px)] mx-[10px] my-5 rounded-lg overflow-hidden ">
      <div className="h-[300px] bg-gradient-to-tr from-gray-400/15 to-gray-500/20 animate-pulse"></div>
      <div className="text-white my-3 w-full h-4 bg-gradient-to-tr from-gray-400/15 to-gray-500/20 animate-pulse rounded-md"></div>
    </div>
  );
};

export default CardPlacholder;
