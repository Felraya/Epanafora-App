import { LitElement, html, css } from 'lit';
import { property, customElement, query } from 'lit/decorators.js';
import '@ui5/webcomponents/dist/Button.js';
import '@ui5/webcomponents/dist/Input.js';
import '@ui5/webcomponents/dist/ComboBox.js';
import '@ui5/webcomponents/dist/Select.js';
import '@ui5/webcomponents/dist/Title.js';
// import { Dice } from './Dice.js';
import { diceListe, degatArme, txCritArme } from './data.js';
import { Dice } from './Dice.js';

@customElement('calcul-degat')
export class CalculDegat extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      row-gap: 64px;
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
      flex-direction: column;
      row-gap: 8px;
      justify-content: center;
    }
    .mid {
      height: auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      row-gap: 16px;
    }
    .result {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      width: 100%;
    }
    #toucheRes,
    #degatRes {
      height: 200px;
      width: 300px;
      border-radius: 16px;
      font-size: 56px;
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: space-around;
      color: #323232;
    }
    #toucheRes {
      background-color: #aef18f;
      border: 2px solid #26bd00;
    }
    #degatRes {
      background-color: #8faef1;
      border: 2px solid #002cbd;
    }
    .title {
      font-size: 24px;
      font-weight: bold;
      color: #323232;
    }
    .card {
      display: flex;
      flex-direction: column;
      align-items: center;
      row-gap: 8px;
    }
  `;

  @property({ type: String }) header = 'My app';

  @query('#toucheRes') toucheRes!: HTMLDivElement;

  @query('#degatRes') degatRes!: HTMLDivElement;

  @query('#joueurDePysique') joueurDePysique!: HTMLInputElement;

  @query('#joueurDeInstinct') joueurDeInstinct!: HTMLInputElement;

  @query('#joueurDeEnergie') joueurDeEnergie!: HTMLInputElement;

  @query('#joueurTypeAttaque') joueurTypeAttaque!: HTMLInputElement;

  @query('#joueurTierPouvoir') joueurTierPouvoir!: HTMLInputElement;

  @query('#joueurDegatsArme') joueurDegatsArme!: HTMLInputElement;

  @query('#joueurCritsArme') joueurCritsArme!: HTMLInputElement;

  @query('#ennemiDePysique') ennemiDePysique!: HTMLInputElement;

  @query('#ennemiDeInstinct') ennemiDeInstinct!: HTMLInputElement;

  private static CHANCE_ECHEC_POUVOIR_BASE: number = 0.05;

  private static CHANCE_COUP_CRIT_BASE: number = 0.05;

  firstUpdated() {
    Dice.buildFromString('4D18');
    Dice.buildFromString('55D333');
    Dice.buildFromString('2D8');
    Dice.buildFromString('752D24');
  }

  isArme(): boolean {
    const joueurTypeAttaque: any =
      this.shadowRoot?.querySelector('#joueurTypeAttaque');
    if (!joueurTypeAttaque) {
      return true;
    }
    const type = (joueurTypeAttaque.selectedOption as any).innerHTML;
    if (type === 'Arme' || type === 'Symbiose') {
      return false;
    }
    return true;
  }

  isPouvoir() {
    const joueurTypeAttaque: any =
      this.shadowRoot?.querySelector('#joueurTypeAttaque');
    if (!joueurTypeAttaque) {
      return true;
    }
    const type = (joueurTypeAttaque.selectedOption as any).innerHTML;
    if (type === 'Pouvoir' || type === 'Symbiose') {
      return false;
    }
    return true;
  }

  calculTouche() {
    const res = 'Touché';

    this.toucheRes.innerHTML = `${res}`;
  }

  calculDegat() {
    const res = 100;

    this.degatRes.innerHTML = `${res}`;
  }

  reset() {
    this.toucheRes.innerText = '';
    this.degatRes.innerText = '0';
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
          <ui5-button design="Emphasized" @click=${this.calculTouche}
            >Attaque touché</ui5-button
          >
          <ui5-button design="Emphasized" @click=${this.calculDegat}
            >Dégat</ui5-button
          >
          <ui5-button design="Negative" @click=${this.reset}>Reset</ui5-button>
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
        <div class="card">
          <span class="title">Touche</span>
          <div id="toucheRes"></div>
        </div>
        <div class="card">
          <span class="title">Dégats</span>
          <div id="degatRes">0</div>
        </div>
      </div>
    `;
  }
}
