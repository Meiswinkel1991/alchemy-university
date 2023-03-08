const { Alchemy, Network, Wallet, Utils } = require("alchemy-sdk");
require("dotenv").config();

const { API_KEY, PRIVATE_KEY } = process.env;

//Setup Alchemy SDK
const settings = {
  apiKey: API_KEY,
  network: Network.MATIC_MUMBAI,
};

const alchemy = new Alchemy(settings);

let wallet = new Wallet(PRIVATE_KEY);

async function main() {
  const nonce = await alchemy.core.getTransactionCount(
    wallet.address,
    "latest"
  );

  let trxParams = {
    to: "0x9e867802DdF0CeA68455B6feA38cCA8d78a4A8eF",
    value: Utils.parseEther("0.001"),
    gasLimit: "21000",
    maxPriorityFeePerGas: Utils.parseUnits("5", "gwei"),
    maxFeePerGas: Utils.parseUnits("20", "gwei"),
    nonce: nonce,
    type: 2,
    chainId: 80001,
  };

  let rawTrx = await wallet.signTransaction(trxParams);

  console.log("Raw tx", rawTrx);

  const tx = await alchemy.core.sendTransaction(rawTrx);

  console.log(`https://mumbai.polygonscan.com/tx/${tx.hash}`);
}

main();
