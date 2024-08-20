import { ethers, network, upgrades } from "hardhat";
import hre from 'hardhat'

const DeploymentConfig = require(`${__dirname}/../deployment_config.ts`);
async function deploy() {
  
  const config = DeploymentConfig[network.name];
  if (!config) {
    throw Error("deployment config undefined");
  }
  
  const [deployer] = await ethers.getSigners();
  
  console.log("Deploying nft contract with the account:", deployer.address);
  
  const PPDigitalCollectibles = await ethers.getContractFactory("PPDigitalCollectibles");
  
  try {
    console.log("Deploying PPDigitalCollectibles...")
    const nft = await PPDigitalCollectibles.deploy("PixelPaddle Cards","PixelPaddle");
    console.log("AFTER Deploying PPDigitalCollectibles...", nft.address)
    
    
    console.info("WAITING JUST RPC SYNC (60s)...")
    await wait(60)
    
    try {
      await hre.run("verify:verify", {
        address: nft.address,
        contract: "contracts/PPDigitalCollectibles.sol:PPDigitalCollectibles",
        constructorArguments: ["PixelPaddle Cards","PixelPaddle"],
      });
      
      console.log("Verified Successfully IMPLEMENTATION");
    } catch (error) {
      console.log("Verification Failed Implementation.: ", error);
    }
  } catch (error) {
    console.error("error ->", error)
  }
  
  
  
  
  
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
deploy().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


async function wait(timeInSeconds: number): Promise<void> {
  await new Promise((r) => setTimeout(r, timeInSeconds * 1000));
}
