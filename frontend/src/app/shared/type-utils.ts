import { tap } from 'rxjs';
import type { MonoTypeOperatorFunction } from 'rxjs';
import type { ZodType } from 'zod';

export function parseResponse<T>(schema: ZodType): MonoTypeOperatorFunction<T> {
  return tap({
    next: (value: T) => {
      schema.parse(value);
    },
  });
}

// Adapted from https://timdeschryver.dev/blog/why-we-should-verify-http-response-bodies-and-why-we-should-use-zod-for-this#using-the-zod-schema-within-the-service
