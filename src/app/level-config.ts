export class LevelConfig {
  constructor(
    private allowedTimeMs: number,
    private gridMaxNumber = 9,
    private gridMinNumber = 1
  ) {}

  getAllowedTimeMs(): number {
    return this.allowedTimeMs;
  }

  getGridMaxNumber(): number {
    return this.gridMaxNumber;
  }

  getGridMinNumber(): number {
    return this.gridMinNumber;
  }
}
