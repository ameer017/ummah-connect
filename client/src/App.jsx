import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "./components/Loader/Loader";
import Home from "./pages/home/Home";
import AppRoutes from "./AppRoutes";
import Layout from "./components/Layout/Layout";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

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
  );
}

export default App;
