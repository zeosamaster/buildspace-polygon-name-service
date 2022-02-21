const main = async () => {
  const [owner] = await hre.ethers.getSigners();
  const domainContractFactory = await hre.ethers.getContractFactory("Domains");
  const domainContract = await domainContractFactory.deploy();
  await domainContract.deployed();

  console.log("Contract deployed to:", domainContract.address);
  console.log("Contract deployed by:", owner.address);

  const txn = await domainContract.register("dev#1");
  await txn.wait();

  const domainOwner = await domainContract.getAddress("dev#1");
  console.log("Owner of domain (dev#1):", domainOwner);
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
