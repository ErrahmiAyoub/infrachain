const Infrachain = artifacts.require("Infrachain");

module.exports = function(deployer) {
  deployer.deploy(Infrachain);
};