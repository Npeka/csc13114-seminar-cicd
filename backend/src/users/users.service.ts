import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private localValue = 'initial-local-value';

  /**
   * Return a static demo message object
   */
  getMessage() {
    return { message: 'Hello from UsersService' };
  }

  /**
   * Echo back a provided message
   */
  echo(msg?: string) {
    return { echoed: msg ?? null };
  }

  /**
   * Return and/or mutate a simple in-memory local value (no DB)
   */
  getLocal() {
    return { local: this.localValue };
  }

  setLocal(value: string) {
    this.localValue = value;
    return { local: this.localValue };
  }
}
