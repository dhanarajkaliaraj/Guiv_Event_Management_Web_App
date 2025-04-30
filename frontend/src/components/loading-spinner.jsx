import React from "react";

function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-screen opacity-50 bg-gray-800 w-full">
      <div className="h-8 w-8 border-solid border-8 border-primary border-t-gray-200 rounded-full animate-spin"></div>
    </div>
  );
}

export default LoadingSpinner;
