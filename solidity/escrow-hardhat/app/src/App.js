import { ethers } from "ethers";
import { useEffect, useState, useReducer, useCallback } from "react";
import createEscrowContract from "./create";
import Escrow from "./Escrow";

const initialState = {
  provider: null,
  web3Provider: null,
  address: null,
  signer: null,
  chain: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_WEB3_PROVIDER":
      return {
        ...state,
        provider: action.provider,
        web3Provider: action.web3Provider,
        address: action.address,
        signer: action.signer,
        chain: action.chain,
      };

    case "SET_ADDRESS":
      return { ...state, address: action.address };

    case "RESET_WEB3_PROVIDER":
      return initialState;

    case "SET_CHAIN":
      return { ...state, network: action.network };

    default:
      return { ...state };
  }
};

export async function approve(escrowContract, signer) {
  const approveTxn = await escrowContract.connect(signer).approve();
  await approveTxn.wait();
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { web3Provider, provider, signer, address, chain } = state;

  const [escrows, setEscrows] = useState([]);

  const [hasMetamask, setHasMetamask] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const disconnect = useCallback(
    async (e) => {
      e.preventDefault();
      if (typeof window.ethereum !== "undefined") {
        if (provider?.disconnect && typeof provider.disconnect === "function") {
          await provider.disconnect();
        }
        dispatch({
          type: "RESET_WEB3_PROVIDER",
        });
      }
      setIsConnected(false);
    },
    [provider]
  );

  const connect = async () => {
    console.log("Connect clicked");
    if (typeof window.ethereum !== "undefined") {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });

        const _provider = new ethers.providers.Web3Provider(window.ethereum);

        const _signer = _provider.getSigner();
        const _address = await _signer.getAddress();

        const _network = await _provider.getNetwork();
        console.log(_network);
        dispatch({
          type: "SET_WEB3_PROVIDER",
          provider: window.ethereum,
          web3Provider: _provider,
          signer: _signer,
          address: _address,
          chain: _network,
        });

        setIsConnected(true);
      } catch (e) {
        console.error(e);
      }
    } else {
      setIsConnected(false);
    }
  };

  const disableButton = (disable) => {
    document.getElementById("deploy").disabled = disable;
  };

  async function newContract() {
    const beneficiary = document.getElementById("beneficiary").value;
    const arbiter = document.getElementById("arbiter").value;
    const value = ethers.BigNumber.from(document.getElementById("wei").value);
    const escrowContract = await createEscrowContract(
      signer,
      arbiter,
      beneficiary,
      value
    );

    const escrow = {
      address: escrowContract.address,
      arbiter,
      beneficiary,
      value: value.toString(),
      handleApprove: async () => {
        escrowContract.on("Approved", () => {
          document.getElementById(escrowContract.address).className =
            "complete";
          document.getElementById(escrowContract.address).innerText =
            "✓ It's been approved!";
        });

        await approve(escrowContract, signer);
      },
    };

    setEscrows([...escrows, escrow]);
  }

  useEffect(() => {
    if (provider?.on) {
      const handleDisconnect = () => {
        console.log("disconnect");
        disconnect();
      };

      const handleAccountsChanged = (accounts) => {
        dispatch({
          type: "SET_ADDRESS",
          address: accounts[0],
        });
      };

      const handleChainChanged = async () => {
        window.location.reload();
      };

      provider.on("accountsChanged", handleAccountsChanged);
      provider.on("chainChanged", handleChainChanged);
      provider.on("disconnect", handleDisconnect);

      return () => {
        if (provider.removeListener) {
          provider.removeListener("accountsChanged", handleAccountsChanged);
          provider.removeListener("chainChanged", handleChainChanged);
          provider.removeListener("disconnect", handleDisconnect);
        }
      };
    }
  }, [provider, disconnect]);

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setHasMetamask(true);
    }
    if (provider) {
      if (chain?.chainId !== 11155111) {
        window.alert("Please switch to sepolia network");
        disableButton(true);
      } else {
        disableButton(false);
      }
    }
  }, [state, provider, web3Provider, chain, isConnected]);

  return (
    <>
      {hasMetamask ? (
        <div className="container">
          <div className="header">
            <h1>Escrow dApp </h1>
            <div className="web3kit">
              {address && (
                <h3>
                  {address.slice(0, 3)}...{address.slice(-4)}
                </h3>
              )}
              {isConnected ? (
                <button onClick={disconnect}>Disconnect</button>
              ) : (
                <button onClick={connect}>Connect Wallet</button>
              )}
            </div>
          </div>
          <div className="contract-container">
            <div className="contract">
              <h1> New Contract </h1>
              <label>
                Arbiter Address
                <input
                  type="text"
                  id="arbiter"
                />
              </label>

              <label>
                Beneficiary Address
                <input
                  type="text"
                  id="beneficiary"
                />
              </label>

              <label>
                Deposit Amount (in Wei)
                <input
                  type="text"
                  id="wei"
                />
              </label>

              <button
                className="button"
                id="deploy"
                onClick={(e) => {
                  e.preventDefault();

                  newContract();
                }}
              >
                Deploy
              </button>
            </div>

            <div className="existing-contracts">
              <h1> Existing Contracts </h1>

              <div id="container">
                {escrows.map((escrow) => {
                  return (
                    <Escrow
                      key={escrow.address}
                      {...escrow}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h1>Please Install Metamask</h1>
      )}
    </>
  );
}

export default App;
