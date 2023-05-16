"use strict";

const Block = require('./block.js');
const MerkleTree = require('./merkle-tree.js');

module.exports = class blockMerkleTree extends Block {
  constructor(rewardAddr, prevBlock, target, coinbaseReward) {
    super(rewardAddr, prevBlock, target, coinbaseReward);
    this.transactions = [];
  }

  buildMerkleTree() {
    this.merkleTree = new MerkleTree(this.transactions);
    this.rootHash = this.merkleTree.getRootHash();
  }

  hashVal() {
    return this.rootHash;
  }

  getBlockProof(data) {
    return this.merkleTree.getProof(data);
  }

  verifyBlockProof(data, proof) {
    return this.merkleTree.verifyProof(data, proof, this.rootHash);
  }

  addTransaction(txn) {
    this.transactions.push(txn);
  }

  /**
   * Converts a Block into string form.  Some fields are deliberately omitted.
   * Note that Block.deserialize plus block.rerun should restore the block.
   *
   * @returns {String} - The block in JSON format.
   */
  serialize() {
    let o = {
      chainLength: this.chainLength,
      timestamp: this.timestamp,
      transactions: this.transactions,
      prevBlockHash: this.prevBlockHash,
      rewardAddr: this.rewardAddr,
      coinbaseReward: this.coinbaseReward,
      rootHash: this.rootHash
    };
    return JSON.stringify(o);
  }

  static deserialize(json) {
    let obj = JSON.parse(json);
    let block = new blockMerkleTree(obj.rewardAddr, null, obj.target, obj.coinbaseReward);
    block.prevBlockHash = obj.prevBlockHash;
    block.chainLength = obj.chainLength;
    block.timestamp = obj.timestamp;
    block.rewardAddr = obj.rewardAddr;
    block.coinbaseReward = obj.coinbaseReward;
    block.transactions = obj.transactions;
    block.rootHash = obj.rootHash;
    return block;
  }
}


