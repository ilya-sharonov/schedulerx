import { timer, of, merge, throwError } from 'rxjs';
import { take, map, concatAll, switchMap } from 'rxjs/operators';
import { RetryPolicy } from './constants';

export const overallTimeout = ({ maxTimeout }: RetryPolicy) =>
    timer(maxTimeout).pipe(switchMap(() => throwError(new Error('Overall timeout'))));

export const beforeMultiply = <Emit>({ timeout, multiplyAfter }: RetryPolicy, emitObject?: Emit) =>
    timer(0, timeout).pipe(
        map(() => ({ ...emitObject, timeout })),
        take(multiplyAfter),
    );

export const afterMultiply = <Emit>(
    { timeout, multiplyFactor, maxTimeout, maxRetries, multiplyAfter }: RetryPolicy,
    emitObject?: Emit,
) =>
    timer(0, timeout).pipe(
        map((_, count) => Math.min(Math.ceil(Math.pow(multiplyFactor, count + 1) * timeout), maxTimeout)),
        map(delay => timer(delay).pipe(map(() => delay))),
        concatAll(),
        map(timeout => ({ ...emitObject, timeout })),
        take(maxRetries - multiplyAfter),
    );

export const beforeAndAfter = <Emit>(policy: RetryPolicy, emitObject?: Emit) =>
    of(beforeMultiply(policy, emitObject), afterMultiply(policy, emitObject)).pipe(concatAll());

export const withOverallTimeout = <Emit>(policy: RetryPolicy, emitObject?: Emit) =>
    merge(beforeAndAfter(policy, emitObject), overallTimeout(policy));
