export interface RetryPolicy {
    timeout: number;
    multiplyAfter: number;
    multiplyFactor: number;
    maxTimeout: number;
    maxRetries: number;
    maxTotalTimeout: number;
}

export const DEFAULT_POLICY: RetryPolicy = {
    timeout: 1000,
    multiplyAfter: 3,
    multiplyFactor: 2,
    maxTimeout: 3000,
    maxRetries: Number.MAX_SAFE_INTEGER,
    maxTotalTimeout: 30000,
};
