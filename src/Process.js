const { SchedulerInterrupt } = require('./constants/index');

class Process {
    constructor(pid) {
        this._pid = pid;
        this.queue = null;
        this.cpuTimeNeeded = Math.round(Math.random() * 10000);
        this.blockingTimeNeeded = null;
        this.stateChanged = false;
    }
    
    setParentQueue(queue) {
        this.queue = queue;
    }

    isFinished() {
        return cpuTimeNeeded === 0;
    }

    executeProcess(time) {
        if (blockingTimeNeeded === 0) {
            cpuTimeNeeded -= time;
            cpuTimeNeeded = cpuTimeNeeded > 0 ? cpuTimeNeeded : 0;

            if (!this.isFinished()) {
                if (Math.random() < 0.25) {
                    console.log("Process Blocked!");
                    blockingTimeNeeded = Math.round(Math.random() * 1000);
                    // process entered blocked state
                    this.queue.event(this, SchedulerInterrupt.PROCESS_BLOCKED);
                    this.stateChanged = true;
                }
            }
        }
    }

    executeBlockingProcess(time) {
        blockingTimeNeeded -= time;
        blockingTimeNeeded = blockingTimeNeeded > 0 ? blockingTimeNeeded : 0;
        
        if (blockingTimeNeeded === 0) {
            this.queue.event(this, SchedulerInterrupt.PROCESS_READY);
            this.stateChanged = true;
        }
    }

    isStateChanged() {
        return this.stateChanged;
    }

    get pid() {
        return this._pid;
    }
}

module.exports = Process;

