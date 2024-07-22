// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract BusBooking is ERC721 {
    address public owner; //owner of the smart contract
    uint256 public totalOccasions;  
    uint256 public totalSupply;

    struct Occasion {
        uint256 id;
        string name;
        string start;
        string end;
        uint256 cost;
        uint256 tickets;
        uint256 maxTickets;
        string date;
        string time;
        string departure;
        string destination;
    }

    mapping(uint256 => Occasion) occasions;
    mapping(uint256 => mapping(address => bool)) public hasBought; // avoids double spending 
    mapping(uint256 => mapping(uint256 => address)) public seatTaken; // nested mapping for pointing the passenger
    mapping(uint256 => uint256[]) seatsTaken; // keeping track of all the taken seats for each bus

    // access in the hand of owner only 
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    constructor(
        string memory _name,
        string memory _symbol
    ) ERC721(_name, _symbol) {
        owner = msg.sender; // address of the owner
    }
    
    function list(
        string memory _name,
        string memory _start,
        string memory _end,
        uint256 _cost,
        uint256 _maxTickets,
        string memory _date,
        string memory _time,
        string memory _departure,
        string memory _destination
    ) public onlyOwner {
        totalOccasions++;
        occasions[totalOccasions] = Occasion(
            totalOccasions,
            _name,
            _start,
            _end,
            _cost,
            _maxTickets,
            _maxTickets,
            _date,
            _time,
            _departure,
            _destination
        );
    }

    // buying the nft tickets : mint function will create the nft from scratch 
    function mint(uint256 _id, uint256 _seat) public payable {
        // Require that _id is not 0 or less than total occasions...
        require(_id != 0);
        require(_id <= totalOccasions);

        // Require that ETH sent is greater than cost...
        require(msg.value >= occasions[_id].cost);

        // Require that the seat is not taken, and the seat exists...
        require(seatTaken[_id][_seat] == address(0));
        require(_seat <= occasions[_id].maxTickets);

        occasions[_id].tickets -= 1; // Update ticket count
        hasBought[_id][msg.sender] = true; // Update buying status
        seatTaken[_id][_seat] = msg.sender; // Assign seat
        seatsTaken[_id].push(_seat); // Update seats currently taken

        totalSupply++;  // will also work as new ID

        // function built in openzepperlin
        _safeMint(msg.sender, totalSupply);
    }

    function getOccasion(uint256 _id) public view returns (Occasion memory) {
        return occasions[_id];
    }

    function getSeatsTaken(uint256 _id) public view returns (uint256[] memory) {
        return seatsTaken[_id];
    }

    function withdraw() public onlyOwner {
        (bool success, ) = owner.call{value: address(this).balance}("");
        require(success);
    }
}
