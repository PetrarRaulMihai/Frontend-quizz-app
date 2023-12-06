import React from "react";
import sunDark from "../../public/assets/images/icon-sun-dark.svg";
import moonDark from "../../public/assets/images/icon-moon-dark.svg";

function Header() {
  return (
    <header className="flex flex-col gap-6 pt-2 px-5 mb-12">
      {/* User profile name firts level*/}
      <div className="flex justify-end">
        <p className="italic text-[#91a2b7]">
          Welcome {localStorage.getItem("name")}
        </p>
      </div>
      {/* Header second level */}
      <div className="flex justify-end">
        {/* Light/dark mode */}
        <div className="flex gap-3">
          <img src={sunDark}></img>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer"></input>
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
          <img src={moonDark}></img>
        </div>
      </div>
      {/* Header third level */}
      <div className="flex flex-col gap-6 text-white">
        <p className="text-4xl">
          Welcome to the <span className="font-bold">Frontend Quiz!</span>
        </p>
        <p className="italic text-[#91a2b7]">Pick a subject to get started.</p>
      </div>
    </header>
  );
}

export default Header;
