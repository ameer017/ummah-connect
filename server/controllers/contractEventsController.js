const { ethers, Contract } = require("ethers");
const Certificate = require("../models/certificateModel");
const { CERTIFICATE_CA, CERTIFICATE_ABI } = require("../utils/contract");

require("dotenv").config();


let provider;
const setupWebSocketProvider = () => {
	provider = new ethers.WebSocketProvider(
		process.env.ALCHEMY_ARB_SEPOLIA_WSS_URL
	);
	
	certificateContract = new Contract(CERTIFICATE_CA, CERTIFICATE_ABI, provider);

	provider.on("error", (error) => {
		console.error("WebSocket Error:", error);
		reconnect();
	});

	setupEventListeners();
};

const reconnect = () => {
	console.log("Attempting to reconnect...");
	setTimeout(setupWebSocketProvider, 5000); // Wait for 5 seconds before reconnecting
};

const setupEventListeners = () => {
	
	certificateContract.on(
		"CertificateMinted",
		async (NFTId, walletAddress, studentId, courseId, event) => {
            // console.log(NFTId, walletAddress, studentId, courseId, )
			try {
                const txHash = event.log.transactionHash;

				// Update or create the certificate
				const cert = await Certificate.findOneAndUpdate(
					{ student: studentId, course: courseId },
					{
						$set: {
							NFTId: Number(NFTId),
							isMinted: true,
							mintedAddress: walletAddress,
							mintedDate: new Date(),
                            txHash: txHash,
						},
					},
					{ new: true, upsert: true }
				);

                console.log(cert)
			} catch (error) {
				console.error("Errorminting certificate:", error);
			}
		}
	);

	console.log("Event listeners set up successfully");
};

const CertEventsController = {
	initializeWebSocket: () => {
		setupWebSocketProvider();
	},

	// Additional functions to interact with the smart coursePaymentContract can be added here
};

module.exports = CertEventsController;
