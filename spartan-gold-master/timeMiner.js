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
        
        if (this.lastBlock.chainLength % Blockchain.BLOCK_UPDATE_INTERVAL == 0) {
            this.updateTarget();
        }
      }

    updateTarget() {

        let averageMiningTime = this.currentBlock.averageMiningTime;

        if (averageMiningTime < 100) {
            console.log("Increasing Difficulty - PoW Target Updated");
            Blockchain.cfg.powTarget = Blockchain.cfg.powTarget >> BigInt(1);
        }

        if (averageMiningTime > 1000) {
            console.log("Decreasing Difficulty - PoW Target Updated");
            Blockchain.cfg.powTarget = Blockchain.cfg.powTarget << BigInt(1);
        }

        console.log("PoW Target -> ", Blockchain.cfg.powTarget);
    }

};

