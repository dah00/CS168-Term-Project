"use strict";   

let crypto = require('crypto');

class MerkleTree {
    // hash all transactions to make the leaves of the tree
    // All keep the number of leaves even by duplicating the last transaction if necessary.
    constructor(transactions) {
        this.transactions = transactions;
        this.hashes = transactions.map(tx => this.hash(tx));
        if (this.hashes.length % 2 === 1) {
            this.hashes.push(this.hashes[this.hashes.length - 1]);
        }
        this.tree = this.buildMerkleTree();
    }

    hash(tx) {
        const hash = crypto.createHash("sha256");
        hash.update(tx);
        return hash.digest("hex");
    }

    // implement buildMerkleTree() function here, 
    // which builds the Merkle tree from a list of transactions (or data blocks).
    // store the tree in an array of arrays where the first element is leaves that contains the hashes of the transactions
    // the second element is the first level of the tree, the third element is the second level of the tree, and so on.
    // the last element of the array is the root of the tree.
    /*

    [[h0 h1 h2 h3 h4 h5 h6 h7]
       [h0   h1   h2   h3]   
         [h0         h1]
              [h14]]
*/
    /**
     * Builds a Merkle tree from a list of transactions. 
     * @param {Array} transactions
     * @returns {Array} tree
     */

    // Build a Merkle tree from a list of transactions such that
    // store the tree in an array of arrays where the first element is leaves that contains the hashes of the transactions
    
    buildMerkleTree() {
        let tree = [];
        tree.push(this.hashes);
        let level = 0;
        while (tree[level].length > 1) {
            tree.push([]);
            for (let i = 0; i < tree[level].length; i += 2) {
                // let left = tree[level][i];
                // let right = (i + 1 === tree[level].length) ? left : tree[level][i + 1];
                // let leftHash = this.hash(left);
                // let rightHash = this.hash(right);
                // let parent = this.hash(leftHash + rightHash);
                // tree[level + 1].push(parent);

                let left = tree[level][i];
                // console.log("left: " + left);
                let right = (i + 1 === tree[level].length) ? left : tree[level][i + 1];
                // console.log("right: " + right);
                let hash = this.hash(left + right);
                // console.log("hash: " + hash);
                // console.log("------------------");
                tree[level + 1].push(hash);
            }
            level++;
        }
        return tree;
    }
    
 
    getRootHash() {
        return this.tree[this.tree.length - 1][0];
    }

    getProof(data){
        let hash = this.hash(data);
        let index = this.tree[0].indexOf(hash);
        let proof = [];
        let level = 0;
        while (this.tree[level].length > 1) {
            let isLeft = (index % 2 === 0);
            let siblingIndex = (isLeft) ? index + 1 : index - 1;
            let sibling = this.tree[level][siblingIndex];
            proof.push(sibling);
            index = Math.floor(index / 2);
            level++;
        }
        return proof;
    }

    // write a verify proof function that verifies whether a given data block is in the Merkle tree or not.
    // the function should return true if the data block is in the Merkle tree and false otherwise.
    // keep in mind that the merkle tree is structured as an array of arrays.
    // and the proof is an array of hashes that contains the sibling of the first hash in the proof.
    // the function should verify the proof by hashing the data block and the first hash in the proof,

    verifyProof(data, proof) {
        let hash = this.hash(data);
        let index = this.tree[0].indexOf(hash);
        while (proof.length > 0) {
            let sibling = proof.shift();
            let isLeft = (index % 2 === 0);
            if (isLeft) {
                hash = this.hash(hash + sibling);
            } else {
                hash = this.hash(sibling + hash);
            }
            index = Math.floor(index / 2);
        }
        return (hash === this.getRootHash());

    }

}
exports.MerkleTree = MerkleTree;
