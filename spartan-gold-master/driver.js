"use strict";

let Blockchain = require('./blockchain.js');
let Block = require('./block.js');
let Client = require('./client.js');
let Miner = require('./miner.js');
let TimeMiner = require('./timeMiner.js')
let Transaction = require('./transaction.js');

let FakeNet = require('./fake-net.js');

let adjustablePoW = true;

if (adjustablePoW) {
  Miner = TimeMiner;
}

console.log("Starting simulation.  This may take a moment...");


let fakeNet = new FakeNet();

// Clients
let alice = new Client({name: "Alice", net: fakeNet});
let bob = new Client({name: "Bob", net: fakeNet});
let charlie = new Client({name: "Charlie", net: fakeNet});

// Miners
let minnie = new Miner({name: "Minnie", net: fakeNet});
let mickey = new Miner({name: "Mickey", net: fakeNet});

// Creating genesis block
let genesis = Blockchain.makeGenesis({
  blockClass: Block,
  transactionClass: Transaction,
  clientBalanceMap: new Map([
    [alice, 233],
    [bob, 99],
    [charlie, 67],
    [minnie, 400],
    [mickey, 300],
  ]),
});

// Late miner - Donald has more mining power, represented by the miningRounds.
// (Mickey and Minnie have the default of 2000 rounds).
let donald = new Miner({name: "Donald", net: fakeNet, startingBlock: genesis, miningRounds: 3000});

// Time Miner - Timothy runs with the adjustable PoW target.
let timothy = new Miner({name: "Timothy", net: fakeNet, startingBlock: genesis, miningRounds: 3000});

function showBalances(client) {
  console.log(`Alice has ${client.lastBlock.balanceOf(alice.address)} gold.`);
  console.log(`Bob has ${client.lastBlock.balanceOf(bob.address)} gold.`);
  console.log(`Charlie has ${client.lastBlock.balanceOf(charlie.address)} gold.`);
  console.log(`Minnie has ${client.lastBlock.balanceOf(minnie.address)} gold.`);
  console.log(`Mickey has ${client.lastBlock.balanceOf(mickey.address)} gold.`);
  console.log(`Donald has ${client.lastBlock.balanceOf(donald.address)} gold.`);
  console.log(`Timothy has ${client.lastBlock.balanceOf(timothy.address)} gold.`);
}

// Showing the initial balances from Alice's perspective, for no particular reason.
console.log("Initial balances:");
showBalances(alice);

fakeNet.register(alice, bob, charlie, minnie, mickey);

// Miners start mining.
minnie.initialize();
mickey.initialize();

// Alice transfers some money to Bob.
console.log(`Alice is transferring 40 gold to ${bob.address}`);
alice.postTransaction([{ amount: 40, address: bob.address }]);

console.log(`Alice is transferring 1 gold to ${bob.address}`);
charlie.postTransaction([{ amount: 1, address: bob.address }]);

console.log(`Alice is transferring 1 gold to ${bob.address}`);
alice.postTransaction([{ amount: 50, address: bob.address }]);

console.log(`Alice is transferring 1 gold to ${bob.address}`);
alice.postTransaction([{ amount: 1, address: bob.address }]);

console.log(`charlie is transferring 1 gold to ${bob.address}`);
charlie.postTransaction([{ amount: 1, address: bob.address }]);

console.log(`Alice is transferring 1 gold to ${bob.address}`);
alice.postTransaction([{ amount: 1, address: bob.address }]);

console.log(`Alice is transferring 1 gold to ${bob.address}`);
alice.postTransaction([{ amount: 1, address: bob.address }]);

console.log(`charlie is transferring 1 gold to ${bob.address}`);
charlie.postTransaction([{ amount: 1, address: bob.address }]);

console.log(`Alice is transferring 1 gold to ${bob.address}`);
alice.postTransaction([{ amount: 1, address: bob.address }]);

console.log(`Alice is transferring 1 gold to ${bob.address}`);
alice.postTransaction([{ amount: 1, address: bob.address }]);

console.log(`Alice is transferring 100 gold to ${bob.address}`);
alice.postTransaction([{ amount: 100, address: bob.address }]);

console.log(`Bob is transferring 100 gold to ${alice.address}`);
bob.postTransaction([{ amount: 80, address: alice.address }]);



setTimeout(() => {
  console.log();
  console.log("***Starting a late-to-the-party miners***");
  console.log();
  fakeNet.register(donald);
  fakeNet.register(timothy);
  donald.initialize();
  timothy.initialize();
}, 500);

// Print out the final balances after it has been running for some time.
setTimeout(() => {
  console.log();
  console.log(`Minnie has a chain of length ${minnie.currentBlock.chainLength}:`);
  //console.log(`Minie block ${minnie.currentBlock.toString()}`);

  console.log();
  console.log(`Mickey has a chain of length ${mickey.currentBlock.chainLength}:`);

  console.log();
  console.log(`Donald has a chain of length ${donald.currentBlock.chainLength}:`);

  console.log();
  console.log(`Timothy has a chain of length ${timothy.currentBlock.chainLength}:`);

  console.log();
  console.log("Final balances (Minnie's perspective):");
  showBalances(minnie);

  console.log();
  console.log("Final balances (Alice's perspective):");
  showBalances(alice);

  console.log();
  console.log("Final balances (Donald's perspective):");
  showBalances(donald);

  console.log();
  console.log("Final balances (Timothy's perspective):");
  showBalances(timothy);

  process.exit(0);
}, 20000);
