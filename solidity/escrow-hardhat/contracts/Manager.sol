// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/proxy/Clones.sol";
import "./Escrow.sol";

contract Manager {
    address public implementationContract;

    address[] public deployedEscrowContracts;

    event EscrowContractCreated(address contractAddress);

    constructor(address _implementationContract) {
        implementationContract = _implementationContract;
    }

    function createEscrowContract(
        address _arbiter,
        address _beneficiary
    ) external payable {
        address clone = Clones.clone(implementationContract);

        Escrow(clone).initialize{value: msg.value}(
            _arbiter,
            _beneficiary,
            msg.sender
        );

        deployedEscrowContracts.push(clone);

        emit EscrowContractCreated(clone);
    }

    function getDeployedContracts() external view returns (address[] memory) {
        return deployedEscrowContracts;
    }
}
