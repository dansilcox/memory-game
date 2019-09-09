export class NumberGridItem {
  constructor(private value: number, public hidden: boolean = true, public disabled: boolean = false) {

  }

  getValue(): number {
    return this.value;
  }
}
