"use strict";

const Block = require('./block.js');
let Blockchain = require('./blockchain.js');
let Miner = require('./miner.js');

/**
 * Miners are clients, but they also mine blocks looking for "proofs".
 */
module.exports = class TimeMiner extends Miner {

    announceProof() {
        this.net.broadcast(Blockchain.PROOF_FOUND, this.currentBlock);
        //console.log("Current Target: " + Blockchain.cfg.powTarget);
        console.log("Chain Length: " + this.currentBlock.chainLength);
        if (this.lastBlock.chainLength % Blockchain.BLOCK_UPDATE_INTERVAL == 0) {
            this.updateTarget();
        }
        //console.log("Updated Target: " + Blockchain.cfg.powTarget);
      }

    updateTarget() {
        /* 
        let lastBlockTime = this.lastBlock.timestamp;
        let currentBlockTime = this.currentBlock.timestamp;
        let timeDiff = currentBlockTime - lastBlockTime;
        console.log(this.currentBlock.averageMiningTime);
        console.log("Current Block Timestamp: " + currentBlockTime);
        console.log("Time difference: " + timeDiff);
        */

        let averageMiningTime = this.currentBlock.averageMiningTime;
        console.log("Average Mining Time: " + averageMiningTime);
        if (averageMiningTime < 1000) {
            console.log("Increasing Difficulty - PoW Target Updated");
            Blockchain.cfg.powTarget = Blockchain.cfg.powTarget >> BigInt(1);
        }

        if (averageMiningTime > 10000) {
            console.log("Decreasing Difficulty - PoW Target Updated");
            Blockchain.cfg.powTarget = Blockchain.cfg.powTarget << BigInt(1);
        }

        console.log("PoW Target -> ", Blockchain.cfg.powTarget);
    }

};

