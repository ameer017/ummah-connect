import axios from "axios";
import React, { useEffect } from "react";
// import { useCreateStripeConnectAccountMutation } from "@/features/users/usersApiSlice";
const URL = import.meta.env.VITE_APP_BACKEND_URL;

const StripeOnboardingRefresh = () => {
	// 
	// console.log("isLoading", isLoading);
	// console.log("error", error);

	useEffect(() => {
		const refreshOnboarding = async () => {
			try {
				// const { url } = await createStripeConnectAccount().unwrap();
				// console.log(response)
                const config = {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                };
    
                const response = await axios.post(
                    `${URL}/payments/generate-stripe-account-link`,
                    config
                );
				window.location.href = response.data.url;
			} catch (error) {
				console.error("Failed to refresh onboarding link:", error);
				// Handle error (e.g., show an error message to the user)
			}
		};

		refreshOnboarding();
	}, []);

	return (
		<div className="min-h-full flex justify-center items-center text-lg">
			Refreshing your onboarding link...
		</div>
	);
};

export default StripeOnboardingRefresh;
