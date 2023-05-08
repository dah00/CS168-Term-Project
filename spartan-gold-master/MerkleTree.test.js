// Write a mocha test for the merkle tree. 
// The test should create take a 16 transactions and create a merkle tree from them.
// Then it should take a transaction and verify that it is in the merkle tree by using the get proof function.
// Then it should verify that the merkle tree is correct by using the verify proof function.

"use strict";
const assert = require('assert');
const { MerkleTree } = require('./merkle-tree');

describe('MerkleTree', () => {
  it('should build a Merkle Tree and return the correct root hash', () => {
    const transactions = ['tx1', 'tx2', 'tx3', 'tx4'];
    const merkleTree = new MerkleTree(transactions);
    console.log(merkleTree.tree);
    assert.strictEqual(merkleTree.getRootHash(), '773bc304a3b0a626a520a8d6eacc36809ac18c0b174f3ff3cdaf0a4e9c64433d');    
  });

  it('should return a valid proof for a transaction in the tree', () => {
    const transactions = ['tx1', 'tx2', 'tx3', 'tx4'];
    const merkleTree = new MerkleTree(transactions);
    const proof = merkleTree.getProof('tx3');
    const expectedProof = [
      '41b637cfd9eb3e2f60f734f9ca44e5c1559c6f481d49d6ed6891f3e9a086ac78',
      'f8f28ede979567036d801ad6cf58b551c7d8530bba005c48e46d39c73ab52664'
    ];
    assert.deepStrictEqual(proof, expectedProof);
  });

  it('should return false for an invalid transaction', () => {
    const transactions = ['tx1', 'tx2', 'tx3', 'tx4'];
    const merkleTree = new MerkleTree(transactions);
    const proof = merkleTree.getProof('tx3');
    const valid = merkleTree.verifyProof('tx2', proof);
    assert.strictEqual(valid, false);
  });

  it('should return true for a valid transaction', () => {
    const transactions = ['tx1', 'tx2', 'tx3', 'tx4'];
    const merkleTree = new MerkleTree(transactions);
    const proof = merkleTree.getProof('tx3');
    const valid = merkleTree.verifyProof('tx3', proof);
    assert.strictEqual(valid, true);
  });
});

describe('MerkleTree', () => {
  it('should build a Merkle Tree and return the correct root hash', () => {
    const transactions = ['tx1', 'tx2', 'tx3', 'tx4', 'tx5'];
    const merkleTree = new MerkleTree(transactions);
    console.log(merkleTree.tree);
    assert.strictEqual(merkleTree.getRootHash(), 'db60ce68c3176600258a40668f6e1a54198cf1d9239e7748276cb84d73d7a5ff');    
  });

  it('should return a valid proof for a transaction in the tree', () => {
    const transactions = ['tx1', 'tx2', 'tx3', 'tx4', 'tx5'];
    const merkleTree = new MerkleTree(transactions);
    const proof = merkleTree.getProof('tx3');
    const expectedProof = [
          '41b637cfd9eb3e2f60f734f9ca44e5c1559c6f481d49d6ed6891f3e9a086ac78',
          'f8f28ede979567036d801ad6cf58b551c7d8530bba005c48e46d39c73ab52664',
          'c30d1c12d240decad5d2e5921647bebd24954de45f8f03de4e79694dc94c1ba1'
    ];
    assert.deepStrictEqual(proof, expectedProof);
  });

  it('should return false for an invalid transaction', () => {
    const transactions = ['tx1', 'tx2', 'tx3', 'tx4', 'tx5'];
    const merkleTree = new MerkleTree(transactions);
    const proof = merkleTree.getProof('tx3');
    const valid = merkleTree.verifyProof('tx2', proof);
    assert.strictEqual(valid, false);
  });

  it('should return true for a valid transaction', () => {
    const transactions = ['tx1', 'tx2', 'tx3', 'tx4', 'tx5'];
    const merkleTree = new MerkleTree(transactions);
    const proof = merkleTree.getProof('tx3');
    const valid = merkleTree.verifyProof('tx3', proof);
    assert.strictEqual(valid, true);
  });
});

// 1    '709b55bd3da0f5a838125bd0ee20c5bfdd7caba173912d4281cae816b79a201b',
// 2    '27ca64c092a959c7edc525ed45e845b1de6a7590d173fd2fad9133c8a779a1e3',
// 3    '1f3cb18e896256d7d6bb8c11a6ec71f005c75de05e39beae5d93bbd1e2c8b7a9',
// 4    '41b637cfd9eb3e2f60f734f9ca44e5c1559c6f481d49d6ed6891f3e9a086ac78',
// 5    'a8c0cce8bb067e91cf2766c26be4e5d7cfba3d3323dc19d08a834391a1ce5acf'

// 6    'f8f28ede979567036d801ad6cf58b551c7d8530bba005c48e46d39c73ab52664'
// 7    '850cf301915d09ebcfa84e2ee4087025e17a6fca7e4149ce02cff94cd3db55de'
// 8    'bcbdf12a6a4fa31e81924aa9e4b1c6b5e06b7611e08e5f2f2254739623378b83'

// 9    '773bc304a3b0a626a520a8d6eacc36809ac18c0b174f3ff3cdaf0a4e9c64433d'
// 10    'c30d1c12d240decad5d2e5921647bebd24954de45f8f03de4e79694dc94c1ba1'

// 11    'db60ce68c3176600258a40668f6e1a54198cf1d9239e7748276cb84d73d7a5ff'



