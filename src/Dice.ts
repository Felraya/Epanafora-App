export class Dice {
  nbDice: number;

  valueDice: number;

  readonly average: number;

  constructor(nbDice: number, valueDice: number) {
    this.nbDice = nbDice;
    this.valueDice = valueDice;

    this.average = this.calculAverage();
  }

  roll(): number {
    let somme = 0;
    for (let i = 0; i < this.nbDice; i += 1) {
      somme += this.rollExplosion();
    }
    return somme;
  }

  static buildFromString(str: string): Dice {
    const regex = /[0-9]*D[0-9]*/;

    if (!str.match(regex)) {
      throw new Error('Format dé incorrect !!!');
    }
    const searchTerm = 'D';
    const indexOfFirst = str.indexOf(searchTerm);

    const nbDiceTmp = +str.substring(0, indexOfFirst);
    const valueDiceTmp = +str.substring(indexOfFirst + 1, str.length);

    return new Dice(nbDiceTmp, valueDiceTmp);
  }

  private rollExplosion(): number {
    const min = 1;
    const max = this.valueDice;
    let somme = 0;
    let explose: boolean = true;

    while (explose) {
      const randomNumber = min + Math.floor(Math.random() * max);
      somme += randomNumber;
      if (randomNumber === max) {
        explose = true;
      } else {
        explose = false;
      }
    }
    // console.log('roll explosion :', somme);
    return somme;
  }

  private calculAverage(): number {
    const nbTirage = 10000;
    let somme = 0;

    for (let i = 0; i < nbTirage; i += 1) {
      somme += +this.roll();
    }
    const average = somme / nbTirage;
    return average;
  }

  toString(): string {
    return `${this.nbDice}D${this!.valueDice}`;
  }
}
