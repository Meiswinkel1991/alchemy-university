# Gift List

To get started with the repository, clone it and then run `npm install` in the top-level directory to install the depedencies.

## Verification procedure

1. Generate the merkle tree root for the `niceLis.json` in the utils folder.

```properties
node utils/generateRoot
```

2. Start the server. Think of the server as the _verifier_ here. It needs to verify that the `name` passed by the client is in the `merkleRoot.json`. If it is, then we can send the gift!

```properties
node server/index
```

3. Send the proof and the name to the server. This file is a script which will send an HTTP request to the server. Think of the server as the _verifier_ here. It needs to verify that the `name_to_send` passed by the client is in the `merkleRoot.json`. If it is, then we can send the gift!

```properties
node client/index "name_for_proof" "name_to_send"
```

## Examples

Succesfull with:

```properties
node client/index "Anna Stehr" "Anna Stehr"
```

Not succesfull with:

```properties
node client/index "Anna Stehr" "Max Mustermann"
```

## Utils folder

There are a few files in utils folder:

- The `niceList.json` which contains all the names of the people who deserve a gift this year (this is randomly generated, feel free to add yourself and others to this list!)
- The `generateRoot.json` script generate a new merkle root for a the given list and set the root for the server.
- The `example.js` script shows how we can generate a root, generate a proof and verify that some value is in the root using the proof. Try it out from the top-level folder with `node/example.js`
- The `MerkleTree.js` should look familiar from the Merkle Tree module! This one has been modified so you should not have to deal with any crypto type conversion. You can import this in your client/server
- The `verifyProof.js` should also look familiar. This was the last stage in the module. You can use this function to prove a name is in the merkle root, as show in the example.
