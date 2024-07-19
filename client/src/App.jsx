import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "./components/Loader/Loader";
import Home from "./pages/home/Home";
import AppRoutes from "./AppRoutes";
import Layout from "./components/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import {
  getLoginStatus,
  getUser,
  selectIsLoggedIn,
  selectUser,
} from "./redux/feature/auth/authSlice";
import axios from "axios";
import ScrollToTop from "./components/ScrollToTop";

axios.defaults.withCredentials = true;

function App({ userId }) {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(getLoginStatus());
    if (isLoggedIn && user === null) {
      dispatch(getUser(userId));
    }
  }, [dispatch, isLoggedIn, user]);

  useEffect(() => {
    if (location.pathname === "/") {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    } else {
      setIsLoading(false);
    }
  }, [location.pathname]);

  return (
    <div>
      <ScrollToTop />
      <Routes>
        {location.pathname === "/" && isLoading ? (
          <Route path="/" element={<Loader />} />
        ) : (
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
        )}
        <Route path="/*" element={<AppRoutes />} />
      </Routes>
    </div>
  );
}

export default App;
