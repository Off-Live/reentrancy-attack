// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract TerraBank {

    event fallback1(address _from);
    event fallback2(address _from, uint256 _value);

    constructor() {

    }

    fallback() external {
        emit fallback1(msg.sender);
    }

    receive() external payable {
        emit fallback2(msg.sender, msg.value);
    }

}
