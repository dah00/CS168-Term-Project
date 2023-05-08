"use strick"

const { MerkleTree } = require('./merkle-tree');
const { Block } = require('./block');

/**
 * A block is a collection of transactions, with a hash connecting it
 * to a previous block.
 */
module.exports = class BlockMerkleTree extends Block{
    constructor(transactions, previousHash) {
        super(transactions, previousHash);
        this.merkleTree = new MerkleTree(transactions);
        this.rootHash = this.merkleTree.getRootHash();
    }
    
    getRootHash() {
        return this.rootHash;
    }
    
    getProof(transaction) {
        return this.merkleTree.getProof(transaction);
    }
    
    verifyProof(transaction, proof) {
        return this.merkleTree.verifyProof(transaction, proof);
    }
}