# Swoop - a fork of Uniswap V2 for Harmony

Swoop is a fork of Uniswap V2 for Harmony's #Hack9 hackathon.

This repository contains the smart contracts for the project.

# Local Development

## Install Dependencies

`./scripts/install.sh`

## Build/Compile Contracts

`./scripts/build.sh`

## Run Tests

`yarn test`

## Deploy contracts

### Using hmy:

Usage:
`./scripts/deploy.sh --network NETWORK`

Example:
`./scripts/deploy.sh --network testnet`

### Using truffle:

Truffle requires NodeJS v12, otherwise it seems to break.
The current deployment using Truffle is also currently not working properly - the hmy deployment method is preferable and is also the default deployment method.

Usage:
`./scripts/deploy.sh --method truffle --network NETWORK`

Example:
`./scripts/deploy.sh --method truffle --network testnet`

You can also use `--reset` and `--skip-dry-run` to reset any eventual migration from scratch as well as skipping dry runs.
Example:
`./scripts/deploy.sh --method truffle --network testnet --reset --skip-dry-run`

## Extract ABI

`./scripts/abi.sh`

---

# Uniswap V2

[![Actions Status](https://github.com/swoop-ex/swoop-core/workflows/CI/badge.svg)](https://github.com/swoop-ex/swoop-core/actions)
[![Version](https://img.shields.io/npm/v/@swoop-exchange/core)](https://www.npmjs.com/package/@swoop-exchange/core)

In-depth documentation on Uniswap V2 is available at [uniswap.org](https://uniswap.org/docs).

The built contract artifacts can be browsed via [unpkg.com](https://unpkg.com/browse/@swoop-exchange/core@latest/).

# Local Development

The following assumes the use of `node@>=10`.

## Install Dependencies

`yarn`

## Compile Contracts

`yarn compile`

## Run Tests

`yarn test`
