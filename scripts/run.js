const main = async () => {
  const [owner] = await hre.ethers.getSigners();
  const domainContractFactory = await hre.ethers.getContractFactory("Domains");
  // We pass in "D_D" to the constructor when deploying
  // along with the domain price
  const domainContract = await domainContractFactory.deploy(
    "D_D",
    hre.ethers.utils.parseEther("0.01")
  );
  await domainContract.deployed();

  console.log("Contract deployed to:", domainContract.address);
  console.log("Contract deployed by:", owner.address);

  // We're passing in a second variable - value. This is the moneyyyyyyyyyy
  let txn = await domainContract.register("dev#1", {
    value: hre.ethers.utils.parseEther("0.01"),
  });
  await txn.wait();

  const domainOwner = await domainContract.getAddress("dev#1");
  console.log("Owner of domain (dev#1):", domainOwner);

  const balance = await hre.ethers.provider.getBalance(domainContract.address);
  console.log("Contract balance:", hre.ethers.utils.formatEther(balance));

  const txn2 = await domainContract.setRecord("dev#1", {
    twitter: "@realDev1",
    discord: "realDev1#123",
  });
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
