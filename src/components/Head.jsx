import React from "react";
import sunDark from "../../public/assets/images/icon-sun-dark.svg";
import moonDark from "../../public/assets/images/icon-moon-dark.svg";
import useStore from "../stores/myZusand";
import { useEffect } from "react";

function Head() {
  const { subjectObject } = useStore();
  useEffect(() => {
    console.log(subjectObject.icon);
  }, [subjectObject]);
  return (
    <div className="px-5 flex flex-col">
      <header className="flex justify-end">
        {/* right side */}
        <div className="flex gap-3">
          <img src={sunDark}></img>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer"></input>
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
          <img src={moonDark}></img>
        </div>
      </header>
      {/* Subject type */}
      <div className="flex items-center">
        <img className="h-[60px] mr-3" src={subjectObject.icon}></img>
        <p className="text-[#91a2b7] text-2xl">{subjectObject.title}</p>
      </div>
    </div>
  );
}

export default Head;
