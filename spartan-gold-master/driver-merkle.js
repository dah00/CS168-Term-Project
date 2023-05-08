// write a driver program that creates clients and miners. Clients transfer money to each other and miners mine blocks.
// the driver program should create a Merkle tree for each block and verify the proof of the transactions.
// proof of transactions is the proof of inclusion of the transaction in the Merkle tree.

// Path: spartan-gold-master\driver-merkle.js
// Compare this snippet from spartan-gold-master\merkleTree.test.js:
// // The test should create take a 7 transactions and create a merkle tree from them.
// // Then it should take a transaction and verify that it is in the merkle tree by using the get proof function.
// // Then it should verify that the merkle tree is correct by using the verify proof function.
//
"use strict";
const assert = require('assert');
const { MerkleTree } = require('./merkle-tree');
let Blockchain = require('./blockchain.js');
let Block = require('./block.js');
let Client = require('./client.js');
let Miner = require('./miner.js');
let Transaction = require('./transaction.js');

let FakeNet = require('./fake-net.js');

let net = new FakeNet();

let miner = new Miner(net);
let client1 = new Client(net);
let client2 = new Client(net);
let client3 = new Client(net);
let client4 = new Client(net);
let client5 = new Client(net);
let client6 = new Client(net);

miner.mine();

client1.send(10, client2.keyPair.public);
client2.send(5, client3.keyPair.public);
client3.send(2, client4.keyPair.public);
client4.send(1, client5.keyPair.public);
client5.send(1, client6.keyPair.public);
client6.send(1, client1.keyPair.public);
client1.send(1, client2.keyPair.public);

let transactions = [client1.lastTransaction, client2.lastTransaction, client3.lastTransaction, client4.lastTransaction, client5.lastTransaction, client6.lastTransaction, client1.lastTransaction];

