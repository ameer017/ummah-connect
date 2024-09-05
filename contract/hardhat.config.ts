import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
	solidity: "0.8.24",
	networks: {
		// Arbitrum Sepolia Testnet
		"arbitrum-sepolia": {
			url: process.env.ARBITRUM_SEPOLIA_RPC_URL!, // Update this with the correct RPC URL for Arbitrum Sepolia
			accounts: [process.env.ACCOUNT_PRIVATE_KEY!],
			gasPrice: 1000000000,
		},
	},
	etherscan: {
		apiKey: {
			"arbitrum-sepolia": process.env.ARBISCAN_API_KEY as string,
		},
		customChains: [
			{
				network: "arbitrum-sepolia",
				chainId: 421614, // Chain ID for Arbitrum Sepolia
				urls: {
					apiURL: "https://api-sepolia.arbiscan.io/api",
					browserURL: "https://sepolia.arbiscan.io/",
				},
			},
		],
	},
	sourcify: {
		enabled: false,
	},
};

export default config;
