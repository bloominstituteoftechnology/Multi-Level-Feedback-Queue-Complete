# Multi-Level-Feedback-Queue

### Motivation
After talking about one of the most popular scheduling algorithms used by operating systems to schedule processes,
let's implement it! This will be an implementation that simulates an actual multi-level feedback queue processing
blocking and non-blocking processes with multiple priority levels.

### Reiterating on How Scheduling Works

### Algorithm
The pseudo code for our MLFQ implementation is as follows:
```
Loop:
    If a process exists in the blocking queue:
        Work on removing each process in the blocking queue on a First Come First Serve basis
        When a process is removed from the blocking queue, add it back to the highest priority level CPU queue

    Iterate from the top priority CPU queue to the lowest priority CPU queue until we find a process
    If a process is found:
        Work on that process until the end of the queue's specified time quantum
            Do non-blocking work (since we're in the non-blocking CPU queues)
            If the process becomes blocking:
                Remove it from the CPU queue
                Place it on the blocking queue
                Restart the time quantum with the next process in the CPU queue

        If the end of the time quantum has been reached:
            Remove the process that is currently being worked on from the top of the CPU queue
            If the process is not finished:
                If the process is already in the lowest priority queue:
                    Add it to the back of the same queue
                Else:
                    Add the process to the back of the next lower priority queue
```

