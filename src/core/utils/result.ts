// src/core/utils/result.ts
export class Result<T> {
    private constructor(public isSuccess: boolean, public value?: T, public error?: string) {}
  
    static success<T>(value: T): Result<T> {
      return new Result<T>(true, value);
    }
  
    static failure<T>(error: string): Result<T> {
      return new Result<T>(false, undefined, error);
    }
  
    isFailure(): boolean {
      return !this.isSuccess;
    }
  
  }
  