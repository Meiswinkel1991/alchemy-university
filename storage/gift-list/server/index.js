const express = require("express");
const verifyProof = require("../utils/verifyProof");

const port = 1225;

const app = express();
app.use(express.json());

// paste the hex string in here, without the 0x prefix
const { merkleRoot } = require("./merkleRoot.json");

app.post("/gift", (req, res) => {
  const { proof, name } = req.body;

  const isInTheList = verifyProof(proof, name, merkleRoot);
  if (isInTheList) {
    res.send("You got a toy robot!");
  } else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
