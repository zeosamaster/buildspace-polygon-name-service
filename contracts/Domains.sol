// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

import "hardhat/console.sol";

contract Domains {
    string public tld;
    uint256 public price;

    mapping(string => address) public domains;

    struct Record {
        string twitter;
        string discord;
    }
    mapping(string => Record) public records;

    constructor(string memory _tld, uint256 _price) {
        tld = _tld;
        price = _price;
        console.log("%s name service deployed", _tld);
    }

    function register(string calldata name) public payable {
        require(domains[name] == address(0), "Domain already registered");

        // Check if enough Matic was paid in the transaction
        require(msg.value >= price, "Not enough Matic paid");

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
