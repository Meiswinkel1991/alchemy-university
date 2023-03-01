# Cryptography

## Notes:

### Digital Signatures

- transform a public key with the keccak256 function to an address (only the last 20 characters are the ethereum address)
- ECDSA => Elliptic Curve Digital Signature Algorithm

### Proof of work & Mining

1. Take current block’s block header, add mempool transactions
2. Append a nonce, starting at nonce = 0
3. Hash data from #1 and #2
4. Check hash versus target difficulty (provided by protocol)
5. If hash < target, puzzle is solved! Get rewarded.
6. Else, restart process from step #2, but increment nonce

### Blockchain Network
