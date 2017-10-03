const SchedulerInterrupt = {
    PROCESS_BLOCKED: 'PROCESS_BLOCKED',
    PROCESS_READY: 'PROCESS_READY',
    LOWER_PRIORITY: 'LOWER_PRIORITY',
};

const QueueType {
    CPU_QUEUE: 'CPU_QUEUE',
    BLOCKED_QUEUE: 'BLOCKED_QUEUE',
};

const PRIORITY_LEVELS = 3;

module.exports = {
    SchedulerInterrupt,
    QueueType,
    PRIORITY_LEVELS,
};
