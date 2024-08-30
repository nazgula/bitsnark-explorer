let lastRequestTime = 0;
const THROTTLE_INTERVAL = 3000;

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function canProceed(): Promise<boolean> {
    const currentTime = Date.now();
    const timeSinceLastRequest = currentTime - lastRequestTime;
    if (timeSinceLastRequest < THROTTLE_INTERVAL) {
        await delay(THROTTLE_INTERVAL - timeSinceLastRequest);
    }
    lastRequestTime = Date.now();
    return true;
}

export async function throttle<T>(fn: (...args: any[]) => Promise<T>, ...args: any[]): Promise<T> {
    await canProceed();
    console.log(lastRequestTime, 'Throttle check passed');
    return await fn(...args);
}