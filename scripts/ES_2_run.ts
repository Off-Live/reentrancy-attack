import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  console.log(
    "Account balance:",
    ethers.utils.formatEther(await deployer.getBalance()),
    "ETH"
  );

  // We get the contract to deploy
  const terraBankCA = "0x30c54Ece1bCc168d7B5efFb8d7039AF85D4e286a";
  const userContractCA = "";
  const User = await ethers.getContractFactory("User");
  const userContract = await User.attach(userContractCA);

  let tx;
  let receipt;

  console.log("Deposit With Send");
  tx = await userContract.depositWithSend(terraBankCA, {
    value: ethers.utils.parseEther("0.01 ether"),
  });
  receipt = await tx.wait();
  console.log(receipt);

  console.log("Deposit With Transfer");
  tx = await userContract.depositWithTransfer(terraBankCA, {
    value: ethers.utils.parseEther("0.01 ether"),
  });
  receipt = await tx.wait();
  console.log(receipt);

  console.log("Deposit With Call");
  tx = await userContract.depositWithCall(terraBankCA, {
    value: ethers.utils.parseEther("0.01 ether"),
  });
  receipt = await tx.wait();
  console.log(receipt);

  console.log("Call Fallback");
  tx = await userContract.callFallback(terraBankCA);
  receipt = await tx.wait();
  console.log(receipt);

  console.log("Call Fallback2");
  tx = await userContract.callFallback2(terraBankCA);
  receipt = await tx.wait();
  console.log(receipt);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
