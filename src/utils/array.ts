/**
 * Get a random value from an array
 * @param arr An array containing anything
 * @returns A random value from the inputted array
 */
export function randomArrayValue<Value>(arr: Value[]) {
    return arr[Math.floor(Math.random() * arr.length)];
}

