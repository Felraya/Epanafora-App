import { LitElement, html, css } from 'lit';
import { property, query, customElement } from 'lit/decorators.js';
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

  @property({ attribute: false }) scoreRoll: number = 0;

  @query('#joueurCompetence') joueurCompetence!: any;

  @query('#resCompetenceScore') resCompetenceScore!: any;

  @query('#resCompetenceTexte') resCompetenceTexte!: any;

  calculCompetence() {
    const chanceReussite = CalculCompetence.percentToNumber(
      this.joueurCompetence.selectedOption.innerText
    );

    let res: string;
    if (this.rollCompetence(chanceReussite)) {
      res = 'Réussi';
    } else {
      res = 'Loupé';
    }

    this.resCompetenceScore.innerText = Math.ceil(this.scoreRoll * 100);
    this.resCompetenceTexte.innerText = `${res}`;
  }

  rollCompetence(chanceReussite: number): boolean {
    const tirage = Math.random();
    this.scoreRoll = tirage;
    if (this.scoreRoll < chanceReussite) {
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
