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
  const txn = await domainContract.register("dev#1", {
    value: hre.ethers.utils.parseEther("0.01"),
  });
  await txn.wait();

  // AlreadyRegistered error
  try {
    const txn2 = await domainContract.connect(user).register("dev#1", {
      value: hre.ethers.utils.parseEther("0.01"),
    });
    await txn2.wait();
  } catch (error) {
    console.error(error.message);
  }

  // NotEnoughMaticPaid error
  try {
    const txn3 = await domainContract.register("dev#2", {
      value: hre.ethers.utils.parseEther("0.005"),
    });
    await txn3.wait();
  } catch (error) {
    console.error(error.message);
  }

  // Unathorized error
  try {
    const txn4 = await domainContract.connect(user).setRecord("dev#1", {
      twitter: "@fakeDev1",
      discord: "fakeDev1#123",
    });
    await txn4.wait();
  } catch (error) {
    console.error(error.message);
  }

  // WithdrawalFailed error
  try {
    const txn5 = await domainContract.connect(user).withdraw();
    await txn5.wait();
  } catch (error) {
    console.error(error.message);
  }
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
