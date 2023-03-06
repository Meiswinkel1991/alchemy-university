import {useState,useEffect} from 'react'
import server from "./server";

export default function BalanceList({balance}) {

  const [tokenBalances,setTokenBalances] = useState([])

  const fetchTokenBalances = async () => {
    const resp = await server.get("/balance/addresses")

    console.log(resp.data.balances)
    setTokenBalances(resp.data.balances)
  }

  useEffect(()=>{
    fetchTokenBalances()
  },[balance])

  return (
    <div className="container balanceList">
      <h1>Balances</h1>
      {Object.keys(tokenBalances)?.map((key,index) => {
       return <p key={index}>{key.slice(0,4)+"..."+key.slice(-4)}:<span>{tokenBalances[key]}</span> Coins</p>
      })}
    </div>
  )
}
