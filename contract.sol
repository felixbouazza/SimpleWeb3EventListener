// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.26;

contract myBasicContract {

    mapping(address => uint) public balances;

    event SendEvent(address _from, address _to, uint _amount);

    function send(address _to, uint _amount) external {
        emit SendEvent(msg.sender, _to, _amount);
    }

}