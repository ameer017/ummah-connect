import React from "react";
import { BiSearch } from "react-icons/bi";

const Search = ({ value, onChange }) => {
  return (
    <div className="relative flex-1 my-1">
      <BiSearch size={18} className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-500" />
      <input
        type="text"
        placeholder="Search Users"
        value={value}
        onChange={onChange}
        className="block w-full pl-10 pr-4 py-2 border rounded-lg text-base font-light text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default Search;
