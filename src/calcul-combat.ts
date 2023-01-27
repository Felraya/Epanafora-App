import { LitElement, html, css } from 'lit';
import { state, customElement, query } from 'lit/decorators.js';
import '@ui5/webcomponents/dist/Button.js';
import '@ui5/webcomponents/dist/Input.js';
import '@ui5/webcomponents/dist/ComboBox.js';
import '@ui5/webcomponents/dist/Select.js';
import '@ui5/webcomponents/dist/Title.js';
// import { Dice } from './Dice.js';
import { diceListe, degatArme, txCritArme } from './data.js';
import { Dice } from './Dice.js';

@customElement('calcul-combat')
export class CalculCombat extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      row-gap: 64px;

      --green-light: #f5fae5;
      --green: #30914c;
      --green-dark: #287a40;

      --blue-light: #e1f4ff;
      --blue: #0070f2;
      --blue-dark: #0058bf;

      --orange-light: #fff8d6;
      --orange: #e76500;
      --orange-dark: #d35c00;

      --red-light: #ffeaf4;
      --red: #f53232;
      --red-dark: #d50a0a;

      --grey: #6a6d70;
      --grey-dark: #515456;
    }
    .body {
      display: flex;
      justify-content: space-between;
    }
    .player,
    .ennemi {
      display: flex;
      flex-direction: column;
      align-items: center;
      row-gap: 20px;
    }
    .form {
      display: grid;
      align-items: center;
      grid-template-columns: min-content min-content;
      grid-gap: 8px 16px;
    }
    .valid {
      display: flex;
      flex-direction: column;
      row-gap: 8px;
      justify-content: center;
      align-items: center;
    }
    .result {
      display: flex;
      flex-direction: row;
      column-gap: 32px;
    }
    .resultJoueur {
      display: flex;
      flex-direction: row;
      justify-content: center;
      column-gap: 32px;
      width: 50%;
    }
    .resultEnnemie {
      display: flex;
      flex-direction: row;
      justify-content: center;
      column-gap: 32px;
      width: 50%;
    }
    .mid {
      height: auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      row-gap: 16px;
    }
    .res {
      height: 128px;
      width: 200px;
      border-radius: 24px;
      font-size: 32px;
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: space-around;
      color: #323232;
    }
    #toucheResJoueur {
      background-color: var(--green-light);
      border: 2px solid var(--green);
    }
    #degatResJoueur {
      background-color: var(--blue-light);
      border: 2px solid var(--blue);
    }
    #toucheResEnnemie {
      background-color: var(--orange-light);
      border: 2px solid var(--orange);
    }
    #degatResEnnemie {
      background-color: var(--red-light);
      border: 2px solid var(--red);
    }
    .title {
      font-size: 20px;
      font-weight: bold;
      color: #323232;
    }
    .card {
      display: flex;
      flex-direction: column;
      align-items: center;
      row-gap: 8px;
    }
    ui5-button {
      width: 180px;
    }
    ui5-button#but1 {
      --sapButton_Emphasized_Background: var(--green);
      --sapButton_Emphasized_BorderColor: var(--green);
      --sapButton_Emphasized_Hover_Background: var(--green-dark);
      --sapButton_Emphasized_Hover_BorderColor: var(--green-dark);
      --sapButton_Active_Background: var(--green-dark);
      --sapButton_Active_BorderColor: var(--green-dark);
    }
    ui5-button#but2 {
      --sapButton_Emphasized_Background: var(--blue);
      --sapButton_Emphasized_BorderColor: var(--blue);
      --sapButton_Emphasized_Hover_Background: var(--blue-dark);
      --sapButton_Emphasized_Hover_BorderColor: var(--blue-dark);
      --sapButton_Active_Background: var(--blue-dark);
      --sapButton_Active_BorderColor: var(--blue-dark);
    }
    ui5-button#but3 {
      --sapButton_Emphasized_Background: var(--orange);
      --sapButton_Emphasized_BorderColor: var(--orange);
      --sapButton_Emphasized_Hover_Background: var(--orange-dark);
      --sapButton_Emphasized_Hover_BorderColor: var(--orange-dark);
      --sapButton_Active_Background: var(--orange-dark);
      --sapButton_Active_BorderColor: var(--orange-dark);
    }
    ui5-button#but4 {
      --sapButton_Emphasized_Background: var(--red);
      --sapButton_Emphasized_BorderColor: var(--red);
      --sapButton_Emphasized_Hover_Background: var(--red-dark);
      --sapButton_Emphasized_Hover_BorderColor: var(--red-dark);
      --sapButton_Active_Background: var(--red-dark);
      --sapButton_Active_BorderColor: var(--red-dark);
    }
    ui5-button#but5 {
      --sapButton_Emphasized_Background: var(--grey);
      --sapButton_Emphasized_BorderColor: var(--grey);
      --sapButton_Emphasized_Hover_Background: var(--grey-dark);
      --sapButton_Emphasized_Hover_BorderColor: var(--grey-dark);
      --sapButton_Active_Background: var(--grey-dark);
      --sapButton_Active_BorderColor: var(--grey-dark);
    }
  `;

  @state() crit: boolean = false;

  @query('#toucheResJoueur') toucheResJoueur!: HTMLDivElement;

  @query('#degatResJoueur') degatResJoueur!: HTMLDivElement;

  @query('#toucheResEnnemie') toucheResEnnemie!: HTMLDivElement;

  @query('#degatResEnnemie') degatResEnnemie!: HTMLDivElement;

  @query('#joueurDePysique') joueurDePysique!: any;

  @query('#joueurDeInstinct') joueurDeInstinct!: any;

  @query('#joueurDeEnergie') joueurDeEnergie!: any;

  @query('#joueurTypeAttaque') joueurTypeAttaque!: any;

  @query('#joueurTierPouvoir') joueurTierPouvoir!: any;

  @query('#joueurDegatsArme') joueurDegatsArme!: any;

  @query('#joueurCritsArme') joueurCritsArme!: any;

  @query('#ennemiDePysique') ennemiDePysique!: any;

  @query('#ennemiDeInstinct') ennemiDeInstinct!: any;

  private static CHANCE_ECHEC_POUVOIR_BASE: number = 0.05;

  private static CHANCE_COUP_CRIT_BASE: number = 0.05;

  isArme(): boolean {
    if (!this.joueurTypeAttaque) {
      return true;
    }
    const type = (this.joueurTypeAttaque.selectedOption as any).innerText;
    if (type === 'Arme' || type === 'Symbiose') {
      return false;
    }
    return true;
  }

  isPouvoir() {
    if (!this.joueurTypeAttaque) {
      return true;
    }
    const type = (this.joueurTypeAttaque.selectedOption as any).innerText;
    if (type === 'Pouvoir' || type === 'Symbiose') {
      return false;
    }
    return true;
  }

  calculToucheJoueur() {
    const regex = /[0-9]*D[0-9]*/;
    let doReturn = false;
    // CHECK FORM
    if (
      this.joueurDePysique.value === '' ||
      !this.joueurDePysique.value.match(regex)
    ) {
      this.joueurDePysique.valueState = 'Error';
      doReturn = true;
    }
    if (
      this.ennemiDeInstinct.value === '' ||
      !this.ennemiDeInstinct.value.match(regex)
    ) {
      this.ennemiDeInstinct.valueState = 'Error';
      doReturn = true;
    }
    if (doReturn) return;
    this.joueurDePysique.valueState = 'None';
    this.ennemiDeInstinct.valueState = 'None';

    // CALCUL
    const dicePhysiqueJoueur = Dice.buildFromString(this.joueurDePysique.value);
    const diceInstinctEnnemie = Dice.buildFromString(
      this.ennemiDeInstinct.value
    );

    const joueurAmount: number = dicePhysiqueJoueur.roll();
    const ennemieAmount: number = diceInstinctEnnemie.roll();

    let res: string;
    if (joueurAmount >= ennemieAmount) {
      res = 'Touché';
    } else {
      res = 'Loupé';
    }
    this.toucheResJoueur.innerText = `${res}`;
  }

  static isCrit(chanceCrit: number): boolean {
    if (Math.random() < chanceCrit) {
      return true;
    }
    return false;
  }

  static percentToNumber(percent: string): number {
    const regex = /[0-9]*%/;
    if (!percent.match(regex)) {
      console.error('Format pourcentage incorrect !!!');
    }
    const percentNumber = +percent.substring(0, percent.length - 1);
    return percentNumber / 100;
  }

  calculDegatJoueur() {
    const regex = /[0-9]*D[0-9]*/;
    let doReturn = false;

    const type = this.joueurTypeAttaque.selectedOption.innerText;

    let damage: number | string = 0;

    switch (type) {
      case 'Sans arme': {
        // CHECK FORM
        if (
          this.joueurDePysique.value === '' ||
          !this.joueurDePysique.value.match(regex)
        ) {
          this.joueurDePysique.valueState = 'Error';
          doReturn = true;
        }
        if (doReturn) return;
        this.joueurDePysique.valueState = 'None';

        // DE
        const dicePhysiqueJoueur = Dice.buildFromString(
          this.joueurDePysique.value
        );

        // DAMAGE
        damage = dicePhysiqueJoueur.roll() * 0.5;

        // CRIT
        if (CalculCombat.isCrit(CalculCombat.CHANCE_COUP_CRIT_BASE)) {
          damage *= 2;
          this.crit = true;
        } else {
          this.crit = false;
        }

        damage = Math.ceil(damage);
        break;
      }

      case 'Arme': {
        if (
          this.joueurDePysique.value === '' ||
          !this.joueurDePysique.value.match(regex)
        ) {
          this.joueurDePysique.valueState = 'Error';
          doReturn = true;
        }

        if (doReturn) return;
        this.joueurDePysique.valueState = 'None';

        // DE
        const dicePhysiqueJoueur = Dice.buildFromString(
          this.joueurDePysique.value
        );

        // DAMAGE
        damage =
          dicePhysiqueJoueur.roll() *
          CalculCombat.percentToNumber(
            this.joueurDegatsArme.selectedOption.innerText
          );

        // CRIT
        const chanceCrit =
          CalculCombat.CHANCE_COUP_CRIT_BASE +
          CalculCombat.percentToNumber(
            this.joueurCritsArme.selectedOption.innerText
          );
        if (CalculCombat.isCrit(chanceCrit)) {
          damage *= 2;
          this.crit = true;
        } else {
          this.crit = false;
        }

        damage = Math.ceil(damage);
        break;
      }

      case 'Pouvoir': {
        // CHECK FORM
        if (
          this.joueurDePysique.value === '' ||
          !this.joueurDePysique.value.match(regex)
        ) {
          this.joueurDePysique.valueState = 'Error';
          doReturn = true;
        }
        if (
          this.joueurDeEnergie.value === '' ||
          !this.joueurDeEnergie.value.match(regex)
        ) {
          this.joueurDeEnergie.valueState = 'Error';
          doReturn = true;
        }
        if (doReturn) return;
        this.joueurDePysique.valueState = 'None';
        this.joueurDeEnergie.valueState = 'None';

        // ECHEC
        if (CalculCombat.isCrit(CalculCombat.CHANCE_ECHEC_POUVOIR_BASE)) {
          damage = 'Echec crit';
          break;
        }

        // DE
        const dicePhysiqueJoueur = Dice.buildFromString(
          this.joueurDePysique.value
        );
        const diceEnergieJoueur = Dice.buildFromString(
          this.joueurDeEnergie.value
        );
        const tier: number = +this.joueurTierPouvoir.selectedOption.innerText;

        // DAMAGE
        damage =
          dicePhysiqueJoueur.roll() + diceEnergieJoueur.roll() * 0.5 * tier;

        // CRIT
        const chanceCrit = CalculCombat.CHANCE_COUP_CRIT_BASE + tier * 0.1;
        if (CalculCombat.isCrit(chanceCrit)) {
          damage *= 2;
          this.crit = true;
        } else {
          this.crit = false;
        }

        damage = Math.ceil(damage);
        break;
      }

      case 'Symbiose': {
        // CHECK FORM
        if (
          this.joueurDePysique.value === '' ||
          !this.joueurDePysique.value.match(regex)
        ) {
          this.joueurDePysique.valueState = 'Error';
          doReturn = true;
        }
        if (
          this.joueurDeEnergie.value === '' ||
          !this.joueurDeEnergie.value.match(regex)
        ) {
          this.joueurDeEnergie.valueState = 'Error';
          doReturn = true;
        }
        if (doReturn) return;
        this.joueurDePysique.valueState = 'None';
        this.joueurDeEnergie.valueState = 'None';

        // ECHEC
        if (CalculCombat.isCrit(CalculCombat.CHANCE_ECHEC_POUVOIR_BASE)) {
          damage = 'Echec crit';
          break;
        }

        // DE
        const dicePhysiqueJoueur = Dice.buildFromString(
          this.joueurDePysique.value
        );
        const diceEnergieJoueur = Dice.buildFromString(
          this.joueurDeEnergie.value
        );
        const tier: number = +this.joueurTierPouvoir.selectedOption.innerText;

        // DAMAGE
        damage =
          dicePhysiqueJoueur.roll() *
            CalculCombat.percentToNumber(
              this.joueurDegatsArme.selectedOption.innerText
            ) +
          diceEnergieJoueur.roll() * 0.5 * tier;

        // CRIT
        const chanceCrit =
          CalculCombat.CHANCE_COUP_CRIT_BASE +
          tier * 0.1 +
          CalculCombat.percentToNumber(
            this.joueurCritsArme.selectedOption.innerText
          );
        if (CalculCombat.isCrit(chanceCrit)) {
          damage *= 2;
          this.crit = true;
        } else {
          this.crit = false;
        }

        damage = Math.ceil(damage);
        break;
      }

      default:
        console.error('Type de pouvoir inconnue');
    }

    this.degatResJoueur.innerText = `${damage}`;
    if (this.crit) {
      this.degatResJoueur.style.color = '#ad3010';
    } else {
      this.degatResJoueur.style.color = '';
    }
  }

  calculToucheEnnemie() {
    const regex = /[0-9]*D[0-9]*/;
    let doReturn = false;
    // CHECK FORM
    if (
      this.ennemiDePysique.value === '' ||
      !this.ennemiDePysique.value.match(regex)
    ) {
      this.ennemiDePysique.valueState = 'Error';
      doReturn = true;
    }
    if (
      this.joueurDeInstinct.value === '' ||
      !this.joueurDeInstinct.value.match(regex)
    ) {
      this.joueurDeInstinct.valueState = 'Error';
      doReturn = true;
    }
    if (doReturn) return;
    this.ennemiDePysique.valueState = 'None';
    this.joueurDeInstinct.valueState = 'None';

    // CALCUL
    const dicePhysiqueEnnemie = Dice.buildFromString(
      this.ennemiDePysique.value
    );
    const diceInstinctJoueur = Dice.buildFromString(
      this.joueurDeInstinct.value
    );

    const ennemieAmount: number = dicePhysiqueEnnemie.roll();
    const joueurAmount: number = diceInstinctJoueur.roll();

    let res: string;
    if (ennemieAmount >= joueurAmount) {
      res = 'Touché';
    } else {
      res = 'Loupé';
    }
    this.toucheResEnnemie.innerText = `${res}`;
  }

  calculDegatEnnemie() {
    const regex = /[0-9]*D[0-9]*/;
    let doReturn = false;
    if (
      this.ennemiDePysique.value === '' ||
      !this.ennemiDePysique.value.match(regex)
    ) {
      this.ennemiDePysique.valueState = 'Error';
      doReturn = true;
    }
    if (doReturn) return;
    this.ennemiDePysique.valueState = 'None';

    // DE
    const dicePhysiqueEnnemie = Dice.buildFromString(
      this.ennemiDePysique.value
    );

    // DAMAGE
    let damage = dicePhysiqueEnnemie.roll();

    // CRIT
    if (CalculCombat.isCrit(CalculCombat.CHANCE_COUP_CRIT_BASE)) {
      damage *= 2;
      this.crit = true;
    } else {
      this.crit = false;
    }

    damage = Math.ceil(damage);
    this.degatResEnnemie.innerText = `${damage}`;
    if (this.crit) {
      this.degatResEnnemie.style.color = '#ad3010';
    } else {
      this.degatResEnnemie.style.color = '';
    }
  }

  reset() {
    this.toucheResJoueur.innerText = '';
    this.degatResJoueur.innerText = '0';
    this.crit = false;
    this.toucheResEnnemie.style.color = '';
    this.degatResEnnemie.style.color = '0';
  }

  render() {
    return html`
      <div class="body">
        <div class="player">
          <ui5-title level="H2">Joueur</ui5-title>
          <div class="form">
            <ui5-label>Dé Physique</ui5-label>
            <ui5-combobox placeholder="2D4" id="joueurDePysique">
              ${diceListe.map(
                item => html` <ui5-cb-item text=${item.dice}></ui5-cb-item> `
              )}
            </ui5-combobox>

            <ui5-label>Dé Instinct</ui5-label>
            <ui5-combobox placeholder="2D4" id="joueurDeInstinct">
              ${diceListe.map(
                item => html` <ui5-cb-item text=${item.dice}></ui5-cb-item> `
              )}
            </ui5-combobox>

            <ui5-label>Dé Energie</ui5-label>
            <ui5-combobox placeholder="2D4" id="joueurDeEnergie">
              ${diceListe.map(
                item => html` <ui5-cb-item text=${item.dice}></ui5-cb-item> `
              )}
            </ui5-combobox>
            <ui5-label>Type d'attaque</ui5-label>
            <ui5-select
              id="joueurTypeAttaque"
              @change=${() => this.requestUpdate()}
            >
              <ui5-option>Sans arme</ui5-option>
              <ui5-option>Arme</ui5-option>
              <ui5-option>Pouvoir</ui5-option>
              <ui5-option>Symbiose</ui5-option>
            </ui5-select>

            <ui5-label>Tier du sort</ui5-label>
            <ui5-select ?disabled=${this.isPouvoir()} id="joueurTierPouvoir">
              <ui5-option>1</ui5-option>
              <ui5-option>2</ui5-option>
              <ui5-option>3</ui5-option>
              <ui5-option>4</ui5-option>
              <ui5-option>5</ui5-option>
            </ui5-select>

            <ui5-label>Degats de l'arme</ui5-label>
            <ui5-select ?disabled=${this.isArme()} id="joueurDegatsArme">
              ${degatArme.map(
                item => html` <ui5-option>${item}%</ui5-option> `
              )}
            </ui5-select>

            <ui5-label>Taux critique arme</ui5-label>
            <ui5-select ?disabled=${this.isArme()} id="joueurCritsArme">
              ${txCritArme.map(
                item => html` <ui5-option>${item}%</ui5-option> `
              )}
            </ui5-select>
          </div>
        </div>

        <div class="mid">
          <ui5-button
            design="Emphasized"
            id="but1"
            @click=${this.calculToucheJoueur}
            >Attaquer</ui5-button
          >
          <ui5-button
            design="Emphasized"
            id="but2"
            @click=${this.calculDegatJoueur}
            >Infliger des dégats</ui5-button
          >
          <ui5-button
            design="Emphasized"
            id="but3"
            @click=${this.calculToucheEnnemie}
            >Esquiver</ui5-button
          >
          <ui5-button
            design="Emphasized"
            id="but4"
            @click=${this.calculDegatEnnemie}
            >Subir des dégats</ui5-button
          >
          <ui5-button design="Emphasized" id="but5" @click=${this.reset}
            >Reset</ui5-button
          >
        </div>

        <div class="ennemi">
          <ui5-title level="H2">Ennemi</ui5-title>
          <div class="form">
            <ui5-label>Dé Physique</ui5-label>
            <ui5-combobox placeholder="2D4" id="ennemiDePysique">
              ${diceListe.map(
                item => html` <ui5-cb-item text=${item.dice}></ui5-cb-item> `
              )}
            </ui5-combobox>

            <ui5-label>Dé Instinct</ui5-label>
            <ui5-combobox placeholder="2D4" id="ennemiDeInstinct">
              ${diceListe.map(
                item => html` <ui5-cb-item text=${item.dice}></ui5-cb-item> `
              )}
            </ui5-combobox>
          </div>
        </div>
      </div>
      <div class="result">
        <div class="resultJoueur">
          <div class="card">
            <span class="title">Attaque Joueur</span>
            <div id="toucheResJoueur" class="res"></div>
          </div>
          <div class="card">
            <span class="title">Dégats infligés</span>
            <div id="degatResJoueur" class="res">0</div>
          </div>
        </div>
        <div class="resultEnnemie">
          <div class="card">
            <span class="title">Attaque ennemie</span>
            <div id="toucheResEnnemie" class="res"></div>
          </div>
          <div class="card">
            <span class="title">Dégats infligés</span>
            <div id="degatResEnnemie" class="res">0</div>
          </div>
        </div>
      </div>
    `;
  }
}
