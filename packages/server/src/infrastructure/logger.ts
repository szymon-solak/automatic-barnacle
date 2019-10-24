export interface Logger {
  log: (message: any) => void
  info: (message: any) => void
  debug: (message: any) => void
  error: (message: any) => void
}

export class ConsoleLogger implements Logger {
  constructor(private readonly debugEnabled: boolean = false) {}

  log(message: any) {
    console.log(message)
  }

  info(message: any) {
    console.info(message)
  }

  debug(message: any) {
    if (!this.debugEnabled) return

    console.debug(message)
  }

  error(message: any) {
    console.error(message)
  }
}
