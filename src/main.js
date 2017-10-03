const Schdeuler = require('./Scheduler');
const Process = require('./Process');

const main = () => {
    const scheduler = new Scheduler();
    
    for (let i = 1; i < 1001; i++) {
        scheduler.addNewProcess(new Process(i + 1000));
    }

    scheduler.run();
};

main();

