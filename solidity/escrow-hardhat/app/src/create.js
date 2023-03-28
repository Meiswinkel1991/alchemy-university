import Manager from "./deployments/sepolia/Manager.json";
import escrow from "./deployments/sepolia/Escrow.json";
import { ethers } from "ethers";

export default async function createEscrowContract(
  signer,
  arbiter,
  beneficiary,
  value
) {
  const managerContract = new ethers.Contract(
    Manager.address,
    Manager.abi,
    signer
  );

  const tx = await managerContract.createEscrowContract(beneficiary, arbiter, {
    value: value,
  });

  await tx.wait(1);

  const deployedContracts = await managerContract.getDeployedContracts();

  const escrowContractAddress = deployedContracts[deployedContracts.length - 1];

  const escrowContract = new ethers.Contract(
    escrowContractAddress,
    escrow.abi,
    signer
  );

  return escrowContract;
}
