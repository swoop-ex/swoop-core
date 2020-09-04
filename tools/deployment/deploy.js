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
const Network = require('../network.js');
const { getAddress } = require('@harmony-js/crypto');

// Vars
const network = new Network(argv.network);
network.hmy.wallet.addByPrivateKey(network.accounts.deployer.private_key)

const contracts = {
  'Migrations': [],
  'SafeMath': [],
  'Math': [],
  'Multicall': [],
  'UQ112x112': [],

  'IUniswapV2Factory': [],
  'IUniswapV2Callee': [],
  'IUniswapV2HRC20': [],
  'IUniswapV2Pair': [],

  'UniswapV2HRC20': [],
  'UniswapV2Pair': [],
  'WONE': [],
  'UniswapV2Factory': [network.accounts.deployer.address]
};

async function deploy() {
  for (const contract in contracts) {
    const args = contracts[contract];
    const addr = await deployContract(contract, args);
    console.log(`    Deployed contract ${contract}: ${addr} (${getAddress(addr).bech32})`)
  }
}

async function deployContract(contractName, args) {
  let contractJson = require(`../../build/contracts/${contractName}`)
  // console.log(JSON.stringify(contractJson.abi))
  let contract = network.hmy.contracts.createContract(contractJson.abi)
  contract.wallet.addByPrivateKey(network.accounts.deployer.private_key)
  // contract.wallet.setSigner(network.network.accounts.deployer.private_key);
  let options = {
    data: '0x' + contractJson.bytecode,
    arguments: args
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
