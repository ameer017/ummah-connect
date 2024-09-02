import React, { useEffect, useLayoutEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import useRedirectLoggedOutUser from "../UseRedirect/UseRedirectLoggedOutUser";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../redux/feature/auth/authSlice";
import "react-confirm-alert/src/react-confirm-alert.css";
import axios from "axios";

const URL = import.meta.env.VITE_APP_BACKEND_URL;

const SuscriptionList = ({ userId }) => {
  useRedirectLoggedOutUser("/login");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [subscriber, setSubscriber] = useState([]);

  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);


  const initialState = {
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    photo: user?.photo || "",
    role: user?.role || "",
  };
  const [profile, setProfile] = useState(initialState);


  useEffect(() => {
    dispatch(getUser(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    const fetchSubscribers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${URL}/subscribe/subscriptions`);
        setSubscriber(response.data);
      } catch (error) {
        setLoading(false);
        setError("error fetching subscribers", error);
      }
    };
    fetchSubscribers();
  }, []);

  useLayoutEffect(() => {
    if (user) {
      setProfile({
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        photo: user.photo,
      });
    }
  }, [user]);

  const itemsPerPage = 5;
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = subscriber.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(subscriber.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % subscriber.length;
    setItemOffset(newOffset);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (error) return <p>failed to fetch!</p>;
  // if (loading) return <p>loading...</p>;

  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  return (
    <section className="flex flex-col md:flex-row min-h-screen">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        profile={profile}
        user={user}
      />

      <div
        className={`w-full bg-white p-4 flex justify-center ${isSidebarOpen ? "md:ml-1/4" : ""
          }`}
      >
        <div className="container mx-auto p-6 ">
          {!loading && subscriber.length === 0 ? (
            <p>No Subscriber yet</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xl font-medium text-gray-500 uppercase tracking-wider">
                      s/n
                    </th>
                    <th className="px-6 py-3 text-left text-xl font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xl font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentItems.map((subscribe, index) => {
                    const { _id, email, dateSubscribed } = subscribe;
                    return (
                      <tr key={_id} className="hover:bg-gray-100">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-[15px] text-gray-900">
                          {email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-[15px] text-gray-900">
                          {formatDate(dateSubscribed)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

          )}

          <div className="mt-6">
            <ReactPaginate
              breakLabel="..."
              nextLabel="Next"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              pageCount={pageCount}
              previousLabel="Prev"
              renderOnZeroPageCount={null}
              containerClassName="flex justify-center items-center mt-4"
              pageLinkClassName="px-3 py-1 mx-1 border rounded-md text-gray-700 bg-white hover:bg-gray-100"
              previousLinkClassName="px-3 py-1 mx-1 border rounded-md text-gray-700 bg-white hover:bg-gray-100"
              nextLinkClassName="px-3 py-1 mx-1 border rounded-md text-gray-700 bg-white hover:bg-gray-100"
              activeLinkClassName="bg-gray-200"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuscriptionList;
