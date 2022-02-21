const main = async () => {
  const domainContractFactory = await hre.ethers.getContractFactory("Domains");
  const domainContract = await domainContractFactory.deploy(
    "Developer DAO Name Service",
    "DDNS",
    "D_D",
    hre.ethers.utils.parseEther("0.01")
  );
  await domainContract.deployed();

  console.log("Contract deployed to:", domainContract.address);

  // CHANGE THIS DOMAIN TO SOMETHING ELSE! I don't want to see OpenSea full of bananas lol
  let txn = await domainContract.register("7317", {
    value: hre.ethers.utils.parseEther("0.01"),
  });
  await txn.wait();
  console.log("Minted domain 7317.D_D");

  txn = await domainContract.setRecord("7317", {
    twitter: "",
    discord: "",
  });
  await txn.wait();
  console.log("Set record for 7317.D_D");

  const address = await domainContract.getAddress("7317");
  console.log("Owner of domain 7317.D_D:", address);

  const balance = await hre.ethers.provider.getBalance(domainContract.address);
  console.log("Contract balance:", hre.ethers.utils.formatEther(balance));
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
