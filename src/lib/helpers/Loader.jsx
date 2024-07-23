import React from "react";
import { MetroSpinner } from "react-spinners-kit";
import { AppColors } from "./colors";

const Loader = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/30 z-50 flex justify-center items-center">
      <MetroSpinner size={50} color={AppColors.appDark} />
    </div>
  );
};

export default Loader;
