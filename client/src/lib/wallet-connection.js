/* eslint-disable prefer-destructuring */
function isEthereum() {
    if (window.ethereum) {
      return true;
    }
    return false;
  }
  
  function getChainID() {
    if (isEthereum()) {
      console.log(parseInt(window.ethereum.chainId, 16))
      return parseInt(window.ethereum.chainId, 16);
    }
    return 0;
  }
  
  async function handleConnection(accounts) {
    if (accounts.length === 0) {
      const fetchedAccounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      return fetchedAccounts;
    }
  
    return accounts;
  }
  
  async function requestAccount() {
    let currentAccount = 0x0;
    if (isEthereum() && getChainID() !== 0) {
      let accounts = await window.ethereum.request({ method: 'eth_accounts' });
      accounts = await handleConnection(accounts);
      currentAccount = accounts[0];
    }
    return currentAccount;
  }
  
 
  
  export const GetParams = async () => {
    const response = {
      isError: false,
      message: '',
      step: -1,
      balance: 0,
      account: '0x0',
    };
  
    if (!isEthereum()) {
      response.step = 0;
      return response;
    }
  
    const currentAccount = await requestAccount();
    if (currentAccount === 0x0) {
      response.step = 1;
      return response;
    }
  
    response.account = currentAccount;
  
    if (getChainID() !== 421614) {
      console.log('loading.....')
      response.step = 2;
      return response;
    }
  
 

  
    return response;
  };
  
  export async function SwitchNetwork() {
    console.log('switching...')
    await window?.ethereum?.request({
      method: 'wallet_addEthereumChain',
      params: [ {
              chainId: `0x66eee`,
              chainName: "Arbitrum Sepolia",
              nativeCurrency: {
                  name: "Sepolia Ether",
                  symbol: "ETH",
                  decimals: 18,
              },
              rpcUrls: ["https://arbitrum-sepolia.blockpi.network/v1/rpc/public	"],
              blockExplorerUrls: ["https://sepolia-explorer.arbitrum.io"],
          }],
    }).catch((error) => {
      console.log(error);
    });
  }
  