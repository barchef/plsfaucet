const { ethers, Wallet } = require("ethers");
const fs = require("fs");

require("dotenv").config();

const PlsFaucetAbi = require("../abis/PLSFaucet.json");
const PlsFaucetAddress = '0xA73C0Cdf9E6D1b6CA849a11d1E98255f953DD646';

let provider = ethers.providers.getDefaultProvider("https://rpc.pulsechain.com");
let wallet = new Wallet(process.env.FAUCET_PRIVATE_KEY);
let connectedWallet = wallet.connect(provider);

const requestTokens = async (forWallet) => {
  console.log("faucet::requestTokens start - ", forWallet);
  try {
    const _plsFaucetContract = new ethers.Contract(
      PlsFaucetAddress,
      PlsFaucetAbi,
      provider
    );
    const plsFaucetContract = _plsFaucetContract.connect(connectedWallet);
    try {
      const tx = await plsFaucetContract.requestTokens(forWallet);
      await connectedWallet.provider.waitForTransaction(tx.hash);
      console.log(`faucet::requestTokens done:`,tx.hash);
      return tx;
    } catch (error) {
      console.log("Error ", error);
      return error;
    }
  } catch (error) {
    console.log("faucet::requestTokens Error", error);
    return error;
  }
};

module.exports = {
  requestTokens,
};