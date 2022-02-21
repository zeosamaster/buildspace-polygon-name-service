// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

import "hardhat/console.sol";

contract Domains {
    mapping(string => address) public domains;

    // Checkout our new mapping! This will store values
    struct Record {
        string twitter;
        string discord;
    }

    mapping(string => Record) public records;

    constructor() {
        console.log("Yo yo, I am a contract and I am smart");
    }

    function register(string calldata name) public {
        // Check that the name is unregistered (explained in notes)
        require(domains[name] == address(0), "Domain already registered");
        domains[name] = msg.sender;
        console.log("%s has registered a domain!", msg.sender);
    }

    function getAddress(string calldata name) public view returns (address) {
        return domains[name];
    }

    function setRecord(string calldata name, Record calldata record) public {
        // Check that the owner is the transaction sender
        require(
            domains[name] == msg.sender,
            "Only the domain owner can set its record"
        );
        records[name] = record;
    }

    function getRecord(string calldata name)
        public
        view
        returns (Record memory)
    {
        return records[name];
    }
}
