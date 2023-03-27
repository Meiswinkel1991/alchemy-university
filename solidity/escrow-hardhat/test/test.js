const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("Escrow", function () {
  let contract;
  let implementationContract;
  let managerContract;
  let depositor;
  let beneficiary;
  let arbiter;
  const deposit = ethers.utils.parseEther("1");
  beforeEach(async () => {
    depositor = ethers.provider.getSigner(0);
    beneficiary = ethers.provider.getSigner(1);
    arbiter = ethers.provider.getSigner(2);
    const Escrow = await ethers.getContractFactory("Escrow");
    implementationContract = await Escrow.deploy();
    await implementationContract.deployed();
    const Manager = await ethers.getContractFactory("Manager");
    managerContract = await Manager.deploy(implementationContract.address);
    await managerContract.deployed();

    await managerContract
      .connect(depositor)
      .createEscrowContract(arbiter.getAddress(), beneficiary.getAddress(), {
        value: deposit,
      });

    deployedContracts = await managerContract.getDeployedContracts();

    contract = await ethers.getContractAt("Escrow", deployedContracts[0]);
  });

  it("should be funded initially", async function () {
    let balance = await ethers.provider.getBalance(contract.address);
    expect(balance).to.eq(deposit);
  });

  describe("after approval from address other than the arbiter", () => {
    it("should revert", async () => {
      await expect(contract.connect(beneficiary).approve()).to.be.reverted;
    });
  });

  describe("after approval from the arbiter", () => {
    it("should transfer balance to beneficiary", async () => {
      const before = await ethers.provider.getBalance(beneficiary.getAddress());
      const approveTxn = await contract.connect(arbiter).approve();
      await approveTxn.wait();
      const after = await ethers.provider.getBalance(beneficiary.getAddress());
      expect(after.sub(before)).to.eq(deposit);
    });
  });
});
