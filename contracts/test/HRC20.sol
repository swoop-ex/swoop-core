pragma solidity =0.5.16;

import '../UniswapV2HRC20.sol';

contract HRC20 is UniswapV2HRC20 {
    constructor(uint _totalSupply) public {
        _mint(msg.sender, _totalSupply);
    }
}
