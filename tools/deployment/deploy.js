// Args
const yargs = require('yargs');
const argv = yargs
    .option('network', {
        alias: 'n',
        description: 'Which network to use',
        type: 'string',
        default: 'testnet'
    })
    .help()
    .alias('help', 'h')
    .argv;

// Libs
const { NetworkEnv } = require("@harmony-swoop/utils")
const { getAddress } = require('@harmony-js/crypto')

// Vars
const network = new NetworkEnv(argv.network)
network.client.wallet.addByPrivateKey(network.accounts.deployer.privateKey)

const contracts = {
  'UniswapV2HRC20': [],
  'UniswapV2Pair': [],
  'UniswapV2Factory': [network.client.wallet.signer.address]
};

async function deploy() {
  const deployed = {}

  for (const contract in contracts) {
    const args = contracts[contract]
    const addr = await deployContract(contract, args);
    console.log(`    Deployed contract ${contract}: ${addr} (${getAddress(addr).bech32})`)
    deployed[contract] = addr
  }

  var env = '';
  for (const contract in deployed) {
    const addr = deployed[contract]
    env += `export ${contract.toUpperCase()}=${addr}; `
  }
  console.log(`\n    export NETWORK=${argv.network}; ${env}`)
}

async function deployContract(contractName, args) {
  let contractJson = require(`../../build/contracts/${contractName}`)
  let contract = network.client.contracts.createContract(contractJson.abi)
  contract.wallet.addByPrivateKey(network.accounts.deployer.privateKey)

  let options = {
    arguments: args,
    data: '0x' + contractJson.bytecode
  };

  let response = await contract.methods.contractConstructor(options).send(network.gasOptions())
  const contractAddress = response.transaction.receipt.contractAddress
  return contractAddress
}

deploy()
  .then(() => {
    process.exit(0);
  })
  .catch(function(err){
    console.log(err);
    process.exit(0);
  });
