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
        return this.cpuTimeNeeded === 0;
    }

    executeProcess(time) {
        if (this.blockingTimeNeeded === 0) {
            this.cpuTimeNeeded -= time;
            this.cpuTimeNeeded = this.cpuTimeNeeded > 0 ? this.cpuTimeNeeded : 0;

            if (!this.isFinished()) {
                if (Math.random() < 0.25) {
                    console.log("Process Blocked!");
                    this.blockingTimeNeeded = Math.round(Math.random() * 1000);
                    // process entered blocked state
                    this.queue.emitInterrupt(this, SchedulerInterrupt.PROCESS_BLOCKED);
                    this.stateChanged = true;
                }
            }
        }
    }

    executeBlockingProcess(time) {
        this.blockingTimeNeeded -= time;
        this.blockingTimeNeeded = this.blockingTimeNeeded > 0 ? this.blockingTimeNeeded : 0;
        
        if (this.blockingTimeNeeded === 0) {
            this.queue.emitInterrupt(this, SchedulerInterrupt.PROCESS_READY);
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

