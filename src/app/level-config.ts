export class LevelConfig {
  /**
   * Configure a particular level's behaviour
   * 
   * @param numbersVisibleTimeMs Time (ms) that numbers remain visible
   * @param gridMaxValue Maximum value in the grid (note: must be a square number)
   * @param gridMinValue Minimum value in the grid (typically 1)
   * @param customAdvanceMessage Custom message to be published as 'info' when advancing past this level
   */
  constructor(
    private numbersVisibleTimeMs: number,
    private gridMaxValue: number,
    private gridMinValue = 1,
    private customAdvanceMessage = ''
  ) {
    if (!this.isSquareNumber(gridMaxValue)) {
      console.error('Error: gridMaxValue must be a square number');
      throw new Error('Error: gridMaxValue must be a square number');
    }
  }

  getAllowedTimeMs(): number {
    return this.numbersVisibleTimeMs;
  }

  getGridMaxNumber(): number {
    return this.gridMaxValue;
  }

  getGridMinNumber(): number {
    return this.gridMinValue;
  }

  hasCustomAdvanceMessage(): boolean {
    return this.customAdvanceMessage.length > 0;
  }

  getCustomAdvanceMessage(): string {
    return this.customAdvanceMessage;
  }

  /**
   * Returns true if number is square, false if not
   * 
   * @param value Value to be checked
   * @return boolean
   */
  private isSquareNumber(value: number): boolean {
    return (Math.sqrt(value) === Math.floor(Math.sqrt(value))) 
      || (Math.sqrt(value) === Math.ceil(Math.sqrt(value)));
  }
}
