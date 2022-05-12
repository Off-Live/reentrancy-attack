// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract User {

    constructor() {

    }

    function depositWithSend(address payable _bankCA) public payable {
        bool sent = _bankCA.send(msg.value);
        require(sent, "Failed");
    }

    function depositWithTransfer(address payable _bankCA) public payable {
        _bankCA.transfer(msg.value);
    }

    function depositWithCall(address payable _bankCA) public payable {
        // ~ v0.7
        // (bool sent, ) = _bankCA.call.value(msg.value)('');
        (bool sent, ) = _bankCA.call("");
        require(sent, "Failed");
    }

    function callFallback(address _bankCA) public {
        // ~ v0.7, 존재하지 않는 함수 호출
        (bool sent, ) = _bankCA.call("call nonexistent function");
        require(sent, "Failed");
    }

    function callFallback2(address payable _bankCA) public payable {
        // ~v0.7, 존재하지 않는 함수 호출 + 이더 전송
        // (bool sent, ) = _bankCA.call.value(msg.value)("call nonexistent function");
        // require(sent, 'Failed');

        // v0.7 ~
        (bool sent, ) = _bankCA.call{value: msg.value}("call nonexistent function");
        require(sent, 'Failed');
    }
}
