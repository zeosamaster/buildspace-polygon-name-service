const main = async () => {
  const [owner, user] = await hre.ethers.getSigners();
  const domainContractFactory = await hre.ethers.getContractFactory("Domains");

  // deploy
  const domainContract = await domainContractFactory.deploy(
    "Developer DAO Name Service",
    "DDNS",
    "D_D",
    hre.ethers.utils.parseEther("0.01")
  );
  await domainContract.deployed();

  console.log("Contract deployed to:", domainContract.address);
  console.log("Contract deployed by:", owner.address);

  // register
  let txn = await domainContract.register("dev#1", {
    value: hre.ethers.utils.parseEther("0.01"),
  });
  await txn.wait();

  // set record
  const txn2 = await domainContract.setRecord("dev#1", {
    twitter: "@realDev1",
    discord: "realDev1#123",
  });
  await txn2.wait();

  const record = await domainContract.getRecord("dev#1");
  console.log("Record for dev#1", record);

  // get address
  const domainOwner = await domainContract.getAddress("dev#1");
  console.log("Owner of domain (dev#1):", domainOwner);

  // contract balance
  const contractBalance = await hre.ethers.provider.getBalance(
    domainContract.address
  );
  console.log(
    "Contract balance:",
    hre.ethers.utils.formatEther(contractBalance)
  );

  // withdraw (non-owner)
  try {
    const txn3 = await domainContract.connect(user).withdraw();
    await txn3.wait();
  } catch (error) {
    console.log("Could not rob contract");
  }

  // withdraw (owner)
  const ownerBalance = await hre.ethers.provider.getBalance(owner.address);
  console.log("Owner balance:", hre.ethers.utils.formatEther(ownerBalance));

  const txn4 = await domainContract.connect(owner).withdraw();
  await txn4.wait();

  const newOwnerBalance = await hre.ethers.provider.getBalance(owner.address);
  console.log(
    "Owner balance after withdrawal:",
    hre.ethers.utils.formatEther(newOwnerBalance)
  );

  const newContractBalance = await hre.ethers.provider.getBalance(
    domainContract.address
  );
  console.log(
    "Contract balance after withdrawal:",
    hre.ethers.utils.formatEther(newContractBalance)
  );
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
