import { useState } from "react";
import * as secp from "ethereum-cryptography/secp256k1" 
import {sha256} from "ethereum-cryptography/sha256"
import { utf8ToBytes, toHex} from "ethereum-cryptography/utils"
import {keccak256} from "ethereum-cryptography/keccak"


export default function Sign({address,setAddress,setTrx,setSignature,nonce}) {
    const [value,setValue] = useState(0)
    const [recipient,setRecipient] =  useState("")
    const [privateKey,setPrivateKey] = useState("")
    

    const signTransaction = async () => {
        const trx = {
            sender: address,
            amount: value,
            to: recipient,
            nonce: nonce+1,
        }
            
        //hash the transaction data
        const trxArray =  utf8ToBytes(JSON.stringify(trx)) ;   
        const hashedTrx = toHex(sha256(trxArray))       

        //sign the transaction with the private key
        const [signature,recoveryBit] = await secp.sign(hashedTrx,privateKey,{recovered: true})
     

        trx.hash = hashedTrx
        trx.signature = toHex(signature)
        trx.recoveryBit = recoveryBit

        setTrx(trx)
        setSignature(toHex(signature))
        

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        signTransaction()
    }


  return (
    <form className="container transfer" onSubmit={handleSubmit} >
      <h1>Sign Transaction</h1>

    <label>
        Your Wallet
        <input
          placeholder="Type your private"
          value={address}
          onChange={e => setAddress(e.target.value)}
        ></input>
    </label>

    <label>
        Your Private Key
        <input
          placeholder="Type your wallet address"
          type="password"
          value={privateKey}
          onChange={e => setPrivateKey(e.target.value)}
        ></input>
    </label>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={value}
          onChange={e => setValue(e.target.value)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={e => setRecipient(e.target.value)}
        ></input>
      </label>

      <input type="submit" className="button" value="Sign" />
    </form>
  )
}
