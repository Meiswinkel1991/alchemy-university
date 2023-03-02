import { useState } from "react";
import server from "./server";



function Transfer({ address, setBalance ,signature,trx}) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();
    console.log(trx)
    try {
      const {
        data: { balance },
      } = await server.post(`send`, trx);
      setBalance(balance);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Transaction Signature
        <textarea 
          className="signature"
          placeholder="Create your singature by signing your trx"
          value={signature}
          disabled
        ></textarea >
      </label>


      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
