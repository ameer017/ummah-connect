import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { RESET, resetPassword } from "../../redux/feature/auth/authSlice";

const ResetPassword = () => {
  const [formData, setFormData] = useState(initialState);
  const { password, password2 } = formData;
  const { resetToken } = useParams();
  console.log(resetToken);

  const { isLoading, isLoggedIn, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const reset = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      return toast.error("Password must be up to 6 characters");
    }
    if (password !== password2) {
      return toast.error("Passwords do not match");
    }

    const userData = {
      password,
    };

    await dispatch(resetPassword({ userData, resetToken }));
  };

  useEffect(() => {
    if (isSuccess && message.includes("Reset Successful")) {
      navigate("/login");
    }

    dispatch(RESET());
  }, [dispatch, navigate, message, isSuccess]);
  return (
    <div className="h-[100vh] border bg-[#ececec] flex items-center justify-center">
      <div className="flex flex-col items-center justify-center light">
        <div className="w-[300px] md:w-[500px] bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Reset Password
          </h2>

          <form className="flex flex-col" onSubmit={reset}>
            <PasswordInput
              placeholder="Password"
              name="password"
              value={password}
              onChange={handleInputChange}
            />
            <PasswordInput
              placeholder="Confirm Password"
              name="password2"
              value={password2}
              onChange={handleInputChange}
            />

            <button
              type="submit"
              className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
            >
              Reset Password
            </button>

            <div className="flex justify-between mt-4">
              <p>
                <Link
                  to="/"
                  className="hover:text-[#35d7ff] text-black hover:underline"
                >
                  - Home
                </Link>
              </p>
              <p>
                <Link
                  to="/login"
                  className="hover:text-[#35d7ff] text-black hover:underline"
                >
                  - Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
