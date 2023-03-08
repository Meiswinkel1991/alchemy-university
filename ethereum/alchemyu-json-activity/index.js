const axios = require("axios");
require("dotenv").config();

const ALCHEMY_URL = process.env.ALCHEMY_URL;

function main() {
  axios
    .post(ALCHEMY_URL, {
      jsonrpc: "2.0",
      id: 1,
      method: "eth_getBlockByNumber",
      params: [
        "0xb443", // block 46147
        false, // retrieve the full transaction object in transactions array
      ],
    })
    .then((response) => {
      console.log(response.data.result);
    });
}

main();
