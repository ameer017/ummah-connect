import React, { useEffect, useLayoutEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import ChangeRole from "../../components/ChangeRole/ChangeRole";
import Search from "../../components/Search/SearchUsers";
import { deleteUser, getUser, getUsers } from "../../redux/feature/auth/authSlice";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { FILTER_USERS, selectUsers } from "../../redux/feature/filterSlice";
import ReactPaginate from "react-paginate";
import useRedirectLoggedOutUser from "../UseRedirect/UseRedirectLoggedOutUser";
import Sidebar from "../Sidebar/Sidebar";


const UserList = ({userId}) => {
  useRedirectLoggedOutUser("/user");
  const dispatch = useDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [search, setSearch] = useState("");

  const { users, isLoading, user } = useSelector((state) => state.auth);
  const filteredUsers = useSelector(selectUsers);
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

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const removeUser = async (id) => {
    await dispatch(deleteUser(id));
    dispatch(getUsers());
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete This User",
      message: "Are you sure to do delete this user?",
      buttons: [
        {
          label: "Delete",
          onClick: () => removeUser(id),
        },
        {
          label: "Cancel",
          onClick: () => alert("Click No"),
        },
      ],
    });
  };

  useEffect(() => {
    dispatch(FILTER_USERS({ users, search }));
  }, [dispatch, users, search]);

  // Begin Pagination
  const itemsPerPage = 5;
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = filteredUsers.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredUsers.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredUsers.length;
    setItemOffset(newOffset);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <section className="flex flex-col md:flex-row min-h-screen">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        profile={profile}
        user={user}
      />

      <div className={`w-full bg-white p-4 flex justify-center ${
          isSidebarOpen ? "md:ml-1/4" : ""
        }`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-4">
            {/* <h3 className="text-lg font-medium">All Users</h3> */}
            <Search
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {!isLoading && users.length === 0 ? (
            <p>No user found...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      s/n
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Change Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentItems.map((user, index) => {
                    const { _id, firstName, emailAddress, role } = user;

                    return (
                      <tr key={_id} className="hover:bg-gray-100">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-[15px] text-gray-900">
                          {firstName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-[15px] text-gray-900">
                          {emailAddress}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-[15px] text-gray-900">
                          {role}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-[15px] text-gray-900">
                          <ChangeRole _id={_id} email={emailAddress} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-[15px] text-gray-900">
                          <span>
                            <FaTrashAlt
                              size={20}
                              color="red"
                              onClick={() => confirmDelete(_id)}
                            />
                          </span>
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

export default UserList;
