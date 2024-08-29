import {
	selectIsLoggedIn,
	selectUser,
} from "../../redux/feature/auth/authSlice";

import { useSelector } from "react-redux";

export const ShowOnLogin = ({ children }) => {
	const isLoggedIn = useSelector(selectIsLoggedIn);

	if (isLoggedIn) {
		return <>{children}</>;
	}
	return null;
};

export const ShowOnLogout = ({ children }) => {
	const isLoggedIn = useSelector(selectIsLoggedIn);

	if (!isLoggedIn) {
		return <>{children}</>;
	}
	return null;
};

export const AdminLink = ({ children }) => {
	const isLoggedIn = useSelector(selectIsLoggedIn);
	const user = useSelector(selectUser);

	if (isLoggedIn && user?.role === "admin") {
		return <>{children}</>;
	}
	return null;
};

export const UserLink = ({ children }) => {
	const isLoggedIn = useSelector(selectIsLoggedIn);
	const user = useSelector(selectUser);

	if (isLoggedIn && (user?.role !== "instructor" || user?.role !== "admin")) {
		return <>{children}</>;
	}
	return null;
};
export const InstructorLink = ({ children }) => {
	const isLoggedIn = useSelector(selectIsLoggedIn);
	const user = useSelector(selectUser);

	if (isLoggedIn && user?.role === "instructor") {
		return <>{children}</>;
	}
	return null;
};

export const AdminAuthorLink = ({ children }) => {
	const isLoggedIn = useSelector(selectIsLoggedIn);
	const user = useSelector(selectUser);

	if (isLoggedIn && (user?.role === "admin" || user?.role === "author")) {
		return <>{children}</>;
	}
	return null;
};

export const SubscriberLink = ({ children }) => {
	const isLoggedIn = useSelector(selectIsLoggedIn);
	const user = useSelector(selectUser);
	if (isLoggedIn && user?.role === "subscriber") {
		return <>{children}</>;
	}
	return null;

}