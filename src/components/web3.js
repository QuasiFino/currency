import Web3 from 'web3';

let web3;

const provider = new Web3.providers.HttpProvider(
    'https://rinkeby.infura.io/v3/65bda69285c74fb494e2cf754fae53ee'
);
web3 = new Web3(provider);

export default web3;