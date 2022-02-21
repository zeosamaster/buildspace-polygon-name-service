// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.10;

error NotOwner();

/**
 * @title Ownable
 * @dev Handles contract ownership
 */
contract Ownable {
    // ------------------------------------------------------------------
    // config

    address payable public owner;

    /**
     * @param _owner Contract owner
     */
    constructor(address _owner) payable {
        owner = payable(_owner);
    }

    // ------------------------------------------------------------------
    // owner events

    event OwnerChanged(address indexed previousOwner, address indexed newOwner);

    // ------------------------------------------------------------------
    // modifiers

    modifier isOwner() {
        if (msg.sender != owner) revert NotOwner();
        _;
    }

    // ------------------------------------------------------------------
    // owner functions

    /**
     * @dev Set owner
     * @param _owner new owner address
     */
    function setOwner(address _owner) public isOwner {
        emit OwnerChanged(owner, _owner);
        owner = payable(_owner);
    }
}
