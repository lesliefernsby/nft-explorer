const { web3, contractABI } = require("../config/web3.config");

async function getMetaData(address, tokenId) {
  const myContract = new web3.eth.Contract(contractABI, address);
  const data = await myContract.methods
    .tokenURI(tokenId)
    .call()
    .then((uri) => {
      uri = uri.slice(7);
      return fetch(`https://ipfs.io/ipfs/${uri}`);
    })
    .then((data) => data.json());

  return data;
}


module.exports = {
  getMetaData,
}
