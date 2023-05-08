"use strict";

let Blockchain = require('./blockchain.js');
let Miner = require('./miner.js');

/**
 * Miners are clients, but they also mine blocks looking for "proofs".
 */
module.exports = class TimeMiner extends Miner {

    announceProof() {
        this.net.broadcast(Blockchain.PROOF_FOUND, this.currentBlock);
        this.updateTarget();
      }

    updateTarget() {
        let lastBlockTime = this.lastBlock.timestamp;
        let currentBlockTime = this.currentBlock.timestamp;
        let timeDiff = currentBlockTime - lastBlockTime;
        console.log("Current Block Timestamp: " + currentBlockTime);
        console.log("Time difference: " + timeDiff);

        if (timeDiff < 1000) {
            console.log("Updating PoW Target");
            Blockchain.cfg.powTarget = Blockchain.cfg.powTarget >> BigInt(1);
            console.log("PoW Target -> ", Blockchain.cfg.powTarget);
        }

        if (timeDiff > 10000) {
            console.log("Updating PoW Target");
            Blockchain.cfg.powTarget = Blockchain.cfg.powTarget << BigInt(1);
            console.log("PoW Target -> ", Blockchain.cfg.powTarget);
        }
    }


};