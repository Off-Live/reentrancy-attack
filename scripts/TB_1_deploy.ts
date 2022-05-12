import { ethers } from "hardhat";

async function main() {
  const [deployer, deployer2, k] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer2.address);
  console.log(
    "Account balance:",
    ethers.utils.formatEther(await deployer2.getBalance()),
    "ETH"
  );

  // We get the contract to deploy
  const TerraBank = await ethers.getContractFactory("TerraBank");
  const terraBank = await TerraBank.connect(deployer2).deploy();
  await terraBank.deployed();
  console.log("TerraBank Contract deployed to:", terraBank.address);

  // We get the contract to deploy
  const User = await ethers.getContractFactory("User");
  const userContract = await User.connect(deployer2).deploy();
  await userContract.deployed();
  console.log("User Contract deployed to:", userContract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
