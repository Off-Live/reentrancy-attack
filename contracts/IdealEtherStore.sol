// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract IdealEtherStore {

    bool reEntrancyMutex = false;
    uint256 withdrawalLimit = 0.01 ether;
    mapping(address => uint256) public lastWithdrawTime;
    mapping(address => uint256) public balances;

    function depositFunds() public payable {
        balances[msg.sender] += msg.value;
    }

    function withdrawFunds (uint256 _weiToWithdraw) public {
        require(!reEntrancyMutex);
        require(balances[msg.sender] >= _weiToWithdraw);
        require(_weiToWithdraw <= withdrawalLimit);
        require(block.timestamp >= lastWithdrawTime[msg.sender]);
        balances[msg.sender] -= _weiToWithdraw;
        lastWithdrawTime[msg.sender] = block.timestamp;
        reEntrancyMutex = true;
        address payable owner = payable(msg.sender);
        owner.transfer(_weiToWithdraw);
        reEntrancyMutex = false;
    }
}
