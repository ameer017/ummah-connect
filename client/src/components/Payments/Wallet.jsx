import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FiDollarSign, FiCreditCard } from "react-icons/fi";
import axios from "axios";
import { toast } from "react-toastify";
const URL = import.meta.env.VITE_APP_BACKEND_URL;

const Wallet = () => {
	const [balance, setBalance] = useState(0);
	const [bankAccount, setBankAccount] = useState(null);
	const [withdrawAmount, setWithdrawAmount] = useState("");
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(null);
    const [isInitiating, setIsInitiating] = useState(false)

	useEffect(() => {
		fetchPayoutDetails();
	}, []);

	const fetchPayoutDetails = async () => {
		try {
			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			};
			const response = await axios.get(`${URL}/payments/get-payout-details`, config);
			const data = await response.data;
			setBalance(data.availableBalance);
			setBankAccount(data.bankAccount);
			setLoading(false);
		} catch (error) {
			console.error("Error fetching payout details:", error);
			setError("Failed to fetch payout details. Please try again later.");
			setLoading(false);
		}
	};

	const handleWithdrawal = async () => {
		setError(null);
		setSuccess(null);
        setIsInitiating(true)

		if (!withdrawAmount || parseFloat(withdrawAmount) <= 0) {
			setError("Please enter a valid amount to withdraw.");
			return;
		}

		if (parseFloat(withdrawAmount) > balance) {
			setError("Withdrawal amount exceeds available balance.");
			return;
		}

		try {
			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			};
			const response = await axios.post(
				`${URL}/payments/initiate-payout`,
				{ amount: parseFloat(withdrawAmount) },
				config
			);

			const data = await response.data;

			if (data.payoutId) {
				setSuccess(`Payout of $${withdrawAmount} initiated successfully.`);
				toast.success(`Payout initiated successfully.`);
				setWithdrawAmount("");
				fetchPayoutDetails(); // Refresh balance after successful withdrawal
			} else {
				setError(
					data.message || "Failed to initiate payout. Please try again."
				);
			}
		} catch (error) {
			console.error("Error initiating payout:", error);
			setError(
				"An error occurred while processing your request. Please try again."
			);
		} finally {
            setIsInitiating(false)
        }
	};

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<div className="container mx-auto p-4">
			<Card className="max-w-md mx-auto">
				<CardHeader>
					<CardTitle className="text-2xl font-bold">Wallet</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="mb-4">
						<p className="text-lg font-semibold">Available Balance</p>
						<p className="text-3xl font-bold text-green-600">
							${balance.toFixed(2)}
						</p>
					</div>

					{bankAccount && (
						<div className="mb-4">
							<p className="text-sm text-gray-600">Withdrawal Account</p>
							<div className="flex items-center">
								<FiCreditCard className="mr-2" />
								<span>
									{bankAccount.bank_name} (**** {bankAccount.last4})
								</span>
							</div>
						</div>
					)}

					<div className="mb-4">
						<label
							htmlFor="withdrawAmount"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Withdrawal Amount
						</label>
						<div className="relative">
							<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
								<FiDollarSign className="text-gray-400" />
							</div>
							<Input
								type="number"
								id="withdrawAmount"
								placeholder="0.00"
								value={withdrawAmount}
								onChange={(e) => setWithdrawAmount(e.target.value)}
								className="pl-7"
								min="0"
								step="0.01"
							/>
						</div>
					</div>

					<Button onClick={handleWithdrawal} disabled={isInitiating} className="w-full">
                        {isInitiating ? "Initiating withdrawal..." : "Withdraw"}
					</Button>

					{error && (
						<Alert variant="destructive" className="mt-4">
							<AlertTitle>Error</AlertTitle>
							<AlertDescription>{error}</AlertDescription>
						</Alert>
					)}

					{success && (
						<Alert variant="success" className="mt-4">
							<AlertTitle>Success</AlertTitle>
							<AlertDescription>{success}</AlertDescription>
						</Alert>
					)}
				</CardContent>
			</Card>
		</div>
	);
};

export default Wallet;
