import { LitElement, html, css } from 'lit';
import { query, customElement } from 'lit/decorators.js';
import '@ui5/webcomponents/dist/Button.js';
import { txCompetence } from './data.js';

@customElement('calcul-competence')
export class CalculCompetence extends LitElement {
  static styles = css`
    :host {
    }
    .body {
      display: flex;
      flex-direction: column;
      align-items: center;
      row-gap: 64px;
      width: min-content;
    }
    .form {
      display: flex;
      align-items: center;
      column-gap: 16px;
    }
    .title {
      font-size: 20px;
      font-weight: bold;
      color: #181818;
    }
    .label {
      font-size: 16px;
      color: #565656;
      white-space: nowrap;
    }
    .card {
      display: flex;
      flex-direction: column;
      align-items: center;
      row-gap: 8px;
    }
    .reslist {
      display: flex;
      column-gap: 8px;
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
      text-align: center;
    }
    #resCompetenceScore {
      background-color: var(--blue-light);
      border: 2px solid var(--blue);
    }
    #resCompetenceTexte {
      background-color: var(--orange-light);
      border: 2px solid var(--orange);
    }
    #but1 {
      width: 180px;
    }
  `;

  @query('#joueurCompetence') joueurCompetence!: any;

  @query('#resCompetenceScore') resCompetenceScore!: any;

  @query('#resCompetenceTexte') resCompetenceTexte!: any;

  calculCompetence() {
    const min = 1;
    const max = 100;

    const tirage = min + Math.floor(Math.random() * max);
    console.log(tirage);
    const chanceReussite = +this.joueurCompetence.selectedOption.innerText;

    console.log(chanceReussite);

    let res: string;
    if (tirage <= chanceReussite && tirage !== max) {
      res = 'Réussite';
      if (tirage <= 5) {
        res = 'Réussite critique';
      }
    } else {
      res = 'Échec';
      if (tirage >= 96) {
        res = 'Échec critique';
      }
    }

    this.resCompetenceScore.innerText = tirage;
    this.resCompetenceTexte.innerText = `${res}`;
  }

  render() {
    return html`
      <div class="body">
        <div class="form">
          <span class="label">Montant Compétence</span>
          <ui5-select id="joueurCompetence">
            ${txCompetence.map(
              item => html` <ui5-option>${item}</ui5-option> `
            )}
          </ui5-select>
        </div>
        <ui5-button
          design="Emphasized"
          id="but1"
          @click=${this.calculCompetence}
          >Lancer</ui5-button
        >
        <div class="card">
          <span class="title">Résultat</span>
          <div class="reslist">
            <div id="resCompetenceScore" class="res"></div>
            <div id="resCompetenceTexte" class="res"></div>
          </div>
        </div>
      </div>
    `;
  }
}
