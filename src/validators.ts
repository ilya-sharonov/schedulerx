import { RetryPolicy } from './constants';

const invalidParameter = (arr: TemplateStringsArray, variableName: string, passedValue: number): string =>
    `Expected '${variableName}' to be ${arr[1]}, instead got: ${passedValue}`;

const isValidNumber = (num: number): boolean => typeof num === 'number' && !Number.isNaN(num);

const isValidFactor = (num: number): boolean => isValidNumber(num) && num >= 1;

const isValidInteger = (num: number, canBeInfinite?: boolean): boolean =>
    isValidNumber(num) &&
    num > 0 &&
    (Number.isSafeInteger(num) || (Boolean(canBeInfinite) && num === Number.POSITIVE_INFINITY));

export const validateRetryPolicy = (policy: RetryPolicy): void => {
    const { timeout, multiplyAfter, multiplyFactor, maxTimeout, maxRetries, maxTotalTimeout } = policy;
    switch (false) {
        case isValidInteger(timeout): {
            throw new Error(
                invalidParameter`${'timeout'}a positive integer greater than 0 or Number.POSITIVE_INFINITY${timeout}`,
            );
        }
        case isValidInteger(multiplyAfter): {
            throw new Error(
                invalidParameter`${'multiplyAfter'}a positive integer greater than 0 or Number.POSITIVE_INFINITY${multiplyAfter}`,
            );
        }
        case isValidFactor(multiplyFactor): {
            throw new Error(
                invalidParameter`${'multiplyFactor'}a positive number greater than or equal to 1${multiplyFactor}`,
            );
        }
        case isValidInteger(maxTimeout): {
            throw new Error(
                invalidParameter`${'maxTimeout'}a positive integer greater than 0 or Number.POSITIVE_INFINITY${maxTimeout}`,
            );
        }
        case isValidInteger(maxRetries): {
            throw new Error(
                invalidParameter`${'maxRetries'}a positive integer greater than 0 or Number.POSITIVE_INFINITY${maxRetries}`,
            );
        }
        case isValidInteger(maxTotalTimeout): {
            throw new Error(
                invalidParameter`${'maxTotalTimeout'}a positive integer greater than 0 or Number.POSITIVE_INFINITY${maxTotalTimeout}`,
            );
        }
    }
};
