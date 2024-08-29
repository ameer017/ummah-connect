import { useState } from "react";
import axios from "axios";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import TransactionsTable from "./TransactionTable";
const URL = import.meta.env.VITE_APP_BACKEND_URL;

const Transactions = () => {
	const [transactions, setTransactions] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchTransactions();
	}, []);

	const fetchTransactions = async () => {
		try {
			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			};
			const response = await axios.get(
				`${URL}/payments/get-transaction-history`,
				config
			);
			const data = await response.data;
            console.log(data)
			setTransactions(data);
			setLoading(false);
		} catch (error) {
			console.error("Error fetching payout details:", error);
			toast.error("Failed to fetch payout details. Please try again later.");
			setLoading(false);
		}
	};
	if (loading) {
		return <div>Loading...</div>;
	}

    const transactionDetails = transactions.filter(transaction => transaction.type !== 'purchase')
	return (
		<div className="md:p-14 space-y-4 ">
            <div className=" text-2xl font-semibold">Transactions History</div>
			<TransactionsTable transactions={transactionDetails} />
		</div>
	);
};

export default Transactions;
