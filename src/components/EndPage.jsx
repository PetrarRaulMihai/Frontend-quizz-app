import React from "react";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

function EndPage() {
  return (
    <div className="flex flex-col items-center">
      <p className="text-slate-200 font-semibold text-2xl">
        You reached all questions
      </p>
      <p className="text-slate-200 font-semibold text-xl">This is you score</p>
      <Link to="/home">
        <div className="flex w-full justify-center items-center gap-2 mt-6">
          <p className="text-slate-300 text-center text-lg hover:underline">
            Home
          </p>
          <IoIosArrowForward color="rgb(203 213 225)" size={"17px"} />
        </div>
      </Link>
    </div>
  );
}

export default EndPage;
