import React from "react";

const Loader = () => {
  return (
    <div className="h-[100vh] flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-yellow-500 mx-auto"></div>
        <p className="text-zinc-600 dark:text-zinc-400">
          As Salam Alaekum Wa Rahmatullohi Wa Barokatuhu
        </p>
      </div>
    </div>
  );
};

export default Loader;
