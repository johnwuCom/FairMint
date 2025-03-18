import Web3 from "web3";

const web3 = new Web3(
  new Web3.providers.HttpProvider("https://bsc-dataseed.binance.org/")
);
const tokenAdd = "0x3e290e20d5c207523f53fa384ad87d69cc543f21";
const address = "";
const privateKey = "";
const BNB_Amount = 0.01;

const singleMintPrice = Number(web3.utils.toWei("0.01", "ether"));
let totalMintAmount = Number(web3.utils.toWei(BNB_Amount, "ether"));

const mint = async () => {
  const fairContractAdd = "0xd991C8DaC59c969CeFEB442d0e6cAe8E6c7f1f2a";
  const data = `0x6a627842000000000000000000000000${tokenAdd.slice(2)}`;
  if (totalMintAmount <= 0) {
    console.log("請入數總共要Mint的BNB數量");
    process.exit();
  }
  while (totalMintAmount >= singleMintPrice) {
    const nonce = await web3.eth.getTransactionCount(address, "latest");
    const signedTx = await web3.eth.accounts.signTransaction(
      {
        to: fairContractAdd,
        data: data,
        value: web3.utils.toWei("0.01", "ether"),
        gas: 256477,
        nonce,
        gasPrice: web3.utils.toWei("2", "gwei"),
      },
      privateKey
    );
    const hash = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    console.log(hash.transactionHash);
    totalMintAmount -= singleMintPrice;
    console.log(totalMintAmount);
    await new Promise((resolve) => setTimeout(resolve, 1000 * 5));
  }
  console.log("Mint Done");
  process.exit();
};

mint();
