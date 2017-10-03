const Queue = require('../src/Queue');
const Process = require('../src/Process');
const Scheduler = require('../src/Scheduler');
const { 
    SchedulerInterrupt,
    QueueType,
} = require('../constants/index');

let queue, scheduler;

describe('Queue', () => {
    beforeEach(() => {
       scheduler = new Scheduler();
       queue = new Queue(scheduler, 50, 0, QueueType.BLOCKING_QUEUE);
    });
    
    it('should have the methods "enqueue", "dequeue", "peek", "getPriorityLevel", "getQueueType", "emitInterrupt", "isEmpty", "doCPUWork", "doBlockingWork", and "manageTimeSlice"', () => {
        expect(Object.getPrototypeOf(queue).hasOwnProperty('enqueue')).toBe(true);
        expect(Object.getPrototypeOf(queue).hasOwnProperty('dequeue')).toBe(true);
        expect(Object.getPrototypeOf(queue).hasOwnProperty('peek')).toBe(true);
        expect(Object.getPrototypeOf(queue).hasOwnProperty('getPriorityLevel')).toBe(true);
        expect(Object.getPrototypeOf(queue).hasOwnProperty('getQueueType')).toBe(true);
        expect(Object.getPrototypeOf(queue).hasOwnProperty('emitInterrupt')).toBe(true);
        expect(Object.getPrototypeOf(queue).hasOwnProperty('isEmpty')).toBe(true);
        expect(Object.getPrototypeOf(queue).hasOwnProperty('doCPUWork')).toBe(true);
        expect(Object.getPrototypeOf(queue).hasOwnProperty('doBlockingWork')).toBe(true);
        expect(Object.getPrototypeOf(queue).hasOwnProperty('manageTimeSlice')).toBe(true);
    });

    it('should enqueue a process and set its parent queue property correctly', () => {
        const process = new Process(0);
        queue.enqueue(process);
        expect(process._getParentQueue()).toBe(queue);
        expect(queue.peek()).toBe(process);
    });

    it('should return the most recently added process when peeking', () => {
        const process1 = new Process(0);
        const process2 = new Process(1);
        queue.enqueue(process1);
        queue.enqueue(process2);
        expect(queue.peek()).toBe(process2); 
    });

    it('should dequeue processes in first in first out order', () => {
        const process1 = new Process(0);
        const process2 = new Process(1);
        queue.enqueue(process1);
        queue.enqueue(process2);
        expect(queue.dequeue()).toBe(process2);
        expect(queue.peek()).toBe(process1);
    });

