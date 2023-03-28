import Manager from "./deployments/sepolia/Manager.json";
import Escrow from "./deployments/sepolia/Escrow.json";
import { approve } from "./App";
import { ethers } from "ethers";

export default async function fetchEscrowContracts(signer) {
  const managerContract = new ethers.Contract(
    Manager.address,
    Manager.abi,
    signer
  );

  const deployedContracts = await managerContract.getDeployedContracts();


  let escrowContracts = []

  deployedContracts.forEach(async (contract) => {
    const escrowContract = new ethers.Contract(contract, Escrow.abi, signer);

    const arbiter = await escrowContract.arbiter();
    const beneficiary = await escrowContract.beneficiary();
    const value = await escrowContract.value();

    const escrow = {
      address: escrowContract.address,
      arbiter,
      beneficiary,
      value: value.toString(),
      handleApprove: async () => {
        escrowContract.on("Approved", () => {
          document.getElementById(escrowContract.address).className =
            "complete";
          document.getElementById(escrowContract.address).innerText =
            "✓ It's been approved!";
        });

        await approve(escrowContract, signer);
      },
    };

    escrowContracts
  });
}
