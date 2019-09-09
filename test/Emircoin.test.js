const Emircoin = artifacts.require("Emircoin");

contract("Emircoin", accounts => {
    it("Should have name and version", async () => {
        let instance = await Emircoin.deployed();
        let name = await instance.getName.call();
        let version = await instance.getVersion.call();
        assert.equal((name !== undefined && version !== undefined), true);
    });

    it("should send coins correctly", async () => {
        let account_one = accounts[0];
        let account_two = accounts[1];

        let amount = 5;

        let instance = await Emircoin.deployed();
        let meta = instance;

        let result = await meta.send(String(web3.utils.toWei(amount.toString(), "ether")));
        assert.equal((result !== undefined && result.receipt.status == true), true);
    });
});