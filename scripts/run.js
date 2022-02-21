const main = async () => {
  // The first return is the deployer, the second is a random account
  const [owner, user1] = await hre.ethers.getSigners();
  const domainContractFactory = await hre.ethers.getContractFactory("Domains");
  const domainContract = await domainContractFactory.deploy();
  await domainContract.deployed();

  console.log("Contract deployed to:", domainContract.address);
  console.log("Contract deployed by:", owner.address);

  const txn = await domainContract.register("dev#1");
  await txn.wait();

  const domainOwner = await domainContract.getAddress("dev#1");
  console.log("Owner of domain (dev#1):", domainOwner);

  // Trying to set a record that doesn't belong to me!
  const txn2 = await domainContract
    .connect(user1)
    .setRecord("dev#1", { twitter: "@fakeDev1", discord: "fakeDev1#123" });
  await txn2.wait();

  const record = await domainContract.getRecord("dev#1");
  console.log("Record for dev#1", record);
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
