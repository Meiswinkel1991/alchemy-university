const { network } = require("hardhat");
const { developmentChains } = require("../helper-hardhat-config");
const { verify } = require("../utils/verify");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deployer } = await getNamedAccounts();

  const { log, deploy } = deployments;

  const deployImplementationContract = await deploy("Escrow", {
    from: deployer,
    log: true,
    args: [],
    waitConfirmations: network.config.blockConfirmations || 1,
  });

  const managerContract = await deploy("Manager", {
    from: deployer,
    log: true,
    args: [deployImplementationContract.address],
    waitConfirmations: network.config.blockConfirmations || 1,
  });
  console.log(network.name);
  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    log("Verifying ..");
    await verify(managerContract.address, [
      deployImplementationContract.address,
    ]);

    await verify(deployImplementationContract.address, []);
  }
};

module.exports.tags = ["all"];
