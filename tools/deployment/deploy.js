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
const Network = require("../network.js");
const { getAddress } = require("@harmony-js/crypto");

// Vars
const network = new Network(argv.network);
network.hmy.wallet.addByPrivateKey(network.privateKeys.deployer);

async function deploy() {
  let uniswapV2ERC20Address = await deployContract('UniswapV2ERC20');
  let uniswapV2PairAddress = await deployContract('UniswapV2Pair');

  console.log(`   UniswapV2ERC20 address: ${uniswapV2ERC20Address} - ${getAddress(uniswapV2ERC20Address).bech32}`);
  console.log(`   UniswapV2Pair address: ${uniswapV2PairAddress} - ${getAddress(uniswapV2PairAddress).bech32}`);
  console.log(`   export NETWORK=${argv.network}; export UNISWAPV2ERC20=${uniswapV2ERC20Address}; export UNISWAPV2PAIR=${uniswapV2PairAddress};`);
  console.log(`   addresses: {"uniswapV2ERC20": "${uniswapV2ERC20Address}", "uniswapV2Pair": "${uniswapV2PairAddress}"}\n`);
}

async function deployContract(contractName) {
  let contractJson = require(`../../build/contracts/${contractName}.json`);
  let contract = network.hmy.contracts.createContract(contractJson.abi);
  contract.wallet.addByPrivateKey(network.privateKeys.deployer);
  //contract.wallet.setSigner(network.privateKeys.deployer);
  let deployOptions = { data: contractJson.bytecode };

  let response = await contract.methods.contractConstructor(deployOptions).send(network.gasOptions());
  const contractAddress = response.transaction.receipt.contractAddress;
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
