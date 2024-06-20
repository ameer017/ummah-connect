import React from "react";

const Notification = () => {
  return (
    <div>
      <div className="w-[100%] border-1 bg-grey-500 relative flex justify-start p-[1rem] text-[#fff] ">
        <p className="text-[1.3rem]">
          <b>Message:</b> &nbsp;
        </p>
        <p className="text-[1.3rem]">
          To verify your account, check your email for a verification link.
          &nbsp;
        </p>
        <p className="pointer text-blue-700 ">
          <b>Resend Link</b>
        </p>
      </div>
    </div>
  );
};

export default Notification;
