import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RESET, verifyUser } from "../../redux/feature/auth/authSlice";

const Verify = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { verificationToken } = useParams();


  const verifyAccount = async (e) => {
    e.preventDefault();
    await dispatch(verifyUser(verificationToken));
    dispatch(RESET());
  };


  return (
    <div className="h-[100vh] border bg-[#ececec] flex items-center justify-center">
      <div className="flex flex-col items-center justify-center light">
        <div className="w-[300px] md:w-[500px] bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Account Verification
          </h2>

          <form className="flex flex-col" onSubmit={verifyAccount}>
            <p>To verify your account, click the button below...</p>

            <button
              type="submit"
              className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
            >
              Verify Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Verify;
