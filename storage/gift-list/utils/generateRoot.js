const MerkleTree = require("./MerkleTree.js");
const fs = require("fs");

//save and print the merkle tree root of the list
function main(params) {
  const listName = "niceList.json";

  const listData = require("./" + listName);

  //create a new Merkle Tree

  const giftMerkleTree = new MerkleTree(listData);

  const merkleRoot = giftMerkleTree.getRoot();

  console.log(`The name of the list: ${listName}`);
  console.log(`The root of the merkle tree: ${merkleRoot}`);
  console.log(`Storage location of the list ${listData.length}`);

  const data = JSON.stringify({ merkleRoot });

  fs.writeFileSync("./server/merkleRoot.json", data);
}

main();
