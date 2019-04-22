
const startTimes = {};

if (!console.time) {
    console.time = (label => {
        startTimes[label] = window.performance.now();
    });
}

if (!console.timeEnd) {
    console.timeEnd = (label => {
        const endTime = window.performance.now();
        if (startTimes[label]) {
            const delta = endTime - startTimes[label];
            console.log(`${label}: ${delta.toFixed(3)}ms`);
            delete startTimes[label];
        } else {
            console.warn(`Warning: No such label '${label}' for console.timeEnd()`);
        }
    });
}