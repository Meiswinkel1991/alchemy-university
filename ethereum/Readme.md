# Ethereum

## Proof of Stake

Proof of Stake introduced 2 new levels of finality that developers should consider when requesting data from the network: safe and finalized. Here is an overview of all “block tags”:

1. _earliest_: The lowest numbered block the client has available. Intuitively, you can think of this as the first block created.
2. _finalized_: The most recent crypto-economically secure block, that has been accepted by >2/3 of validators. Typically finalized in two epochs (64 blocks). Cannot be re-orged outside of manual intervention driven by community coordination. Intuitively, this block is very unlikely to be re-orged.
3. _safe_: The most recent crypto-economically secure block, typically safe in one epoch (32 blocks). Cannot be re-orged outside of manual intervention driven by community coordination. Intuitively, this block is “unlikely” to be re-orged.
4. _latest_: The most recent block in the canonical chain observed by the client, this block may be re-orged out of the canonical chain even under healthy/normal conditions. Intuitively, this block is the most recent block observed by the client.
5. _pending_: A sample next block built by the client on top of latest and containing the set of transactions usually taken from local mempool. Intuitively, you can think of these as blocks that have not been mined yet.

## Gas on Ethereum

The base fee changes depending on the load in the mined block. If the gas in the mined block is higher than the target gas, the base fee is increased. If too little gas is used, the base fee is reduced.

_interesting reading for gas calculation_: [Building gas fee estimator](https://docs.alchemy.com/docs/how-to-build-a-gas-fee-estimator-using-eip-1559)

## JSON-RPC Request to Ethereum Node

Request the actual blocknumber via command line:

```
curl -X POST --data “{\“jsonrpc\”:\”2.0\”,\”method\”:\”eth_blockNumber\”,\”params\”:[],\”id\”:83}” https://eth-mainnet.alchemyapi.io/v2/gZgOOh1X3cpVWXeVR9EL51zC1vpbggIF
```

## Transactions

### Two Types of Transactions in Ethereum

1. Contract creation: a special type of transaction that deploys a brand new smart contract This transaction essentially creates a brand new entry in the Ethereum world state

2. Message call: a transaction initiated by an EOA that interacts with either another EOA or a smart contract. This transaction does NOT create a new entry in the world state, it just _updates_ an existing entry in the Ethereum world state.

Let's define all of the transaction fields present above:

- **nonce**: index, gets incremented every time transaction gets mined
- **recipient**: the receiving address (if an externally-owned account, the transaction will transfer value. If a contract account, the transaction will execute the contract code)
- **value**: amount of ETH to transfer from sender to recipient (in WEI, a denomination of ETH)
- **yParity, r, s** (aka: digital signature): signature components
- **init or data**: typically referred to as “calldata”, 0 if just a typical ETH transfer
- **gasLimit**: maximum amount of gas units that can be consumed
- **type**: type 0 for legacy (pre-EIP-1559) or type 2 for EIP-1559-compatible txs
- **maxPriorityFeePerGas** (aka: minerTip): the maximum amount of gas to be included as a tip to the validator
- **maxFeePerGas**: the maximum amount of gas willing to be paid for the transaction (inclusive of baseFeePerGas and maxPriorityFeePerGas)
- **chainId**: in order to protect against replay attacks on other EVM chains, each transaction must now include a specific id per chain. Mainnet is 0. Göerli is 5. You can check other chain ids here: https://chainlist.org/

### How To Manually Construct Calldata

1. take the _keccak256_ hash of that function signature
2. take the first 4 bytes (8 characters) of the hash output
3. Final calldata construction, padded out to 32 bytes
