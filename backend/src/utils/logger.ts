// Logger interface for code generation
export interface ILogger {
  info(message: string, ...args: any[]): void;
  error(message: string, ...args: any[]): void;
  warn(message: string, ...args: any[]): void;
  debug(message: string, ...args: any[]): void;
}

// Simple console logger implementation
export class ConsoleLogger implements ILogger {
  info(message: string, ...args: any[]): void {
    console.log(`[INFO] ${message}`, ...args);
  }
  
  error(message: string, ...args: any[]): void {
    console.error(`[ERROR] ${message}`, ...args);
  }
  
  warn(message: string, ...args: any[]): void {
    console.warn(`[WARN] ${message}`, ...args);
  }
  
  debug(message: string, ...args: any[]): void {
    console.debug(`[DEBUG] ${message}`, ...args);
  }
}
