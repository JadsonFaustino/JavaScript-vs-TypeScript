function getPerformance(func: () => void) {
    // Start measuring time
    const startTime = process.hrtime();

    // Run the function
    func();

    // Stop measuring time
    const endTime = process.hrtime(startTime);
    const runtime = endTime[0] * 1000 + endTime[1] / 1e6; // Convert to milliseconds

    // Get memory usage
    const memoryUsage = process.memoryUsage();
    const memoryUsedMB = memoryUsage.heapUsed / (1024 * 1024);

    // Return an object with performance information
    return {
        runtime: parseFloat(runtime.toFixed(3)),
        runtime_unit: "ms",
        memoryUsed: parseFloat(memoryUsedMB.toFixed(3)),
        memoryUsed_unit: "MB"
    };
}

function measurePerformance(func: () => void, times: number = 10) {
    let total_time = 0;
    let total_memory = 0;

    for (let i = 0; i < times; i++) {
        const res = getPerformance(func);
        total_time += res.runtime;
        total_memory += res.memoryUsed;
    }

    return {
        runtime: (total_time / times).toFixed(3),
        runtime_unit: "ms",
        memoryUsage: (total_memory / times).toFixed(3),
        memoryUsage_unit: "MB"
    };
}

// Example function to measure
function loop() {
    let arr: number[] = [];
    for (let i = 0; i < 1000000; i++) {
        arr.push(i);
    }
}

function ackermann(m: number = 2, n: number = 3): number | undefined {
    if (m === 0) {
        return n + 1;
    } else if (m > 0 && n === 0) {
        return ackermann(m - 1, 1);
    } else if (m > 0 && n > 0) {
        return ackermann(m - 1, ackermann(m, n - 1));
    } else {
        // Handle invalid input
        return undefined;
    }
}

function bubblesort(arr: number[]): number[] {
    const len = arr.length;

    for (let i = 0; i < len - 1; i++) {
        for (let j = 0; j < len - 1 - i; j++) {
            // Compare adjacent elements
            if (arr[j] > arr[j + 1]) {
                // Swap them if they are in the wrong order
                const temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }

    return arr;
}

function randArray(size: number): number[] {
    const randomArray: number[] = [];

    for (let i = 0; i < size; i++) {
        // Generate random integers, you can adjust the range as needed
        const randomInteger = Math.floor(Math.random() * 100); // Adjust the range (0-99 in this example)
        randomArray.push(randomInteger);
    }

    return randomArray;
}

function main() {
    // Measure the performance of the example function

    const response = measurePerformance(() => {
        
        ackermann(3, 5);

    });

    console.log('\nTypeScript:');
    console.log(`\truntime: ${response.runtime} ${response.runtime_unit}`);
    console.log(`\tmemory : ${response.memoryUsage} ${response.memoryUsage_unit}`);
}

main();
