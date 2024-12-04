import React from "react";

const LoadingPage = () => {
  return (
    <div className="flex-grow grid place-items-center">
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default LoadingPage;
