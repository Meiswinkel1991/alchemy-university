## ECDSA Node

This project is an example of using a client and server to facilitate transfers between different addresses. Since there is just a single server on the back-end handling transfers, this is clearly very centralized. We won't worry about distributed consensus for this project.

However, something that we would like to incoporate is Public Key Cryptography. By using Elliptic Curve Digital Signatures we can make it so the server only allows transfers that have been signed for by the person who owns the associated address.

### Instructions

After starting the server, all coins are in the ownership of the master key.

Private Key Master: 6b5256e242eaf3929ca7696bf3ed708d7ff7469252ac4c02882458fa83f46813

Address Master: 951c60137804e283cfafdd3fcbca001aaf872649

On the website it is possible to generate a new private key and the corresponding address at any time. 
If this new "account" is to be equipped with new funds, it is necessary to transfer funds with the master account.

A distribution of the funds (coins) is also available on the website.

### Transaction procedure

The following steps are to be carried out for a transaction:

1. Enter the private key and the address 

2. Enter the coins to be sent

3. Enter the recipient address

4. Sign the transaction

5. A signature is generated and the transaction can be sent

### Client

The client folder contains a [react app](https://reactjs.org/) using [vite](https://vitejs.dev/). To get started, follow these steps:

1. Open up a terminal in the `/client` folder
2. Run `npm install` to install all the depedencies
3. Run `npm run dev` to start the application 
4. Now you should be able to visit the app at http://127.0.0.1:5173/

### Server

The server folder contains a node.js server using [express](https://expressjs.com/). To run the server, follow these steps:

1. Open a terminal within the `/server` folder 
2. Run `npm install` to install all the depedencies 
3. Run `node index` to start the server 

The application should connect to the default server port (3042) automatically! 

_Hint_ - Use [nodemon](https://www.npmjs.com/package/nodemon) instead of `node` to automatically restart the server on any changes.
