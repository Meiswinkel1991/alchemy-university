const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const { utf8ToBytes, toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { generate, getAddress } = require("./utils/cryptography");
const secp = require("ethereum-cryptography/secp256k1");
const { sha256 } = require("ethereum-cryptography/sha256");

app.use(cors());
app.use(express.json());

// masterkey: 6b5256e242eaf3929ca7696bf3ed708d7ff7469252ac4c02882458fa83f46813
const balances = {
  "951c60137804e283cfafdd3fcbca001aaf872649": 10000,
};

const nonces = { "951c60137804e283cfafdd3fcbca001aaf872649": 0 };

app.get("/account/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  const nonce = nonces[address] || 0;
  res.send({ balance, nonce });
});

app.get("/balance/addresses", (req, res) => {
  res.send({balances});
});

app.post("/send", (req, res) => {
  const trx = req.body;

  const sender = trx.sender;
  const recipient = trx.to;
  const amount = trx.amount;

  setInitialBalance(sender);
  setInitialBalance(recipient);
  setInitialNonce(sender);
  setInitialNonce(recipient);

  const sentTrx = {
    sender: sender,
    amount: trx.amount,
    to: recipient,
    nonce: trx.nonce,
  };

  const trxArray = utf8ToBytes(JSON.stringify(sentTrx));
  const hashedTrx = toHex(sha256(trxArray));

  const publicKey = secp.recoverPublicKey(
    hashedTrx,
    trx.signature,
    trx.recoveryBit
  );

  const senderAddress = getAddress(publicKey);

  const isValid = secp.verify(trx.signature, hashedTrx, publicKey);

  console.log(trx);

  if (isValid && senderAddress === sender && nonces[sender] < trx.nonce) {
    console.log("this trx is a valid transaction");
    if (trx.amount < balances[sender]) {
      nonces[sender]++;
      balances[sender] -= parseInt(trx.amount);
      balances[recipient] += parseInt(trx.amount);

      res.send({ balance: balances[sender] });
    } else {
      res.status(400).send({ message: "Not enough funds!" });
    }
  } else {
    res.status(400).send({ message: "Not a valid transaction!" });
  }
});

app.post("/generate", (req, res) => {
  const data = generate();

  res.send({ privateKey: data.privateKey, address: data.address });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}

function setInitialNonce(address) {
  if (!nonces[address]) {
    nonces[address] = 0;
  }
}
