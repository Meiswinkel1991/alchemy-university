import Wallet from "./Wallet";
import Transfer from "./Transfer";
import KeyGenerator from "./KeyGenerator";
import Sign from "./Sign"
import BalanceList from "./BalanceList"
import "./App.scss";
import { useState } from "react";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [nonce,setNonce] = useState(0)
  const [trx,setTrx] = useState({})
  const [signature,setSignature] = useState()
 
  

  return (
    <div className="app">
      <Wallet
        balance={balance}
        setBalance={setBalance}
        address={address}
        setAddress={setAddress}
        setNonce={setNonce}
        nonce={nonce}
      />
      <Sign address={address} setAddress={setAddress} setTrx={setTrx} setSignature={setSignature} nonce={nonce}  />
      <Transfer setBalance={setBalance} address={address} signature={signature}  trx={trx} />
      <BalanceList balance={balance}/>
      <KeyGenerator/>
    </div>
  );
}

export default App;
