import web3 from './web3';
import CryptographicCurrency from '../build/contracts/CryptographicCurrency.json';

const instance = new web3.eth.Contract(CryptographicCurrency.abi, "0x71ed006346c3ed5f57EeC3dAfb0995a59b2f0EC5");

export default instance;