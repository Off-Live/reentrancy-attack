import { ethers } from "hardhat";

async function main() {
  const [deployer, hogu, killer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  console.log(
    "Account balance:",
    ethers.utils.formatEther(await deployer.getBalance()),
    "ETH"
  );

  // We get the contract to deploy
  const EtherStore = await ethers.getContractFactory("EtherStore");
  const etherStore = await EtherStore.connect(deployer).deploy();
  await etherStore.deployed();
  console.log("EtherStore Contract deployed to:", etherStore.address);

  // We get the contract to deploy
  const Attack = await ethers.getContractFactory("Attack");
  const attacker = await Attack.connect(deployer).deploy(etherStore.address);
  await attacker.deployed();
  console.log("Attack Contract deployed to:", attacker.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
