const Emircoin = artifacts.require("Emircoin");


module.exports = function(deployer) {
  deployer.deploy(Emircoin);
};