export function formatDate(timestamp: string) {
    console.log('timestamp', timestamp);
    const date = new Date(Number(timestamp) * 1000);
    return date.toLocaleString();
};

export function formatHash(hash: string, numChars: number = 6): string {
    const firstPart = hash.substring(0, numChars);
    const lastPart = hash.substring(hash.length - numChars);
    return `${firstPart}...${lastPart}`;
}

