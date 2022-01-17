const Evaluaciones = artifacts.require("Evaluaciones");

module.exports = function (deployer) {
  deployer.deploy(Evaluaciones);
};
