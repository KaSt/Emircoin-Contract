const Emircoin = artifacts.require("Emircoin");

contract("Emircoin", accounts => {
    it("Emircoin should have name and version", async () => {
        let instance = await Emircoin.deployed();
        let name = await instance.getName.call();
        let version = await instance.getVersion.call();
        assert.equal((name !== undefined && version !== undefined), true);
    });

    it('Emircoin balance should starts with 0 ETH', async () => {
        let instance = await Emircoin.deployed();
        let balance = await web3.eth.getBalance(instance.address);
        assert.equal(balance, 0);
    })

    it('You send 1 Ether, you get 1 Emircoin', async () => {
        let instance = await Emircoin.deployed();
        let one_ether = 1
        let one_eth_string = web3.utils.toWei(one_ether.toString(), "ether");
        await web3.eth.sendTransaction({from: accounts[1], to: instance.address, value: one_eth_string});
        let balance_wei = await web3.eth.getBalance(instance.address);
        let balance_ether = web3.utils.fromWei(balance_wei, "ether");
        let token_balance_bn = await instance.balanceOf.call(accounts[1]);
        let token_balance = web3.utils.fromWei(token_balance_bn, "ether");

        assert.equal((balance_ether == 1 && token_balance == 1), true);
    })

});