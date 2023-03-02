const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { toHex } = require("ethereum-cryptography/utils");

function generate() {
  let privateKey = secp.utils.randomPrivateKey();

  console.log("Private Key: ", toHex(privateKey));

  const publicKey = secp.getPublicKey(toHex(privateKey));

  console.log("Public Key: ", toHex(publicKey));

  const address = getAddress(publicKey);

  console.log("Address: ", address);

  privateKey = toHex(privateKey);
  return { privateKey, address };
}
//get the address
function getAddress(publicKey) {
  const pubKey = publicKey.slice(1);

  const address = keccak256(pubKey);

  return toHex(address.slice(-20));
}

module.exports = { generate,getAddress };
