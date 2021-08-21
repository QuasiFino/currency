// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

/*
 * @dev Provides information about the current execution context, including the
 * sender of the transaction and its data. While these are generally available
 * via msg.sender and msg.data, they should not be accessed in such a direct
 * manner, since when dealing with meta-transactions the account sending and
 * paying for execution may not be the actual sender (as far as an application
 * is concerned).
 *
 * This contract is only required for intermediate, library-like contracts.
 */

abstract contract Context {
    function _msgSender() internal view virtual returns (address payable) {
        return payable(msg.sender);
    }

    function _msgData() internal view virtual returns (bytes memory) {
        this; // silence state mutability warning without generating bytecode - see https://github.com/ethereum/solidity/issues/2691
        return msg.data;
    }
}

contract Ownable is Context {
    address private _owner;
    address private _previousOwner;
    uint256 private _lockTime;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    constructor () {
        address msgSender = _msgSender();
        _owner = msgSender;
        emit OwnershipTransferred(address(0), msgSender);
    }

    function owner() public view returns (address) {
        return _owner;
    }   
    
    modifier onlyOwner() {
        require(_owner == _msgSender(), "Ownable: caller is not the owner");
        _;
    }
    
    function renounceOwnership() public virtual onlyOwner {
        emit OwnershipTransferred(_owner, address(0));
        _owner = address(0);
    }

    function transferOwnership(address newOwner) public virtual onlyOwner {
        require(newOwner != address(0), "Ownable: new owner is the zero address");
        emit OwnershipTransferred(_owner, newOwner);
        _owner = newOwner;
    }
}

contract CryptographicCurrency is Context, Ownable {
    
    mapping(bytes32 => string[4]) public currencyInfo;
    bytes32 [] public hashList;
    
    function generateCryptograhicHash(string memory coinSerial, string memory coinName, string memory coinType, string memory creationTime) 
        external onlyOwner() returns(uint256)
    {
        bytes32 hash = keccak256(abi.encodePacked(coinName, coinType, creationTime));
        currencyInfo[hash] = [coinSerial, coinName, coinType, creationTime];
        hashList.push(hash);
        return hashList.length;
    }
    
    function checkCoinInfo(bytes32 hash) public view returns (string memory, string memory, string memory, string memory){
        string memory coinSerial = currencyInfo[hash][0];
        string memory coinName = currencyInfo[hash][1];
        string memory coinType = currencyInfo[hash][2];
        string memory creationTime = currencyInfo[hash][3];
        
        return (coinSerial, coinName, coinType, creationTime);
    }
    
    function setCurrencyInfo(bytes32 hash, string memory coinSerial, string memory coinName, string memory coinType, string memory creationTime)
        external onlyOwner()
    {
        currencyInfo[hash] = [coinSerial, coinName, coinType, creationTime];
        hashList.push(hash);
    }
    
    function checkHashListLength() public view returns(uint256) {
        return hashList.length;
    }
}
