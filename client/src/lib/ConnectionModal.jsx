/* eslint-disable react/jsx-no-bind */
import { useState, useEffect } from "react";
// import Modal from "react-modal";
import { GetParams, SwitchNetwork } from "./wallet-connection";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
// import styles from '../styles';
// import CustomButton from './CustomButton';
// import { useGlobalContext } from '../context';
// import { GetParams, SwitchNetwork } from '../utils/onboard.js';

const ConnectionModal = ({setIsConnected}) => {
	const [modalIsOpen, setIsOpen] = useState(false);
	// const { updateCurrentWalletAddress } = useGlobalContext();
	const [step, setStep] = useState(-1);

    const updateCurrentWalletAddress = async () => {
        const accounts = await window?.ethereum?.request({ method: 'eth_requestAccounts' });
    
        // if (accounts) setWalletAddress(accounts[0]);
      };
    

	async function resetParams() {
		const currentStep = await GetParams();
		setStep(currentStep.step);
		setIsOpen(currentStep.step !== -1);
	}

	useEffect(() => {
		resetParams();

		window?.ethereum?.on("chainChanged", () => {
			resetParams();
		});

		window?.ethereum?.on("accountsChanged", () => {
			resetParams();
		});
	}, []);

	const generateStep = (st) => {
		switch (st) {
			case 0:
				return (
					<>
						<AlertDialog open={modalIsOpen} onOpenChange={setIsOpen}>
							{/* <AlertDialogTrigger>Open</AlertDialogTrigger> */}
							<AlertDialogContent>
								<AlertDialogHeader>
									<AlertDialogTitle>
										You don't have Metamask Wallet installed!
									</AlertDialogTitle>
									<AlertDialogDescription>
										Kindly proceed to download metamask
									</AlertDialogDescription>
								</AlertDialogHeader>

								<AlertDialogFooter>
									<Button
										type="button"
										variant="outline"
										onClick={() => setIsConnected(true)}
									>
										Cancel
									</Button>
									<Button
										onClick={() =>
											window.open("https://metamask.io/download/", "_blank")
										}
										// disabled={isConfirming || isPurchasePending}
										type="submit"
									>
										Download Metamask
									</Button>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>
					</>
				);

			case 1:
				return (
					<>
						<AlertDialog open={modalIsOpen} onOpenChange={setIsOpen}>
							{/* <AlertDialogTrigger>Open</AlertDialogTrigger> */}
							<AlertDialogContent>
								<AlertDialogHeader>
									<AlertDialogTitle>
										You haven't connected your account to your Wallet!
									</AlertDialogTitle>
									<AlertDialogDescription>
										Kindly connect to your wallet
									</AlertDialogDescription>
								</AlertDialogHeader>

								<AlertDialogFooter>
									<Button
										type="button"
										variant="outline"
										onClick={() => setIsConnected(true)}
									>
										Cancel
									</Button>
									<Button
										onClick={updateCurrentWalletAddress}
										// disabled={isConfirming || isPurchasePending}
										type="submit"
									>
										Connect Wallet
									</Button>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>
					</>
				);

			case 2:
				return (
					<>
						<AlertDialog open={modalIsOpen} onOpenChange={setIsOpen}>
							{/* <AlertDialogTrigger>Open</AlertDialogTrigger> */}
							<AlertDialogContent>
								<AlertDialogHeader>
									<AlertDialogTitle>
										You're on a different network.
									</AlertDialogTitle>
									<AlertDialogDescription>
										Kindly Switch to Arbirium Sepolia.
									</AlertDialogDescription>
								</AlertDialogHeader>

								<AlertDialogFooter>
									<Button
										type="button"
										variant="outline"
										onClick={() => setIsConnected(true)}
									>
										Cancel
									</Button>
									<Button
										onClick={SwitchNetwork}
										// disabled={isConfirming || isPurchasePending}
										type="submit"
									>
										Switch Network
									</Button>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>
					</>
				);

			default:
				return <p>Good to go!</p>;
		}
	};

	return (
		// <Modal
		// 	isOpen={modalIsOpen}
		// 	className={`absolute inset-0 ${styles.flexCenter} flex-col ${styles.glassEffect}`}
		// 	overlayClassName="Overlay"
		// >
		generateStep(step)
		// </Modal>
	);
};

export default ConnectionModal;
