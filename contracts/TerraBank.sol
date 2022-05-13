// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract TerraBank {

    event fallbacked(address _from);
    event received(address _from, uint256 _value);

    constructor() {
    }

    fallback() external {
        emit fallbacked(msg.sender);
    }

    receive() external payable {
        emit received(msg.sender, msg.value);
    }
}
