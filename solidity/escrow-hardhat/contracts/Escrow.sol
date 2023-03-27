// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/proxy/utils/Initializable.sol";

contract Escrow is Initializable {
    address public arbiter;
    address public beneficiary;
    address public depositor;

    bool public isApproved;

    event Approved(uint);

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(
        address _arbiter,
        address _beneficiary,
        address _depositor
    ) public payable initializer {
        arbiter = _arbiter;
        beneficiary = _beneficiary;
        depositor = _depositor;
    }

    function approve() external {
        require(msg.sender == arbiter);
        uint balance = address(this).balance;
        (bool sent, ) = payable(beneficiary).call{value: balance}("");
        require(sent, "Failed to send Ether");
        emit Approved(balance);
        isApproved = true;
    }
}
