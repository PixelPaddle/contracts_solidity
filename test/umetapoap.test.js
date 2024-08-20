const hre = require("hardhat");
const ethers = hre.ethers;
const chai = require("chai");
const { expect } = chai;
const fs = require("fs");
const path = require("path");
const network = hre.hardhatArguments.network;

describe.only("UMeta: ", function () {
  beforeEach("deploy", async function () {
    [account1] = await ethers.getSigners();

    this.UMeta;

    const contractAddresses = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, "../config.json"), "utf8")
    );

    if (hre.network.name != "hardhat") {
      this.UMeta = await hre.ethers.getContractAt(
        "UMeta",
        contractAddresses[network].UMeta,
        account1
      );
    } else {
      const UMeta = await ethers.getContractFactory("UMeta");
      this.UMeta = await UMeta.deploy("UMeta", "UMeta");
      await this.UMeta.deployed();
    }
  });

  it("Test 1 goes here...", async function () {
    console.log("PASSED")
  });
});
