# Blockchain Storage

## Notes:

### UTXO & Account Models

UTXO = Unspent Transaction Output


### Account-based Model

- Ethereum use this model
- Each account has a balance
- Possible replay attacks (Nonce protect)

### Unspent Transaction Output 

- All coins are not the same (not fungible)
- A coin can only be spent once
- Coins are consumed; create new ones


### Tree Data Structures

- Binary Search with Binary Trees
- Merkle Trees

    Merkle tree: a structure used in computer science to validate data

    Merkle root: the hash contained in the block header, which is derived from the hashes of all other transactions in the block

    Merkle path: represents the information which the user needs to calculate the expected value for the Merkle root for a block, from their own transaction hash contained in that block. The Merkle path is used as part of of the Merkle proof

    Merkle proof: proves the existence of a specific transaction in a specific block (without the user needing to examine all the transactions in the block). It includes the Merkle root and the Merkle path
