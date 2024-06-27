import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/feature/auth/authSlice";
import emailReducer from "../redux/feature/email/emailSlice";
import filterReducer from "../redux/feature/filterSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    email: emailReducer,
    filter: filterReducer,
  },
});
