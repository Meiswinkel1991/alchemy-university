import React, { useState } from 'react'
import server from "./server"

export default function KeyGenerator() {

    const [privateKey,setPrivateKey] = useState("")
    const [address,setAddress] = useState("")

    async function generate() {
        try{
            const resp = await server.post('generate')
            console.log(resp)
            setAddress(resp.data.address)
            setPrivateKey(resp.data.privateKey)
        }catch (ex) {
            alert(ex.response);
        }
        
    }

  return (
    <div className='container keyGenerator'>
        <h1>Generate a new Key</h1>

        <button onClick={generate} className='button'>Generate</button>

        {privateKey && <div className='label'>private key: {privateKey} </div>}
        {address && <div className='label'>address: {privateKey} </div>}
    </div>
  )
}
